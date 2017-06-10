import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import * as firebase from "firebase";
import { Http } from '@angular/http';
import {map} from 'rxjs/operator/map';


//profile
@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit { 
    
  private profiles: FirebaseListObservable<any[]>;
  private users: Array<any[]>;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(){
    //show only profiles with activities
    this.profiles = this.db.list('/Profile/');
    this.profiles.subscribe(queriedItems => {
      this.users = [];
      for (let prop in queriedItems){
        if (queriedItems[prop].Activities){
          this.users.push(queriedItems[prop])
        }
      }
    });
  }
  generateArray(obj){
   return Object.keys(obj).map((key)=>{ return obj[key]});
  }
  
}   
//my account
@Component({
  selector: 'account',
  templateUrl: 'account.component.html'
})

export class AccountComponent {

    user: Observable<firebase.User>;
    currUser: FirebaseListObservable<any[]>;
    activities: FirebaseListObservable<any[]>;
    requests: FirebaseListObservable<any[]>;
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
         this.currUser = this.db.list('/Profile/'+this.id+'/User');
            this.currUser.subscribe(queriedItems => {
                  for (let prop in queriedItems){
                      this.name = queriedItems[prop].fname + ' ' + queriedItems[prop].lname;
                      this.company = queriedItems[prop].company;
                      this.bio = queriedItems[prop].bio;
                      this.expertise = queriedItems[prop].expertise;
                  }  
              });
        this.activities = this.db.list('/Profile/'+this.id+'/Activities');
        this.requests = this.db.list('/Profile/'+this.id+'/Requests');

      }
    });
  }

}
//activities
@Component({
  selector: 'activities',
  templateUrl: 'activities.component.html'
})
    
export class ActivitiesComponent { 
  
  user: Observable<firebase.User>;
  activities: Observable<any>;
  id: any;
  email: string;
  success: string;
  error: string;

  constructor(private http: Http, private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
      this.user.subscribe((user: firebase.User) => {
      if(user != null){
        this.id = user.uid;
        this.email = user.email;
        this.activities = this.db.list('/Profile/'+this.id+'/Activities');
        
      }
  })
  
}


onSubmit(formData){
    const data = this.db.list('/Profile/'+this.id+'/Activities')
      data.push({ activity: formData.value.activity, date:firebase.database.ServerValue.TIMESTAMP })
    .then(
        (success) => {
        this.success = "Activity logged!";
      }).catch(
        (err) => {
        this.error = err.message;
      })
  }
}

//request
@Component({
  selector: 'request',
  templateUrl: 'request.component.html'
})
    
export class RequestComponent { 
  
  user: Observable<firebase.User>;
  id: any;
  email: string;
  success: string;
  error: string;
  requesttype: string;

constructor(private http: Http, private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
      this.user.subscribe((user: firebase.User) => {
      if(user != null){
        this.id = user.uid;
        this.email = user.email
    }
    
  })
  
}
  

handleChange(status,value){
    if(status){
      this.requesttype=value;
    }
  }

onSubmit(formData){
//push to the user's id within the Requests object
    const data = this.db.list('/Profile/'+this.id+'/Requests')
      data.push({ request: formData.value.request, requesttype: this.requesttype, date:firebase.database.ServerValue.TIMESTAMP })
    .then(
        (success) => {
        this.success = "Request logged!";
      }).catch(
        (err) => {
        this.error = err.message;
      })
  }
}

