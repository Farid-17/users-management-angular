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
  public form!: FormGroup;
  public isEdit: boolean = false;
  public user: any;
  public jobs: any = ["Developer", "Teacher", "Police", "Manager", "Director", "Actor"];

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    let linkWords = this.router.url.split("/");

    if (linkWords.length > 3 && !["", null, undefined].includes(linkWords[linkWords.length - 1])) {
      global.data.id = parseInt(linkWords[linkWords.length - 1]);
      this.getUser();
      this.isEdit = true;
    }

    this.formValidation();
  }

   ngOnDestroy() {
    global.data.id = null;
  }

  public submitForm = () => {
    if (!this.form.valid) {
      global.showAlert("warning", "Please enter all formations correct!");
      return;
    }

    this.saveUser(this.form.value);
  }

  public formValidation = () => {
    let numberPattern = "^(\\+212|0)(5|6|7)[0-9]{8}$";

    this.form = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern(numberPattern)]],
      job: ["", Validators.required],
    });
  }

  public generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public getUser = () => {
    let thisClass = this;
    this.http.get(global.apiLinks.users + "/" + global.data.id)
        .subscribe((response: any) => {
          global.showAlert("success", "Data saved successfuly", function () {
            thisClass.user = response.data;
            thisClass.form.controls['first_name'].setValue(thisClass.user.first_name);
            thisClass.form.controls['last_name'].setValue(thisClass.user.last_name);
            thisClass.form.controls['email'].setValue(thisClass.user.email);
            // thisClass.form.controls['phone'].setValue("+2126" + thisClass.generateRandomNumber(11111111, 99999999));
            thisClass.form.controls['phone'].setValue("+212" + thisClass.generateRandomNumber(5, 7) + thisClass.generateRandomNumber(11111111, 99999999));
            thisClass.form.controls['job'].setValue(thisClass.jobs[thisClass.generateRandomNumber(0, thisClass.jobs.length - 1)]);
          }, false);
        }, (error: HttpErrorResponse) => {
          let errorMessage = "Status code: " + error.status + ". An error occurred: " + error.message
          global.showAlert("error", errorMessage);
        });
  }

  public saveUser = (data: any) => {
    let link = global.apiLinks.users,
      thisClass = this;

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
