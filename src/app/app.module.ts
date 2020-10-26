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
        MatPaginatorModule
        } from '@angular/material';

import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookComponent,
    HomeComponent,
    MainNavComponent,
    
    
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
    MatTableExporterModule
    
    
  
  
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
