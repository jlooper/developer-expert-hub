import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
 items: FirebaseListObservable<any[]>;

  cleanedImage: any;
  private sub:any;

  constructor(private db: AngularFireDatabase, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(){
    //fix
    
    this.items = this.db.list('/Profile', {
      query: {
        orderByChild: 'member',
        equalTo: true
      }
      
    });
    this.items.subscribe(queriedItems => {
        for (let prop in queriedItems){
              this.cleanedImage = this.sanitizer.bypassSecurityTrustUrl(queriedItems[prop].image);
              queriedItems[prop].image = this.cleanedImage.changingThisBreaksApplicationSecurity;
        }  
    });
  }


}