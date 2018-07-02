import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DomSanitizer } from '@angular/platform-browser';
import { Users } from '../models/users';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

  private profiles: AngularFireList<any[]>;
  members: Array<Users> = [];

  cleanedImage: any;
  private sub: any;

  constructor(
    private db: AngularFireDatabase,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // show only profiles with activities
    this.profiles = this.db.list('/Profile');
    this.profiles.valueChanges().subscribe(queriedItems => {
      this.members = [];

      Object.keys(queriedItems).map(
        (prop) => {
          const member = this.generateArray(queriedItems[prop].User);
          if (member[0].member && !member[0].admin) {
            this.cleanedImage = this.sanitizer.bypassSecurityTrustUrl(member[0].image);
            queriedItems[prop].image = this.cleanedImage.changingThisBreaksApplicationSecurity;
            queriedItems[prop].fname = member[0].fname;
            queriedItems[prop].lname = member[0].lname;
            queriedItems[prop].title = member[0].title;
            queriedItems[prop].company = member[0].company;
            queriedItems[prop].city = member[0].city;
            queriedItems[prop].country = member[0].country;
            queriedItems[prop].expertise = member[0].expertise;
            queriedItems[prop].bio = member[0].bio;
            queriedItems[prop].github = member[0].github;
            queriedItems[prop].twitter = member[0].twitter;
            queriedItems[prop].website = member[0].website;
            this.members.push(queriedItems[prop])
          }
        }
      );

      this.members.sort(this.alphabetize('lname'));
    });
  }

  alphabetize(key) {
    return function (a, b) {
      if (a[key] > b[key]) { return 1 };
      if (a[key] < b[key]) { return -1 };
      return 0;
    }
  }

  generateArray(obj) {
    // sort
    return Object.keys(obj).map(
      (key) => { return obj[key] }
    );
  }

}
