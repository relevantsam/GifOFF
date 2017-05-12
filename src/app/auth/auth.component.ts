import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/Auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @Input() authorize: boolean;
  @Output() canceled: EventEmitter<any> = new EventEmitter();
  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() { }

  public authCanceled(event) {
    this.canceled.emit({canceled: true});
  }

  public login() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

}
