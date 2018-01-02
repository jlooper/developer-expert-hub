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
  users: Array<any[]>;

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
    checkins: FirebaseListObservable<any[]>;
    name: string;
    company: string;
    title: string;
    bio: string;
    expertise: string;
    email: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalcode: string;
    country: string;
    phone: string;
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
                      this.title = queriedItems[prop].title;
                      this.address1 = queriedItems[prop].address1;
                      this.address2 = queriedItems[prop].address2;
                      this.city = queriedItems[prop].city;
                      this.state = queriedItems[prop].state;
                      this.country = queriedItems[prop].country;
                      this.postalcode = queriedItems[prop].postalcode;
                      this.phone = queriedItems[prop].phone;
                      this.bio = queriedItems[prop].bio;
                      this.expertise = queriedItems[prop].expertise;
                  }  
              });
        this.activities = this.db.list('/Profile/'+this.id+'/Activities');
        this.requests = this.db.list('/Profile/'+this.id+'/Requests');
        this.checkins = this.db.list('/Profile/'+this.id+'/Checkins');
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
  activity: string;

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
        this.activity = '';
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
  request: string;

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
        // empty the value so do not let several shipments of the same
        this.request = '';
      }).catch(
        (err) => {
        this.error = err.message;
      })
  }
}

/*checkin*/
@Component({
  selector: 'checkins',
  templateUrl: 'checkins.component.html'
})
    
export class CheckinsComponent { 
  
  user: Observable<firebase.User>;
  id: any;
  success: string;
  error: string;
  continue: string;
  activities: string;
  feedback: string;

constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
      this.user = afAuth.authState;
      this.user.subscribe((user: firebase.User) => {
      if(user != null){
        this.id = user.uid;
      }
    });
}

handleChange(status,value){
    if(status){
      this.continue=value;
    }
  }
  
onSubmit(formData){
//push to the user's id within the Requests object
    const data = this.db.list('/Profile/'+this.id+'/Checkins')
      data.push({ activities: formData.value.activities, date: '7/2017', continue: formData.value.continue, feedback: formData.value.feedback })
    .then(
        (success) => {
          this.success = "Checkin logged! Thank you!";
          this.activities = '';
          this.feedback = '';
      }).catch(
        (err) => {
        this.error = err.message;
      })
  }
}

