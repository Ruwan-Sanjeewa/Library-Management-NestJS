import { Injectable } from '@angular/core';
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

    updateBook(updateData, id) {
        
        let token = localStorage.getItem('blog-token');
    
        const headers = new HttpHeaders({
            'Authorization':`Bearer ${token}`
        });
        return this.http.put<any>('http://localhost:3000/books/'+ id,updateData,{headers:headers})

    }

     deleteBook(id) {
        
        let token = localStorage.getItem('blog-token');
    
        const headers = new HttpHeaders({
            'Authorization':`Bearer ${token}`
        });
        return this.http.delete<any>('http://localhost:3000/books/'+ id,{headers:headers})

    }

    

}