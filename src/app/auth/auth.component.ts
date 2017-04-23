import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire, AngularFireAuth } from 'angularfire2';

@Component({
  templateUrl: 'signup.component.html'
})


export class SignupComponent {
  public error: any;

 constructor(private af: AngularFire, private router: Router) {
    const user = this.af.auth.subscribe(
      auth => this.getUser(auth)
    );
  }

  getUser(auth){
    const queryObservable = this.af.database.list('/Profile', {
    query: {
      orderByChild: 'uid',
      equalTo: auth.uid 
    }
   });

   queryObservable.subscribe(queriedItems => {
      console.log(queriedItems);
        
   });

  }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
            this.createUserProfile(success.uid)
      }).catch(
        (err) => {
        alert(err);
        //this.router.navigate(['/login']);
      })
    } else {
      this.error = 'Your form is invalid';
    }
  }

  createUserProfile(uid){
    const data = this.af.database.list('/Profile')
      data.push({ uid: uid, verified: false })
    .then(
        (success) => {
        console.log(success);
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

  constructor(private af: AngularFire, private router: Router) { }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/dashboard']);
      }).catch(
        (err) => {
        alert(err.message);
        //this.router.navigate(['/dashboard']);
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
  constructor(private af: AngularFire) { }

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