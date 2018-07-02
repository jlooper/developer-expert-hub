import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'root-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  user: Observable<firebase.User>;

  id: any;
  member: boolean;
  admin: boolean;
  error: string;
  environment = window.location.hostname;

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
    this.user.subscribe((user: firebase.User) => {
      if (user != null) {
        this.id = user.uid;
        const queryObservable = this.db.list('/Profile/' + this.id + '/User');
        queryObservable.valueChanges().subscribe(queriedItems => {
          console.log(queriedItems[0])
          this.member = (<any>queriedItems[0]).member;
          this.admin = (<any>queriedItems[0]).admin;
        });
      }
    });
  }

  ngOnInit() {



  }

  logout() {
    this.afAuth.auth.signOut();
    this.member = false;
    this.id = '';
    this.router.navigate(['/'])
  }
}


@Component({
  templateUrl: 'page.not.found.html'
})

export class PageNotFoundComponent { }
