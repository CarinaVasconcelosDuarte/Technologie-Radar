import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Technology } from '../model/technology';
import { SnackbarService } from '../services/snackbar.service';
import { TechnologyService } from '../services/technology.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  dataSource = new MatTableDataSource<Technology>();
  technologyData : any = [];
  isAdmin! : boolean;
  columnsToDisplay = ["show", "name", "category" , "ring", "descTech", "descRing"];

  constructor(
    private apiService : TechnologyService,
    private snackBar : SnackbarService,
    private router : Router,
    private authService : AuthService,
    public dialog : MatDialog
  ) { }

  ngOnInit() {
    this.loadTableData();
    this.isAdmin = this.authService.isAdmin;
    if (this.isAdmin && !this.columnsToDisplay.includes('buttons')) {
      this.columnsToDisplay.push('buttons');
    }
  }

  onPublish(technology: any) {
    this.apiService.publishTechnology(technology._id).subscribe(( data: {} ) => {
      console.log(data);
      this.snackBar.openSnackBar('Technology published sucessfully!');
    })
  }

  onDelete(technology: any) {
    this.apiService.deleteTechnology(technology._id).subscribe(( data: {} ) => {
      this.loadTableData();
    })
  }

  onRowClicked(technology: any) {
    this.router.navigate(['/details/' + technology._id]); // Route to Form View of chosen Technology
  }

  loadTableData() {
    if (this.authService.isAdmin) {
      this.apiService.getAllTechnologies().subscribe(( data: Technology[] ) => {
        this.dataSource.data = data;
      })
    } else {
      this.apiService.getPublishedTechnologies().subscribe(( data: Technology[] ) => {
        this.dataSource.data = data;
      })
    }
  }

  openDialog(technology: Technology): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: technology,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
