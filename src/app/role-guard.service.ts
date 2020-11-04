import { Injectable } from '@angular/core';
import { Router,CanActivate,ActivatedRouteSnapshot} from '@angular/router';
import { LoginService } from './login/login.service';
import  decode  from 'jwt-decode';

@Injectable()
export class RoleGuardService implements CanActivate{
    constructor(public loginService: LoginService, public router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot): boolean{
       
        const expectedRole = route.data.expectedRole;

        const token = localStorage.getItem('blog-token');
        
 
        const tokenPayload = decode(token);
        

        if (this.loginService.isUserLoggedIn() || tokenPayload.username != expectedRole) {
            this.router.navigate(['login']);
            console.log(" wrong user");
            console.log(expectedRole);
            
            return false;
        }

        return true;
    }
}