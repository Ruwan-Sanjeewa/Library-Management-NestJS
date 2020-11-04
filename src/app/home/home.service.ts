import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeService{
    constructor(private http: HttpClient) { }
    
    getBookCount() {
        let token = localStorage.getItem('blog-token');
    
        const headers = new HttpHeaders({
            'Authorization':`Bearer ${token}`
        });

        return this.http.get('http://localhost:3000/books/count', { headers: headers });
    }

     getMemberCount() {
        let token = localStorage.getItem('blog-token');
    
        const headers = new HttpHeaders({
            'Authorization':`Bearer ${token}`
        });

        return this.http.get('http://localhost:3000/members/count', { headers: headers });
    }




}