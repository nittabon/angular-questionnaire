import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css'
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string,title: string },private router: Router,private dialog: MatDialog) { }

  onClose(){
    this.dialog.closeAll();
    this.router.navigateByUrl('/categories');
  }

}
