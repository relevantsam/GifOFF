import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/Auth';
;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  user: any;
  menuActive: boolean;
  @Output() authorize = new EventEmitter();

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.menuActive = false;
    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.user = auth;
      } else {
        this.user = null;
      }
    });
  }

  login() {
    this.authorize.emit();
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
