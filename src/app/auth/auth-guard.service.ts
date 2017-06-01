import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class AuthGuard implements CanActivate{
  public allowed: boolean;
  member: boolean;
  id; any;
  user: Observable<firebase.User>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) { 
    this.user = afAuth.authState;
  this.user.subscribe((user: firebase.User) => {
      if(user != null){
        this.id = user.uid;
        console.log("my id is", this.id);
        const queryObservable = this.db.list('/Profile', {
            query: {
              orderByChild: 'uid',
              equalTo: this.id
            }
        });

          queryObservable.subscribe(queriedItems => {
            console.log(queriedItems[0])
              this.member = queriedItems[0].member; 
              console.log("I'm a member",this.member)
          });
      }
});
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    
    return this.user.map((user) =>  {
      if(user == null || !this.member) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }).first()
    
  }
}