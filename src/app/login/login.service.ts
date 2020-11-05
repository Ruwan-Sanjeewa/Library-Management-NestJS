
import { Injectable } from '@angular/core';

import { User } from './user';
import { catchError,map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService{

    constructor(private http:HttpClient){
        
    }

  

    authenticate(user:User){
         return this.http.post<any>("http://localhost:3000/auth/signin",{username:user.username,password:user.password}).pipe(
            map((data) =>{
                
                localStorage.setItem('blog-token', data.accessToken);
                localStorage.setItem('role', data.role);
                
                
                return data;
            } )
        )

        
    }

    isUserLoggedIn(){
        let user = localStorage.getItem('blog-token');
    
        return !(user === null);
    }

    

}