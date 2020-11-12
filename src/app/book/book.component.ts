import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from './book.service';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  
  constructor(private bookService: BookService, private changeDetectorRefs: ChangeDetectorRef,
     private snackBar:MatSnackBar,private modalService: NgbModal,private router:Router) { }

  public bookdata = [];
  
  listBook: MatTableDataSource<any>;  
  displayedColumns: string[] = ['id', 'name', 'writer', 'price','category', 'published_date', 'publisher_name', 'received_way','received_date','status','action'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  searchKey: string;
  saveUpdateBookForm:FormGroup;
  deleteRowId: string;

 
  ngOnInit() {

this.saveUpdateBookForm =new FormGroup({
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
      
  status: new FormControl(null,[
      
        Validators.minLength(0)
      ]),
    })


    this.getAllBooks();
      
  }

  getAllBooks() {
   this.bookService.getAllBooks().subscribe(
      (data) => {
        this.bookdata = Array.from(Object.keys(data), k => data[k]);
        
        this.listBook = new MatTableDataSource(this.bookdata);
        
        this.listBook.sort = this.sort;
        this.listBook.paginator = this.paginator;
        
        
      },

      (error) => {
         if (error.error.statusCode == 401) {
          this.modalService.dismissAll();
           this.router.navigate(['login']);
           localStorage.clear();
        }
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

  
 

  onClickUpdate(row, update_content) {
    if (localStorage.getItem('role') == "user") {
        this.snackBar.open('Unauhorized : Admin users can only perform this action', '::', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'error'
          });
    }

    if (localStorage.getItem('role') == "admin" || localStorage.getItem('role') == "superadmin") {
      this.modalService.open(update_content, { ariaLabelledBy: 'update_modal' ,backdrop:'static'});
        this.saveUpdateBookForm.setValue(row);
      
        
        this.saveUpdateBookForm.patchValue({
          published_date: formatDate(row.published_date, 'yyyy-MM-dd', 'en'),
          received_date: formatDate(row.received_date, 'yyyy-MM-dd', 'en')
        });
    }
  }

  onClickDelete(row, delete_content) {
    if (localStorage.getItem('role') == "user") {
        this.snackBar.open('Unauhorized : Admin users can only perform this action', '::', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'error'
          });
    }

    if (localStorage.getItem('role') == "admin" || localStorage.getItem('role') == "superadmin") {
       this.modalService.open(delete_content, { ariaLabelledBy: 'delete_modal' ,backdrop:'static' });
    this.deleteRowId = row.id;
    }
    
   
  }

  onClickCreate(create_content) {

    if (localStorage.getItem('role') == "user") {
       this.snackBar.open('Unauhorized : Admin users can only perform this action', '::', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'error'
          });
    }

    if (localStorage.getItem('role') == "admin" || localStorage.getItem('role') == "superadmin") {
      this.modalService.open(create_content, { ariaLabelledBy: 'create_modal' ,backdrop:'static'});
    }
  
}
    onModalClose() {
    this.saveUpdateBookForm.reset();
    
  }


  
  
  onSave() {
    
    this.bookService.saveBook(this.saveUpdateBookForm.value).subscribe(
      (data) => {
          this.bookdata.push(data),
          this.listBook = new MatTableDataSource(this.bookdata);
          this.listBook.sort = this.sort;
          this.listBook.paginator = this.paginator;
          this.changeDetectorRefs.detectChanges();
          this.saveUpdateBookForm.reset();
          this.modalService.dismissAll();
        
          this.snackBar.open('Book Created Successfully !!!', '::', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass:'success'
        });
         
      },
      error => {
        if (error.error.statusCode == 401) {
          this.modalService.dismissAll();
          this.router.navigate(['login']);
           localStorage.clear();
        }

        if (error.error.statusCode == 400) {
          this.snackBar.open('All fields must be filled !!!', '::', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'error'
          });
        }

 if (error.error.statusCode == 409) {
          this.snackBar.open('This Book has been already in Database !!!', '::', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'error'
          });
        }


      }
      
    );

   


  }

onUpdate() {
   
  this.bookService.updateBook(this.saveUpdateBookForm.value, this.saveUpdateBookForm.controls['id'].value).subscribe(
    data => {
       for (var i = 0; i < this.bookdata.length; i++){
          if (this.bookdata[i].id == data.id) {
            this.bookdata[i] = data;
            break;
          }
        }
        this.listBook = new MatTableDataSource(this.bookdata);
          this.listBook.sort = this.sort;
          this.listBook.paginator = this.paginator;
          this.changeDetectorRefs.detectChanges();
          this.saveUpdateBookForm.reset();
          this.modalService.dismissAll();
     
        this.snackBar.open('Book Updated Successfully !!!', '::', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass:'success'
      });

     
    },
    error => { 

           if (error.error.statusCode == 401) {
          this.modalService.dismissAll();
             this.router.navigate(['login']);
              localStorage.clear();
        }

          if (error.error.statusCode == 400) {
          this.snackBar.open('All fields must be filled !!!', '::', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'error'
          });
        }


       }
    );

   
  }

  onDelete() {
    this.bookService.deleteBook(this.deleteRowId).subscribe(
      data => {
       
        for (var i = 0; i < this.bookdata.length; i++){
          if (this.bookdata[i].id == data.id) {
            this.bookdata.splice(i, 1);
            break;
          }
        }
        
          this.listBook = new MatTableDataSource(this.bookdata);
          this.listBook.sort = this.sort;
          this.listBook.paginator = this.paginator;
          this.changeDetectorRefs.detectChanges();
  
      
      this.snackBar.open('Book Deleted Successfully !!!', '::', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass:'success'
      });
       },
      error => {
         if (error.error.statusCode == 401) {
          this.modalService.dismissAll();
           this.router.navigate(['login']);
            localStorage.clear();
        }
      }
    )
  }



  
  onClear() {
   this.saveUpdateBookForm.reset();
 }

  

}
