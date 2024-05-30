import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { QuestionComponent } from './pages/question/question.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'',
    component:LayoutComponent,
    children:  [
      {
        path:'categories',
        component: CategoriesComponent
      },
      {
        path:'question/:id',
        component: QuestionComponent
      },
    ]
  },
  {
    path:'**',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
