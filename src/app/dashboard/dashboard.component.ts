import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  columnsToDisplay = ["name", "category" , "ring", "descTech", "descClass"];

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
    // Route to Form View of chosen Technology
  }
}
