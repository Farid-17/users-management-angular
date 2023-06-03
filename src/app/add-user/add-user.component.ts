import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as global from '../../globals';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public first_name: string = '';
  public last_name: string = '';
  public email: string = '';
  public phone: string = '';
  public job: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  public submitForm = () => {
    this.saveUser({
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      job: this.job,
    });
  }

  public saveUser = (data: object, id: number = 0) => {
    // if (id != 0) {
    //   data.id = id;
    // }

    this.http.post(global.apiLinks.users, data)
      .subscribe((response: any) => {
        console.log(response, "Data saved successfuly");
      });
  }
}
