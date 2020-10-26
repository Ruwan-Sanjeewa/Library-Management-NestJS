
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
       
        // return this.http.post<any>("http://localhost:3000/auth/signin",{username:user.username,password:user.password}).pipe(
        //     map((token) =>{
        //         console.log(token);
        //         localStorage.setItem('blog-token', token.access_token);
        //         return token;
        //     } )
        // )

        return this.http.post<any>("http://localhost:3000/auth/signin",{username:user.username,password:user.password}).pipe(
            map((token) =>{
                console.log(user.username, user.password);
                localStorage.setItem('blog-token', token.accessToken);
                return token;
            } )
        )

        
    }

    isUserLoggedIn(){
        let user = localStorage.getItem('blog-token');
    
        return !(user === null);
    }


}