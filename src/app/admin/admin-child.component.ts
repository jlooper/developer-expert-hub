import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DomSanitizer } from '@angular/platform-browser';
import { Users } from '../models/users';
import * as saveAs from 'file-saver';

//newly registered users to be approved
@Component({
  selector: 'admin-new',
  templateUrl: 'admin-new.component.html'
})

export class AdminNewComponent implements OnInit {
 
  private profiles: FirebaseListObservable<any[]>;
  members: Array<Users> = [];

  cleanedImage: any;
  private sub:any;

  constructor(private db: AngularFireDatabase, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(){
      //show only profiles w/o being members
      this.profiles = this.db.list('/Profile');
      this.profiles.subscribe(queriedItems => {
        this.members = [];
        for (let prop in queriedItems){
          let member = this.generateArray(queriedItems[prop].User);
          if (!member[0].member){
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
        this.members.sort(this.alphabetize('lname'));
      });
    }

    alphabetize(key) {
      return function(a,b){
      if (a[key] > b[key]) return 1;
      if (a[key] < b[key]) return -1;
      return 0;
      }
    }

    generateArray(obj){
      //sort
      return Object.keys(obj).map(
        (key) => { return obj[key] }
      );
    }

}

//members

@Component({
  selector: 'admin-members',
  templateUrl: 'admin-members.component.html'
})

export class AdminMembersComponent implements OnInit {
 
  private profiles: FirebaseListObservable<any[]>;
  members: Array<Users> = [];

  cleanedImage: any;
  private sub:any;

  constructor(private db: AngularFireDatabase, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(){
      //show only profiles of members
      this.profiles = this.db.list('/Profile');
      this.profiles.subscribe(queriedItems => {
        this.members = [];
        for (let prop in queriedItems){
          let member = this.generateArray(queriedItems[prop].User);
          if (member[0].member){
            this.cleanedImage = this.sanitizer.bypassSecurityTrustUrl(member[0].image);
            queriedItems[prop].image = this.cleanedImage.changingThisBreaksApplicationSecurity;
            queriedItems[prop].fname = member[0].fname;
            queriedItems[prop].lname = member[0].lname;
            queriedItems[prop].address1 = member[0].address1;
            queriedItems[prop].address2 = member[0].address2;
            queriedItems[prop].title = member[0].title;
            queriedItems[prop].company = member[0].company;
            queriedItems[prop].city = member[0].city;
            queriedItems[prop].state = member[0].state;
            queriedItems[prop].postalcode = member[0].postalcode;
            queriedItems[prop].country = member[0].country;
            queriedItems[prop].expertise = member[0].expertise;
            queriedItems[prop].bio = member[0].bio;
            queriedItems[prop].github = member[0].github;
            queriedItems[prop].twitter = member[0].twitter;
            queriedItems[prop].website = member[0].website;
            this.members.push(queriedItems[prop])
          }
        }
        this.members.sort(this.alphabetize('lname'));
      });
    }

    alphabetize(key) {
      return function(a,b){
      if (a[key] > b[key]) return 1;
      if (a[key] < b[key]) return -1;
      return 0;
      }
    }

    generateArray(obj){
      //sort
      return Object.keys(obj).map(
        (key) => { return obj[key] }
      );
    }
}
/*checkins*/

@Component({
  selector: 'admin-checkins',
  templateUrl: 'admin-checkins.component.html'
})

export class AdminCheckinsComponent implements OnInit { 
    
  private profiles: FirebaseListObservable<any[]>;
  users: Array<any[]>;

  constructor(private db: AngularFireDatabase/*, private saveAs: saveAs*/) {}

  ngOnInit(){
    //show only profiles with checkins
    this.profiles = this.db.list('/Profile/');
    this.profiles.subscribe(queriedItems => {
      this.users = [];
      for (let prop in queriedItems){
        if (queriedItems[prop].Checkins){
          this.users.push(queriedItems[prop])
        }
      }
    });
  }
  
  /*saveFile() {
    let file = new Blob(['hello world'], { type: 'text/csv;charset=utf-8' });
    this.saveAs(file, 'helloworld.csv')
  }*/

  generateArray(obj){
   return Object.keys(obj).map((key)=>{ return obj[key]});
  }
  
}

/*requests*/

@Component({
  selector: 'admin-requests',
  templateUrl: 'admin-requests.component.html'
})

export class AdminRequestsComponent implements OnInit { 
    
  private profiles: FirebaseListObservable<any[]>;
  users: Array<any[]>;
  id: any;
  success: string;
  error: string;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(){
    //show only profiles with requests
    this.profiles = this.db.list('/Profile/');
    this.profiles.subscribe(queriedItems => {
      this.users = [];
      for (let prop in queriedItems){
        if (queriedItems[prop].Requests){
          this.users.push(queriedItems[prop])
        }
      }
    });
  }

  logged(id){
    console.log(id)
    //after emailing is done
    /*const data = this.db.list('/Profile/'+this.id+'/Requests/'+id)
      data.push({ logged: true, loggedDate:firebase.database.ServerValue.TIMESTAMP })
    .then(
        (success) => {
        this.success = "Request logged!";
      }).catch(
        (err) => {
        this.error = err.message;
      })*/
  }
  

  completed(){
    //after request is delivered

  }


  generateArray(obj){
   return Object.keys(obj).map((key)=>{ return obj[key]});
  }
  
}

// activities

@Component({
  selector: 'admin-activities',
  templateUrl: 'admin-activities.component.html'
})

export class AdminActivitiesComponent implements OnInit { 
    
  private profiles: FirebaseListObservable<any[]>;
  users: Array<any[]>;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(){
    //show only profiles with requests
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