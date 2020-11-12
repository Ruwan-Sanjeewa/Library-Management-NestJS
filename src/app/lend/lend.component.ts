import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { LendService } from './lend.service';

@Component({
  selector: 'lend',
  templateUrl: './lend.component.html',
  styleUrls: ['./lend.component.css']
})
export class LendComponent implements OnInit {

  constructor(private lendService:LendService) { }

  public lendData = [];
  
  listLend: MatTableDataSource<any>;  
  displayedColumns: string[] = ['lend_id', 'lend_date', 'receiving_date', 'username','book_id', 'member_id', 'lend_status','action'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
  
    this.lendService.getAllBooks().subscribe(
      (data) => {
        this.lendData = Array.from(Object.keys(data), k => data[k]);
      this.listLend = new MatTableDataSource(this.lendData);
        
        this.listLend.sort = this.sort;
        this.listLend.paginator = this.paginator;
      
      }
    )
  
  }


  saveLend() {
    
  }

}
