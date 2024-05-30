import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  userLogin = localStorage.getItem('fullName');



  constructor(private router: Router){
    if(this.userLogin == null){
      this.Logout();
    }
  }

  Logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
