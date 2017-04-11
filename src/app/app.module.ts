import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';


import { AppComponent, PageNotFoundComponent } from './app.component';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

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

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  imports:      [ 
    BrowserModule,
    AngularFireModule.initializeApp(config, firebaseAuthConfig),
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
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
