import { Component, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from "firebase";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';

@Component({
  templateUrl: 'signup.component.html'
})

export class SignupComponent {
  public error: any;
  public expertise: any = [];
  public member: false;
  fname: string;
  lname: string;
  title: string;
  company: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalcode: string;
  country: string;
  phone: string; 
  website: string; 
  twitter: string; 
  github: string;
  password: string;
  bio: string;
  image: string;
  message: string;

user: Observable<firebase.User>;

 constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFireDatabase,
    private router: Router) {
      this.user = afAuth.authState; 
  }

  appendExpertise(status,value){
    if(status){
      this.expertise.push(value)
    }
    else{
      for (var i = 0; i < this.expertise.length; i++) {
        if(this.expertise[i] == value){
          let index = this.expertise.indexOf(value);
          this.expertise.splice(index,1);
        }
      }
    }
    console.log(this.expertise)
  }

  fileChange(event) {
    var files = event.srcElement.files;
    var file = files[0];
    var storageUrl = 'images/';
    var name = `img-${Date.now()}.jpg`;
    var storageRef = firebase.storage().ref(storageUrl + name);
    storageRef.put(file).then(function(snapshot) {
      //get the download URL
      console.log(snapshot.downloadURL)
      localStorage.setItem("currFile",snapshot.downloadURL);
    });
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.afAuth.auth.createUserWithEmailAndPassword(
        formData.value.email,formData.value.password        
      ).then(
        (success) => {
            this.createUserProfile(success.uid,
            formData.value.fname,formData.value.lname,
            formData.value.title,formData.value.company,
            formData.value.bio,this.expertise,
            formData.value.address1,formData.value.address2,
            formData.value.city,formData.value.state,formData.value.postalcode,
            formData.value.country,formData.value.phone,
            formData.value.website,formData.value.twitter,
            formData.value.github)
      }).catch(
        (err) => {
        this.error = err.message;
      })
    } else {
      this.error = 'Your form is invalid';
    }
  }

  createUserProfile(uid,fname,lname,title,company,bio,expertise,address1,address2,city,state,postalcode,country,phone,website,twitter,github){
    const data = this.db.list('/Profile/'+uid+'/User')      
      data.push({ fname: fname, lname: lname, title: title, company: company, expertise: expertise, image: localStorage.getItem("currFile"), bio: bio, member: false, date: firebase.database.ServerValue.TIMESTAMP,address1: address1,address2: address2,city: city,state: state,postalcode: postalcode,country: country,phone: phone,website: website,twitter: twitter,github: github  })
    .then(
        (success) => {
        console.log(success);
        //clear localstorage
        localStorage.removeItem("currFile");
        this.router.navigate(['/success']);
      }).catch(
        (err) => {
        alert(err.message);
      })
  }
}

@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  public error: any;
  public member: false;
  email: string;
  password: string;
  message: string;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router) { }

 getUser(id){
      const queryObservable = this.db.list('/Profile/'+id+'/User');
      queryObservable.subscribe(queriedItems => {
          this.member = queriedItems[0].member;
          console.log(this.member)
          if(this.member){
            this.router.navigate(['/dashboard']);
          } 
          else{
            this.error = "You have not yet been approved as a member of this group."
          }
      });
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.afAuth.auth.signInWithEmailAndPassword(
        formData.value.email,
        formData.value.password
      ).then(
        (success) => {
        this.getUser(success.uid);
      }).catch(
        (err) => {
        this.error = err.message;
      })
    } else {
      this.error = 'Your form is invalid';
    }
  }
}

@Component({
  templateUrl: 'resetpassword.component.html'
})

export class ResetpassComponent {
  email: string;

  constructor(private afAuth: AngularFireAuth) { }

  onSubmit(formData) {
     if(formData.valid) {
       console.log('Submission worked');
     }
  }
}

@Component({
  templateUrl: 'success.component.html'
})

export class SuccessComponent {}