import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router,CanActivate,ActivatedRouteSnapshot} from '@angular/router';
import { LoginService } from './login/login.service';


@Injectable()
export class RoleGuardService implements CanActivate{
    constructor(public loginService: LoginService, public router: Router,private snackBar:MatSnackBar) { }
    
    canActivate(route: ActivatedRouteSnapshot): boolean{
       
        const expectedRole = route.data.expectedRole;

       const  userRole = localStorage.getItem('role');
      

      if (this.loginService.isUserLoggedIn() && userRole !== expectedRole) {
        this.router.navigate(['home']);
              this.snackBar.open('Unauhorized Action: Admin users can only view this section', '::', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'error'
          });
            
           
           
            console.log("wrong user");
            return false;
        }

        return true;
    }

}