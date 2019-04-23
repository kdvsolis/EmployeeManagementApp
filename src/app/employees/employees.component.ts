import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  searchForm: FormGroup;
  constructor(private api: ApiService, private formBuilder: FormBuilder) { }

  employees: any;
  
  displayedColumns = ['userID', 'name', 'active', 'pageview', 'edit', 'delete'];
  dataSource = new EmployeeDataSource(this.api, false, null);
  
  ngOnInit() {
	this.api.getEmployees()
	.subscribe(res => {
	  console.log(res);
	  this.employees = res;
	}, err => {
	  console.log(err);
	});
	this.searchForm = this.formBuilder.group({ search : [], active: []});
  }
  
  deleteEmployee(userID) {
	  var r = confirm("Confirm delete?");
	  if (r == true) {
		  this.api.deleteEmployee(userID)
			.subscribe(res => {
				this.dataSource = new EmployeeDataSource(this.api, false, null);
			  }, (err) => {
				console.log(err);
			  }
			);
	  } else {
		  
	  }
  }
  
  searchEmployee(form:NgForm) {
	  var search = form["search"];
	  this.dataSource = new EmployeeDataSource(this.api, true, form);
	  /*this.api.getFilteredEmployees(search)
		.subscribe(res => {
			this.dataSource = new EmployeeDataSource(this.api, true, search);
		  }, (err) => {
			console.log(err);
		  }
		);*/
  }
  

}

export class EmployeeDataSource extends DataSource<any> {
  constructor(private api: ApiService, private filtered: boolean, private data: NgForm) {
    super()
  }
  connect() {
	if(!this.filtered || this.data["search"] == null) {
        return this.api.getEmployees();
	}
	else {
		console.log("name filter" + this.data["search"]);
		return this.api.getFilteredEmployees(this.data);
	}
  }
  disconnect() {
  }
}