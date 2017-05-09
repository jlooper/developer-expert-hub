import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit { 
    
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
      }
    });
  }
  
  ngOnInit(){


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
    
}

@Component({
  selector: 'profile',
  templateUrl: 'account.component.html'
})

export class AccountComponent { 

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
    }
  }

}

@Component({
  selector: 'profile',
  templateUrl: 'activities.component.html'
})

export class ActivitiesComponent { }
