import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGaurdService as AuthGuard }  from './auth-guard.service';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { MemberComponent } from './member/member.component';
import { RoleGuardService as RoleGuard, RoleGuardService} from './role-guard.service';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent },
  {
    path: 'book',
    component: BookComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole:'admin'
    }
  },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
  {
    path: 'member',
    component: MemberComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole:'admin'
    }
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
