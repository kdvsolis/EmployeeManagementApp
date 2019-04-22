import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup;
  userID:string = this.route.snapshot.params['userID'];
  active = '';
  
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getEmployee(this.route.snapshot.params['userID']);
    this.employeeForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'active' : [null, Validators.required]
    });
  }
  
  getEmployee(userID) {
    this.api.getEmployee(userID).subscribe(data => {
      this.userID = data[0].userID;
      this.active = data[0].active;
      this.employeeForm.setValue({
        name: data[0].name,
		active: data[0].active
      });
    });
  }


  onFormSubmit(form:NgForm) {
    this.api.updateEmployee(this.userID, form)
      .subscribe(res => {
          this.router.navigate(['/employees']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  datetimeDetails() {
    this.router.navigate(['/employees']);
  }
}
