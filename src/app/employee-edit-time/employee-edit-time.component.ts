import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-edit-time',
  templateUrl: './employee-edit-time.component.html',
  styleUrls: ['./employee-edit-time.component.css']
})

export class EmployeeEditTimeComponent implements OnInit {

  datetimeForm: FormGroup;
  userID:string = this.route.snapshot.params['userID'];
  _id:string = "";
  
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getEmployeeTimeInOutFiltered(this.route.snapshot.params['_id']);
    this.datetimeForm = this.formBuilder.group({
      'date' : [null, Validators.required],
      'time_in' : [null, Validators.required],
      'time_out' : [null, Validators.required]
    });
  }
  
  getEmployeeTimeInOutFiltered(_id) {
    this.api.getEmployeeTimeInOutFiltered(_id).subscribe(data => {
	  this._id = data[0]._id;
      this.userID = data[0].userID;
      this.datetimeForm.setValue({
        date: data[0].date.substring(0,10),
        time_in: this.am_pm_to_hours(data[0].time_in),
        time_out: this.am_pm_to_hours(data[0].time_out)
      });
    });
  }


  onFormSubmit(form:NgForm) {
	if(Date.parse('01/01/2011 ' + form["time_in"]) > Date.parse('01/01/2011 ' + form["time_out"])) {
		alert("Invalid input! Please check the fields");
	}
		
	else {
		form["time_in"] = this.hours_am_pm(form["time_in"]);
		form["time_out"] = this.hours_am_pm(form["time_out"]);
		this.api.updateEmployeeTimeInOut(this._id, form)
		  .subscribe(res => {
			  this.router.navigate(['/employee-details', this.userID]);
			}, (err) => {
			  console.log(err);
			}
		  );
	}
  }

  datetimeDetails() {
    this.router.navigate(['/employee-details', this.userID]);
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
