import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { User } from './user';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm:FormGroup;
  errorMsg:true;
  
  constructor(private loginservice:LoginService,
    private router:Router, private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.loginForm =new FormGroup({
      username:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      password:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ])
    })
  }

  onSubmit() {
  
    if (this.loginForm.invalid) {
         this.snackBar.open('All fields must be filled !!!', ' ',{
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'login'
         });
      
      return;
    }

    this.loginservice.authenticate(this.loginForm.value).pipe(
      map(token => this.router.navigate(['home']))
    ).subscribe(
      data => console.log("success"),
      error => {
   
        if (error.error.statusCode == 401) {
         this.snackBar.open('Invalid Credentials !!!', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'login'
          });
      }

    }
      )
    
  }




}
