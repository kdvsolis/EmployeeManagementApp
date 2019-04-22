import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeAddTimeComponent } from './employee-add-time/employee-add-time.component';
import { EmployeeEditTimeComponent } from './employee-edit-time/employee-edit-time.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule  } from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";

const appRoutes: Routes = [
  {
    path: 'employees',
    component: EmployeesComponent,
    data: { title: 'Employee List' },
	canActivate: [AuthGuard]
  },
  {
    path: 'employee-details/:userID',
    component: EmployeeDetailComponent,
    data: { title: 'Employee Details' },
	canActivate: [AuthGuard]
  },
  {
    path: 'employee-add',
    component: EmployeeAddComponent,
    data: { title: 'Add Employee' },
	canActivate: [AuthGuard]
  },
  {
    path: 'employee-add-time/:userID',
    component: EmployeeAddTimeComponent,
    data: { title: 'Add Employee Time' },
	canActivate: [AuthGuard]
  },
  {
    path: 'employee-edit/:userID',
    component: EmployeeEditComponent,
    data: { title: 'Edit Employee' },
	canActivate: [AuthGuard]
  },
  {
    path: 'employee-edit-time/:_id',
    component: EmployeeEditTimeComponent,
    data: { title: 'Edit Employee Time' },
	canActivate: [AuthGuard]
  },
  {
	  path: 'login',
	  component: LoginComponent
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeDetailComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeAddTimeComponent,
    EmployeeEditTimeComponent,
	LoginComponent
  ],
  imports: [
	RouterModule.forRoot(appRoutes),
	BrowserModule,
    AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
	BrowserAnimationsModule,
	MatInputModule,
	MatTableModule,
	MatPaginatorModule,
	MatSortModule,
	MatProgressSpinnerModule,
	MatIconModule,
	MatButtonModule,
	MatCardModule,
	MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule, 
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/api/auth']
      }
    })
  ],
  providers: [
	  AuthService,
	  AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
