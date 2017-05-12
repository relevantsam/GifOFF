import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/Auth';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

import { GifService } from './gif/gif.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  authorize: boolean;
  auth: any;
  gifs: any[];
  gifCount: number;
  gifLink: string;
  lastSearched: string;
  pendingAuth: any;
  searchTerm: FormControl = new FormControl();
  shared: any;
  sharedGifsList: any[];

  constructor(public afAuth: AngularFireAuth, private gifService: GifService) {

    afAuth.authState.subscribe(auth => {
      if (auth) {
        this.auth = auth;
        this.authorize = false;
      }
    });
  }

  ngOnInit() {
    this.authorize = false;

    this.gifService.sharedGifs.map(array => {
          const chunks = 4;
          return Array.from(Array(Math.ceil(array.length / chunks)),
            (_, i ) => array.slice( i * chunks, i * chunks + chunks));
        }).subscribe(d => this.sharedGifsList = d);

    this.searchTerm.valueChanges
      .debounceTime(500)
      .filter(val => val && val.length !== 0)
      .subscribe(newValue => {
        this.lastSearched = newValue;
        this.gifService.search(newValue).map(array => {
          const chunks = 4;
          this.gifCount = array.length;
          return Array.from(Array(Math.ceil(array.length / chunks)),
            (_, i ) => array.slice( i * chunks, i * chunks + chunks));
        }).subscribe(data => {
          this.gifs = data;
        });
      });
  }

  openAuth(event) {
    this.authorize = true;
  }

  cancelAuth(event) {
    console.log('canceling');
    this.authorize = false;
    if (this.pendingAuth) {
       this.pendingAuth.unsubscribe();
    }
  }

  share(gif: string) {
    console.log(this.auth, 'wants to share', gif);
    if (!this.auth) {
      this.openAuth(true);
      this.pendingAuth = this.afAuth.authState.subscribe(auth => {
        if (auth) {
          this.pendingAuth.unsubscribe();
          this.gifService.share(gif);
        }
      });
    } else {
      this.gifService.share(gif);
    }
  }

  clear() {
    this.searchTerm.reset();
    this.gifs = null;
    this.gifCount = 0;
  }
}
