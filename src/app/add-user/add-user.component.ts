import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import * as global from '../../globals';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {
  public first_name: string = '';
  public last_name: string = '';
  public email: string = '';
  public phone: string = '';
  public job: string = '';
  public myForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    let linkWords = this.router.url.split("/");

    if (linkWords.length > 3 && !["", null, undefined].includes(linkWords[linkWords.length - 1])) {
      global.data.id = parseInt(linkWords[linkWords.length - 1]);
    }

    this.formValidation();
  }

   ngOnDestroy() {
    global.data.id = null;
  }

  public submitForm = () => {
    this.saveUser({
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      job: this.job,
    });
  }

  public formValidation = () => {
    this.myForm = this.formBuilder.group({
      first_name: [this.first_name, Validators.required],
      last_name: [this.last_name, Validators.required],
      email: [this.email, Validators.required, Validators.email],
      phone: [this.phone, Validators.required],
      job: [this.job, Validators.required],
    });
  }

  public saveUser = (data: any) => {
    let link = global.apiLinks.users,
      thisClass = this;

    if (!this.myForm.valid) {
      global.showAlert("warning", "Please enter all formation correct!");
      return;
    }

    if (global.data.id != null) {
      data.id = global.data.id;
      link += "/" + global.data.id;
    }

    if (global.data.id == null) {
      this.http.post(link, data)
        .subscribe((response: any) => {
          global.showAlert("success", "Data saved successfuly", function () {
            global.data.id = null;
            thisClass.router.navigate(["/users"]);
          }, false);
        }, (error: HttpErrorResponse) => {
          let errorMessage = "Status code: " + error.status + ". An error occurred: " + error.message
          global.showAlert("error", errorMessage);
        });
    } else {
      this.http.patch(link, data)
        .subscribe((response: any) => {
          global.showAlert("success", "Data updated successfuly", function () {
            global.data.id = null;
            thisClass.router.navigate(["/users"]);
          }, false);
        }, (error: HttpErrorResponse) => {
          let errorMessage = "Status code: " + error.status + ". An error occurred: " + error.message
          global.showAlert("error", errorMessage);
        });
    }
  }
}
