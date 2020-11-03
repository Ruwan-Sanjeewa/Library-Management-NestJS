import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGaurdService } from './auth-guard.service';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { MemberComponent } from './member/member.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'book',component:BookComponent},
  { path: 'home', component: HomeComponent },
{path:'member',component:MemberComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
