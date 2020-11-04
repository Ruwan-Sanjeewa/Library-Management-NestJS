import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService:HomeService) { }

  bookCount: any;
  memberCount: any;

  ngOnInit() {
    this.homeService.getBookCount().subscribe(
      (data) => {
        this.bookCount = data;
      }
    )

    this.homeService.getMemberCount().subscribe(
      (data) => {
        this.memberCount = data;
        }
      )



  }

}
