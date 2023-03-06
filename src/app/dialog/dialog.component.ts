import { Component, Inject, LOCALE_ID } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { formatDate } from '@angular/common';
import { Technology } from '../model/technology';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  changes = 0;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Technology,
    @Inject(LOCALE_ID) public locale: string,
  ) {
    this.changes = this.data.history.length;
    console.log(this.data.history.length);
    
  }

  ngOnInit() {
    
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  displayDate(date: any): string {
    if(date) {
      return formatDate(date, 'HH:mm:ss dd-MM-yyyy', this.locale);
    }
    return '';
  }
}
