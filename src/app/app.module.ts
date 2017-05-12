import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AppComponent } from './app.component';
import { GifService } from './gif/gif.service';
import { NavComponent } from './nav/nav.component';
import { ModalComponent } from './modal/modal.component';
import { AuthComponent } from './auth/auth.component';

export const firebaseConfig = {
    apiKey: 'AIzaSyD28tglCn-dPaDWUFviLrg6wUCgdtaSvL0',
    authDomain: 'gifpicker.firebaseapp.com',
    databaseURL: 'https://gifpicker.firebaseio.com',
    projectId: 'gifpicker',
    storageBucket: 'gifpicker.appspot.com',
    messagingSenderId: '793614291152'
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ModalComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    GifService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
