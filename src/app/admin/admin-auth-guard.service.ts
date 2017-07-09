import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class AdminAuthGuard implements CanActivate{
  public error: string;
  admin: boolean;
  id; any;
  user: Observable<firebase.User>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) { 
    this.user = afAuth.authState;
    this.user.subscribe((user: firebase.User) => {
        if(user != null){
          this.id = user.uid;
          const queryObservable = this.db.list('/Profile/'+this.id+'/User');
            queryObservable.subscribe(queriedItems => {
                this.admin = queriedItems[0].admin; 
            });
        }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    
    return this.user.map((user) =>  {
      if(user == null || !this.admin) {
        this.router.navigate(['/admin']);
        return false;
      } else {
        return true;
      }
    }).first()
    
  }
}