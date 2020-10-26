import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Book } from './book';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BookService{

    constructor(private http:HttpClient){

    }

   
    getAllBooks(){
        let token = localStorage.getItem('blog-token');
    
        const headers = new HttpHeaders({
            'Authorization':`Bearer ${token}`
        });
        
        return this.http.get('http://localhost:3000/books', { headers: headers });
        
    }

    saveBook(bookData) {
        let token = localStorage.getItem('blog-token');
    
        const headers = new HttpHeaders({
            'Authorization':`Bearer ${token}`
        });
        return this.http.post<any>('http://localhost:3000/books',bookData,{headers:headers})

    }

    

}