import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService:HomeService,private router:Router) { }

  bookCount: any;
  memberCount: any;

  ngOnInit() {
    this.homeService.getBookCount().subscribe(
      (data) => {
        this.bookCount = data;
      },
      (error) => {
         if (error.error.statusCode == 401) {
         
          this.router.navigate(['login']);
           localStorage.clear();
        }
      }
    )

    this.homeService.getMemberCount().subscribe(
      (data) => {
        this.memberCount = data;
      },
      (error)=>{
         if (error.error.statusCode == 401) {
          
          this.router.navigate(['login']);
           localStorage.clear();
        }
      }
      )



  }

 
}
