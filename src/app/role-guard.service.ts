import { Injectable } from '@angular/core';
import { Router,CanActivate,ActivatedRouteSnapshot} from '@angular/router';
import { LoginService } from './login/login.service';
// import  decode  from 'jwt-decode';

@Injectable()
export class RoleGuardService implements CanActivate{
    constructor(public loginService: LoginService, public router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot): boolean{
       
        const expectedRole = route.data.expectedRole;

        // const token = localStorage.getItem('blog-token');
        
 
        // const tokenPayload = decode(token);
       const  userRole = localStorage.getItem('role');

        if (this.loginService.isUserLoggedIn() && userRole !== expectedRole) {
            // this.router.navigate(['login']);
           
            console.log("wrong user");
            return false;
        }

        return true;
    }

}