import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from './login/login.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor( private router:Router,private authservice:LoginService) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    if(this.authservice.isUserLoggedIn()){
      return true;
    }

    this.router.navigate(['']);
    
    return false;
  }


}