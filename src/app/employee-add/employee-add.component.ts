import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  
  employeeForm: FormGroup;
  name: string = '';
  active: string = 'No';
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
	this.employeeForm = this.formBuilder.group({
	  'name' : [null, Validators.required],
	  'active' : [null, Validators.required]
	});
  }
  onFormSubmit(form:NgForm) {
	this.api.postEmployee(form)
	.subscribe(res => {
		let id = res['userID'];
		this.router.navigate(['/employee-details', id]);
	  }, (err) => {
		console.log(err);
	  });
  }
}
