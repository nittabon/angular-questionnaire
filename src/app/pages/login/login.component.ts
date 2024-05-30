import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: any = {
    "Username": "",
    "Password": ""
  };
  constructor(private http: HttpClient, private router: Router,private dialog: MatDialog){}

  onLogin() {

    this.http.post('https://training-homework.calllab.net/v1/login', this.loginObj).subscribe({
      next: (res:any) => {
        localStorage.setItem('loginTOken', res.data.accessToken);
        localStorage.setItem('fullName', res.data.fullName);
        this.router.navigateByUrl('/categories');
      },
      error: err => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            title: 'Error',
            message: 'login Failed',
          },
        });
      }
    });

  }
}

