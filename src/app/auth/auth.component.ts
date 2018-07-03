import { Component, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
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

  appendExpertise(status, value) {
    if (status) {
      this.expertise.push(value)
    } else {
      for (let i = 0; i < this.expertise.length; i++) {
        if (this.expertise[i] === value) {
          const index = this.expertise.indexOf(value);
          this.expertise.splice(index, 1);
        }
      }
    }
  }

  fileChange(event) {
    const files = event.srcElement.files;
    const file = files[0];
    const storageUrl = 'images/';
    const name = `img-${Date.now()}.jpg`;
    const storageRef = firebase.storage().ref(storageUrl + name);
    storageRef.put(file).then(function (snapshot) {
      // get the download URL
      console.log(snapshot.downloadURL);
      localStorage.setItem('currFile', snapshot.downloadURL);
    });
  }

  onSubmit(formData) {
    if (formData.valid) {
      this.afAuth.auth.createUserWithEmailAndPassword(
        formData.value.email, formData.value.password
      ).then(
        (success) => {
          this.createUserProfile((<any>success).uid,
            formData.value.fname, formData.value.lname,
            formData.value.title, formData.value.company,
            formData.value.bio, this.expertise,
            formData.value.address1, formData.value.address2,
            formData.value.city, formData.value.state, formData.value.postalcode,
            formData.value.country, formData.value.phone,
            formData.value.website, formData.value.twitter,
            formData.value.github)
        }).catch(
          (err) => {
            this.error = err.message;
          })
    } else {
      this.error = 'Your form is invalid';
    }
  }

  createUserProfile(
    uid,
    fname,
    lname,
    title,
    company,
    bio,
    expertise,
    address1,
    address2,
    city,
    state,
    postalcode,
    country,
    phone,
    website,
    twitter,
    github) {
    const data = this.db.list('/Profile/' + uid + '/User')
    data.push({
      fname: fname,
      lname: lname,
      title: title,
      company: company,
      expertise: expertise,
      image: localStorage.getItem('currFile'),
      bio: bio,
      member: false,
      date: firebase.database.ServerValue.TIMESTAMP,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      postalcode: postalcode,
      country: country,
      phone: phone,
      website: website,
      twitter: twitter,
      github: github
    })
      .then(
        (success) => {
          console.log(success);
          // clear localstorage
          localStorage.removeItem('currFile');
          this.router.navigate(['/success']);
        });
  }
}

/***
 *
 * LOGIN COMPONENT
 *
 * */


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public error: any;
  public member: false;
  email: string;
  password: string;
  message: string;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private router: Router
  ) { }

  public onSubmit(formData) {
    if (formData.valid) {
      this.afAuth.auth.signInWithEmailAndPassword(
        formData.value.email,
        formData.value.password
      )
        .then((success: firebase.auth.UserCredential) => {
          this.getUser(success.user.uid);
        })
        .catch((err) => {
          this.error = err.message;
        })
    } else {
      this.error = 'Your form is invalid';
    }
  }

  private getUser(id: string) {
    const queryObservable = this.db.list<firebase.auth.Auth>('/Profile/' + id + '/User');
    queryObservable.valueChanges().subscribe(queriedItems => {
      this.member = (<any>queriedItems[0]).member;
      console.log(this.member);
      if (this.member) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'You have not yet been approved as a member of this group.'
      }
    });
  }
}

@Component({
  templateUrl: 'resetpassword.component.html'
})

export class ResetpassComponent {
  public error: any;
  email: string;
  message: string;

  constructor(private afAuth: AngularFireAuth) { }

  onSubmit(formData) {
    if (formData.valid) {
      this.afAuth.auth.sendPasswordResetEmail(
        formData.value.email
      ).then(
        (success) => {
          this.message = 'An email with instructions has been sent'
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
  templateUrl: 'success.component.html'
})

export class SuccessComponent { }
