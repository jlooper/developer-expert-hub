import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html'
})

export class ProfileComponent { 
    public userData: any;
    constructor(private af: AngularFire) {  }

    ngOnInit() {
        this.af.auth.subscribe(auth => {
          console.log(auth);
          this.userData = auth;
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
  templateUrl: 'settings.component.html'
})

export class SettingsComponent { }
