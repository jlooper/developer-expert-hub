import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthGuard implements CanActivate{
  public allowed: boolean;
  user: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth, private router: Router) { 
    this.user = afAuth.authState;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    
    return this.user.map((user) =>  {
      if(user == null) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }).first()
    
  }
}