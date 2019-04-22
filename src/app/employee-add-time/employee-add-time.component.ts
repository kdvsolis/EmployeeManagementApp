import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-add-time',
  templateUrl: './employee-add-time.component.html',
  styleUrls: ['./employee-add-time.component.css']
})
export class EmployeeAddTimeComponent implements OnInit {

  datetimeForm: FormGroup;
  
  constructor(private router: Router,  private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
	this.datetimeForm = this.formBuilder.group({
	  'date' : [null, Validators.required],
	  'time_in' : [null, Validators.required],
	  'time_out' : [null, Validators.required]
	});
  }
  onFormSubmit(form:NgForm) {
	form["userID"] = this.route.snapshot.params['userID'];
	if(Date.parse('01/01/2011 ' + form["time_in"]) > Date.parse('01/01/2011 ' + form["time_out"]) || Date.parse(form["date"]) == NaN) {
		alert("Invalid input! Please check the fields");
	}
		
	else {
		form["time_in"] = this.hours_am_pm(form["time_in"]);
		form["time_out"] = this.hours_am_pm(form["time_out"]);
		this.api.postEmployeeNewDateTime(form)
		.subscribe(res => {
			let id = this.route.snapshot.params['userID'];
			this.router.navigate(['/employee-details', id]);
		  }, (err) => {
			console.log(err);
		  });
    }
  }
  datetimeDetails() {
    this.router.navigate(['/employee-details', this.route.snapshot.params['userID']]);
  }
  
  am_pm_to_hours(time) {
        console.log(time);
        var hours = Number(time.match(/^(\d+)/)[1]);
        var minutes = Number(time.match(/:(\d+)/)[1]);
        var AMPM = time.match(/\s(.*)$/)[1];
        if (AMPM.toLowerCase() == "pm" && hours < 12) hours = hours + 12;
        if (AMPM.toLowerCase() == "am" && hours == 12) hours = hours - 12;
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;
        return (sHours +':'+sMinutes);
    }

  hours_am_pm(time) {
        var hours = time[0] + time[1];
        var min = time[3] + time[4];
        if (hours < 12) {
            return hours + ':' + min + ' AM';
        } else {
            hours=hours - 12;
            hours=(hours.length < 10) ? '0'+hours:hours;
            return hours+ ':' + min + ' PM';
        }
    }
}
