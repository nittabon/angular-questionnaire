import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CustomeInterceptor } from './services/custome.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { QuestionComponent } from './pages/question/question.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        LayoutComponent,
        CategoriesComponent,
        QuestionComponent
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatListModule,
        CdkStepperModule,
        NgStepperModule,
        MatInputModule,
        MatFormFieldModule,
        MatStepperModule,
        MatButtonModule
      ],
    exports:[
      NgStepperModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            //useClass: CustomeInterceptor,
            useFactory: function(router: Router) {
              return new CustomeInterceptor(router);
            },
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }

// {
//   provide: HTTP_INTERCEPTORS,
//   //useClass: CustomeInterceptor,
//   useFactory: function(router: Router) {
//     return new CustomeInterceptor(router);
//   },
//   multi: true
// },
