import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import * as firebase from "firebase";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//profile
@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html'
})

export class ProfileComponent { 
    
    user: Observable<firebase.User>;
    currUser: FirebaseListObservable<any[]>;
    name: string;
    company: string;
    bio: string;
    expertise: string;
    email: string;
    id: any;
    
    constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
      this.user = afAuth.authState;
      this.user.subscribe((user: firebase.User) => {
      if(user != null){
        this.id = user.uid;
        this.email = user.email;
         this.currUser = this.db.list('/Profile');
          //regular querying is broken in AF afaik
            this.currUser.subscribe(queriedItems => {
                  for (let prop in queriedItems){
                    if (queriedItems[prop].uid == this.id){
                      this.name = queriedItems[prop].fname + ' ' + queriedItems[prop].lname;
                      this.company = queriedItems[prop].company;
                      this.bio = queriedItems[prop].bio;
                      this.expertise = queriedItems[prop].expertise;
                    }
                  }  
              });
      }
    });
  }
    
}
//my account
@Component({
  selector: 'account',
  templateUrl: 'account.component.html'
})

export class AccountComponent { 

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
    }
  }

}
//activities
@Component({
  selector: 'activities',
  templateUrl: 'activities.component.html'
})
    
export class ActivitiesComponent implements OnInit { 
  
  user: Observable<firebase.User>;
  activities: Observable<any>;
  id: any;
  unfurledUrl:any;
  success: string;
  error: string;

  constructor(private http: Http, private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
      this.user.subscribe((user: firebase.User) => {
      if(user != null){
        this.id = user.uid;
      }
    });
  }

  ngOnInit(){
    this.activities = this.db.list('/Activities', {
      query: {
        orderByChild: 'uid',
        equalTo: this.id
      }
      
    });
    this.activities.subscribe(queriedItems => {
        for (let prop in queriedItems){
          return this.http.get('http://unfurl.oroboro.com/unfurl?url='+queriedItems[prop].activity+'')
            .map(response => response.json())
            .subscribe(
              response => this.unfurledUrl = response,
              error => console.error('Error'),
              () => console.log('Completed!')
            );
          }
        
    });
  }


   onSubmit(formData){
    const data = this.db.list('/Activities')
      data.push({ uid: this.id, activity: formData.value.activity, logged:firebase.database.ServerValue.TIMESTAMP })
    .then(
        (success) => {
        this.success = "Activity logged!";
      }).catch(
        (err) => {
        this.error = err.message;
      })
  }
}
