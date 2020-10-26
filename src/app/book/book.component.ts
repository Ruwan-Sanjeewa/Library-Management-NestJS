import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from './book.service';
import { Observable } from 'rxjs';
import { Book } from './book';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  
  constructor(private bookService: BookService) { }

  public bookdata = [];
  
  listBook: MatTableDataSource<any>;  
  displayedColumns: string[] = ['id', 'name', 'writer', 'price','category', 'published_date', 'publisher_name', 'received_way','received_date','status','action'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  saveBookForm:FormGroup;

  
  ngOnInit() {

this.saveBookForm =new FormGroup({
      id:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      name:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      writer:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      price:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      category:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      publisher_name:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      published_date:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      received_way:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      received_date:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      
    })


    this.bookService.getAllBooks().subscribe(
      (data) => {
        this.bookdata = Array.from(Object.keys(data), k => data[k]);
        console.log(this.bookdata)
        this.listBook = new MatTableDataSource(this.bookdata);
        this.listBook.sort = this.sort;
        this.listBook.paginator = this.paginator;
      }
        
    )
      
  }
  
onSearchClear(){
  this.searchKey = "";
  this.applyFilter();

}
 
  applyFilter() {
    this.listBook.filter = this.searchKey.trim().toLowerCase();
}

  
  onSave() {
    console.log(this.saveBookForm.value);
    this.bookService.saveBook(this.saveBookForm.value).subscribe(
      response => console.log('success!', response),
      error => console.log('error!', error)
    );

    location.reload();
  }

}
