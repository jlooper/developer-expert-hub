import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html'
})

export class ProfileComponent { 
    
    user: Observable<firebase.User>;

    constructor(private afAuth: AngularFireAuth) {
      this.user = afAuth.authState;
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
