import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MemberService{

    constructor (private http:HttpClient){}

getAllMembers(){
        let token = localStorage.getItem('blog-token');
    
        const headers = new HttpHeaders({
            'Authorization':`Bearer ${token}`
        });
        
        return this.http.get('http://localhost:3000/members', { headers: headers });
        
    }

    saveMember(memberData) {
        let token = localStorage.getItem('blog-token');
    
        const headers = new HttpHeaders({
            'Authorization':`Bearer ${token}`
        });
        return this.http.post<any>('http://localhost:3000/members',memberData,{headers:headers})

    }

    updateMember(updateData, id) {
        
        let token = localStorage.getItem('blog-token');
    
        const headers = new HttpHeaders({
            'Authorization':`Bearer ${token}`
        });
        return this.http.put<any>('http://localhost:3000/members/'+ id,updateData,{headers:headers})

    }

     deleteMember(id) {
        
        let token = localStorage.getItem('blog-token');
    
        const headers = new HttpHeaders({
            'Authorization':`Bearer ${token}`
        });
        return this.http.delete<any>('http://localhost:3000/members/'+ id,{headers:headers})

    }


}