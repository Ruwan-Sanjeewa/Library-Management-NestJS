import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGaurdService as AuthGuard }  from './auth-guard.service';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { MemberComponent } from './member/member.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent },
  {path:'book',component:BookComponent,canActivate:[AuthGuard]},
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
  { path: 'member', component: MemberComponent, canActivate: [AuthGuard] },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
