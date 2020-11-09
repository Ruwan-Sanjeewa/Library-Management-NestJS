import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(private modalService: NgbModal,private router:Router) { }

  username: string;
  
  ngOnInit() {
    this.username = localStorage.getItem('username');
    

  }


  onLogout() {
   
    localStorage.clear();
    this.router.navigate(['login'])
  }
  
  onClickLogout(logout_content) {
     this.modalService.open(logout_content, { ariaLabelledBy:'logout_modal',backdrop:'static'});
  }

}
