import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MemberService } from './member.service';

@Component({
  selector: 'member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

 constructor(private memberService: MemberService, private changeDetectorRefs: ChangeDetectorRef,
     private snackBar:MatSnackBar,private modalService: NgbModal) { }

  public memberData = [];
  
  listMember: MatTableDataSource<any>;  
  displayedColumns: string[] = ['id', 'registration_no', 'name', 'course','course_year', 'registered_date', 'address', 'guarantee_name','guarantee_address','status','action'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchKey: string;
  saveUpdateMemberForm:FormGroup;
  deleteRowId: string;


  ngOnInit() {

this.saveUpdateMemberForm =new FormGroup({
      id:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      registration_no:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      name:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      course:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      course_year:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      registered_date:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      address:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      guarantee_name:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      guarantee_address:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),

       status:new FormControl(null,[
        Validators.required,
        Validators.minLength(0)
      ]),
      
 
    })


    this.memberService.getAllMembers().subscribe(
      (data) => {
        this.memberData = Array.from(Object.keys(data), k => data[k]);
        
        this.listMember = new MatTableDataSource(this.memberData);
        this.listMember.sort = this.sort;
        this.listMember.paginator = this.paginator;
      }
        
    )
      
  }
  
onSearchClear(){
  this.searchKey = "";
  this.applyFilter();

}
 
  applyFilter() {
    this.listMember.filter = this.searchKey.trim().toLowerCase();
    
}

  
  refreshTable() {
    this.memberService.getAllMembers().subscribe(
      (data) => {
        this.memberData = Array.from(Object.keys(data), k => data[k]);
        
      this.listMember = new MatTableDataSource(this.memberData);
        this.listMember.sort = this.sort;
        this.listMember.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
      }
        
    )
  }

  onClickUpdate(row, update_content) {
     this.modalService.open(update_content, { ariaLabelledBy: 'update_modal' });
    this.saveUpdateMemberForm.setValue(row);
   
    
    this.saveUpdateMemberForm.patchValue({
      registered_date: formatDate(row.registered_date, 'yyyy-MM-dd', 'en'),
     
    });

    
  }

  onClickDelete(row,delete_content) {
    this.modalService.open(delete_content, { ariaLabelledBy: 'delete_modal' });
    this.deleteRowId = row.id;
  }

  onClickCreate(create_content) {
  this.modalService.open(create_content, { ariaLabelledBy: 'create_modal' });
}
    onModalClose() {
    this.saveUpdateMemberForm.reset();
    
  }


  
  
  onSave() {
    
    this.memberService.saveMember(this.saveUpdateMemberForm.value).subscribe(
      response => {
        this.refreshTable(), this.saveUpdateMemberForm.reset(),
          this.snackBar.open('Member Created Successfully !!!', '::', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass:'success'
        });
         
      },
      error => {
        if (error.error.statusCode == 400) {
          this.snackBar.open('All fields must be filled !!!', '::', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'error'
          });
        }

 if (error.error.statusCode == 404) {
          this.snackBar.open('This Member has been already in Database !!!', '::', {
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
   
  this.memberService.updateMember(this.saveUpdateMemberForm.value, this.saveUpdateMemberForm.controls['id'].value).subscribe(
    response => {
      this.refreshTable(),this.saveUpdateMemberForm.reset(),this.modalService.dismissAll(),
      this.snackBar.open('Member Updated Successfully !!!', '::', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass:'success'
      });

     
    },
    error => { 
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
    this.memberService.deleteMember(this.deleteRowId).subscribe(
      response => {
        this.refreshTable(),
      this.snackBar.open('Member Deleted Successfully !!!', '::', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass:'success'
      });
       },
      error => {}
    )
  }



  
  onClear() {
   this.saveUpdateMemberForm.reset();
 }


}
