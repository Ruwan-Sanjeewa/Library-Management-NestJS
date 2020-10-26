import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { User } from './user';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm:FormGroup;
  errorMsg:true;
  
  constructor(private loginservice:LoginService,
    private router:Router) { }

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
  
    if (this.loginForm.invalid){
      return;
    }

    this.loginservice.authenticate(this.loginForm.value).pipe(
      map(token => this.router.navigate(['home']))
    ).subscribe(
      data => console.log(data),
      error => this.errorHandling(error.status)
      )
    
  }

  errorHandling(error:string){
  
   console.log(error);

   if(error ==="401" || error ==="400"){
     
   }
  }


}
