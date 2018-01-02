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
import { AdminDashModule } from './admin/admin-dashboard.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRouting } from './app.routing';

import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

export const config = {
    apiKey: "AIzaSyAm6x_xIJUbLEs8QG9IEidzMarTfMHwFlg",
    authDomain: "developer-experts-hub.firebaseapp.com",
    databaseURL: "https://developer-experts-hub.firebaseio.com",
    projectId: "developer-experts-hub",
    storageBucket: "developer-experts-hub.appspot.com",
    messagingSenderId: "850105688978"
};

@NgModule({
  imports:      [ 
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AuthModule,
    DashModule,
    AdminDashModule,
    AppRouting,
    CommonModule,
    BrowserAnimationsModule
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
