import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  _id: string;
  userID: string;
  name: string;
  active: string;
  
  time_in_out: any; 
  
  displayedColumns = ['date', 'time_in', 'time_out', 'edit', 'delete'];
  dataSource = new EmployeeTimeInOutDataSource(this.api, this.route.snapshot.params['userID']);
  

  ngOnInit() {
    this.getEmployeeDetails(this.route.snapshot.params['userID']);
  }

  getEmployeeDetails(userID) {
	  this.api.getEmployee(userID)
		.subscribe(data => {
		  this.userID = data[0].userID;
		  this.name = data[0].name;
		  this.active = data[0].active;
		});
	  this.api.getEmployeeTimeInOut(userID)
		.subscribe(data => {
			this.time_in_out = data;
		});
  }
  
  deleteEmployeeDateTime(_id) {
	  var r = confirm("Confirm delete?");
	  if (r == true) {
		  this.api.deleteEmployeeDateTime(_id)
			.subscribe(res => {
				this.dataSource = new EmployeeTimeInOutDataSource(this.api, this.route.snapshot.params['userID']);
			  }, (err) => {
				console.log(err);
			  }
			);
	  } else {
		  
	  }
  }
}

export class EmployeeTimeInOutDataSource extends DataSource<any> {
  constructor(private api: ApiService, private userID: string) {
    super()
  }
  connect() {
    return this.api.getEmployeeTimeInOut(this.userID);
  }
  disconnect() {
  }
}