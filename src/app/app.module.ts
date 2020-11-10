import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BookComponent } from './book/book.component';
import { HomeComponent } from './home/home.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BookService } from './book/book.service';
import {MatInputModule,MatButtonModule, 
        MatFormFieldModule, 
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatTableModule,
        MatSortModule,
  MatPaginatorModule,
        MatSnackBarModule
        } from '@angular/material';

import { MatTableExporterModule } from 'mat-table-exporter';
import {NgbPaginationModule, NgbAlertModule,NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { MemberComponent } from './member/member.component';
import { MemberService } from './member/member.service';
import { HomeService } from './home/home.service';
import { AuthGaurdService } from './auth-guard.service';
import { LoginService } from './login/login.service';
import { RoleGuardService } from './role-guard.service';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { LendComponent } from './lend/lend.component';
import { LendService } from './lend/lend.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookComponent,
    HomeComponent,
    MainNavComponent,
    MemberComponent,
    UserComponent,
    LendComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableExporterModule,
    MatSnackBarModule,
 NgbPaginationModule, NgbAlertModule,NgbModalModule.forRoot()
  ],
  providers: [BookService,MemberService,HomeService,AuthGaurdService,LoginService,RoleGuardService,UserService,LendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
