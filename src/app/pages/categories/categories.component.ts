import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {

  categories: any[]=[];
  constructor(private http: HttpClient,private router: Router){
    this.loadCategories();
  }


  loadCategories() {

    this.http.get('https://training-homework.calllab.net/v1/questions/categories').subscribe({
      next: (res:any) => {
        this.categories = res.data;
      },
      error: err => {
        this.router.navigateByUrl('/login');
      }
    });
  }
  onClick(questionCategoryId){
    this.router.navigateByUrl('/question/'+questionCategoryId);
  }
}

