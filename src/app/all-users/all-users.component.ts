import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {

  displayedColumns = ['FirstName', 'LastName', 'Email', 'Date', 'Status', 'Activate'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  id: any = "";
  user = '';
  users: any;
  firstName = '';
  lastName = '';
  usersDetail: any[] = []
  subs = '';
  cardName = '';
  total = 0;
  phoneNum = '';
  address = '';
  searchText = '';
  dte: any
  substotal = 0;
  isLoading = true
  constructor(private authService: AuthService, private toast: ToastrService) {
    setTimeout(() => {
      this.isLoading = false; // Set isLoading to false when loading is complete
    }, 1000);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.authService.GetUsers();
    this.authService.users$.subscribe((users: any) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  onChangeStatus(e, user) {
    let isActif = e.checked ? true : false;

    if (isActif == false) {
      user.isActif = false;
    }
    else if (isActif == true) {
      user.isActif = true;
    }
    this.authService.updateUserStatus(user).subscribe((user: any) => {
      this.toast.success('Ce compte a été approuvé avec succées')

    });
  }

}
