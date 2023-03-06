import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  openSnackBar(message:string){
    return this.snackbar.open(message, "Okay!", {horizontalPosition:"center", verticalPosition: "bottom" ,duration: 5000, panelClass: ['snackbar-success']})
  }
}
