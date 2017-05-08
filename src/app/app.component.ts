import { Component } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'root-app',
  templateUrl: 'app.component.html'
})
export class AppComponent { 

user: Observable<firebase.User>;
constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) {
  this.user = afAuth.authState;
}

  member = false;
  environment = window.location.hostname;
  

  getUser(auth){
    if (auth != null) {
      const queryObservable = this.db.list('/Profile', {
      query: {
        orderByChild: 'uid',
        equalTo: auth.uid 
      }
   });

    queryObservable.subscribe(queriedItems => {
        console.log(queriedItems);
        this.member = queriedItems[0].member;  
    });
    
  }

  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }
}


@Component({
  templateUrl: 'page.not.found.html'
})

export class PageNotFoundComponent {}