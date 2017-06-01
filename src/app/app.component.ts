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

id: any;
member: boolean;
environment = window.location.hostname;
  
constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router) {
  this.user = afAuth.authState;
  this.user.subscribe((user: firebase.User) => {
      if(user != null){
        this.id = user.uid;
        console.log("my id is", this.id);
        const queryObservable = this.db.list('/Profile', {
            query: {
              orderByChild: 'uid',
              equalTo: this.id
            }
        });

          queryObservable.subscribe(queriedItems => {
            console.log(queriedItems[0])
              this.member = queriedItems[0].member; 
              console.log("I'm a member",this.member)
          });
      }
});
}

ngOnInit(){

  

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
    this.member = false;
    this.id = '';
    this.router.navigate(['/'])
  }
}


@Component({
  templateUrl: 'page.not.found.html'
})

export class PageNotFoundComponent {}