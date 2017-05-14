import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';

import { AppComponent, PageNotFoundComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { DashModule } from './dashboard/dashboard.module';

import { AppRouting } from './app.routing';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

export const config = {
    apiKey: "AIzaSyDx-mZpJVlElmCv4fVX1wbbIhR377nq49s",
    authDomain: "developer-expert-hub.firebaseapp.com",
    databaseURL: "https://developer-expert-hub.firebaseio.com",
    projectId: "developer-expert-hub",
    storageBucket: "developer-expert-hub.appspot.com",
    messagingSenderId: "481924833661"
};

@NgModule({
  imports:      [ 
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AuthModule,
    DashModule,
    AppRouting,
    CommonModule
   ],
  declarations: [ 
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
