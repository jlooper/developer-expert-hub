import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {DomSanitizer} from '@angular/platform-browser';
import { Users } from '../models/users';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
 
  private profiles: FirebaseListObservable<any[]>;
  members: Array<Users> = [];

  cleanedImage: any;
  private sub:any;

  constructor(private db: AngularFireDatabase, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(){
      //show only profiles with activities
      this.profiles = this.db.list('/Profile');
      this.profiles.subscribe(queriedItems => {
        this.members = [];
        for (let prop in queriedItems){
          let member = this.generateArray(queriedItems[prop].User);
          if (member[0].member && !member[0].admin){
            this.members.push(queriedItems[prop])
            this.cleanedImage = this.sanitizer.bypassSecurityTrustUrl(queriedItems[prop].image);
            queriedItems[prop].image = this.cleanedImage.changingThisBreaksApplicationSecurity;
          }
        }
      });
    }

    generateArray(obj){
      //sort
      return Object.keys(obj).map(
        (key) => { return obj[key] }
      );
    }

}