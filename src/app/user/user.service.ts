import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService{
    constructor(private http: HttpClient) { }
    
    getAllUsers() {
        let token = localStorage.getItem('blog-token');
    
        const headers = new HttpHeaders({
            'Authorization':`Bearer ${token}`
        });

        return this.http.get<any>("")
    }
}