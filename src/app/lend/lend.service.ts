import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LendService{

    constructor(private http:HttpClient){

    }

   
    getAllBooks(){
        let token = localStorage.getItem('blog-token');
    
     
        const headers = new HttpHeaders({
            'Authorization':`Bearer ${token}`
        });
        
        return this.http.get('http://localhost:3000/lend', { headers: headers });
        
    }


    saveLend() {
          let token = localStorage.getItem('blog-token');
    
     
        const headers = new HttpHeaders({
            'Authorization':`Bearer ${token}`
        });

        return this.http.post<any>('http://localhost:3000/lend', { headers: headers });
    }

    
}