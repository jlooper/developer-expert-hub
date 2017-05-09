import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit { 

user: Observable<firebase.User>;

member = false;
id: any;
environment = window.location.hostname;
  
constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router) {
  this.user = afAuth.authState;
  this.user.subscribe((user: firebase.User) => {
    console.log(user)
  if(user != null){
    this.id = user.uid;
    console.log(this.id);
  }
});
}

ngOnInit(){
  console.log("hi")

  const queryObservable = this.db.list('/Profile', {
      query: {
        orderByChild: 'uid',
        equalTo: this.id
      }
   });

    queryObservable.subscribe(queriedItems => {
        this.member = queriedItems[0].member; 
    });

}

  /*getUser(auth){
    if (auth != null) {
      const queryObservable = this.db.list('/Profile', {
      query: {
        orderByChild: 'uid',
        equalTo: auth.uid 
      }
   });

    queryObservable.subscribe(queriedItems => {
        this.member = queriedItems[0].member; 
    });
    
   }

  }*/

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }
}


@Component({
  templateUrl: 'page.not.found.html'
})

export class PageNotFoundComponent {}