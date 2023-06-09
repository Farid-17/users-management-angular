import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import * as global from '../../globals';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  public currentPage = 1;
  public columns = ['#', 'Avatar', 'Name', 'Email', 'Actions'];
  public users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  public getUsers = (page: number = 1) => {
    this.http.get(global.apiLinks.users + '?page=' + page + '&per_page=' + global.defaultSettings.perPage)
      .subscribe((response: any) => {
        this.users = response?.data;
        global.data.users = response?.data;
      });
  }

  public pageUser = (page: number) => {
    this.currentPage = page;
    this.getUsers(page);
  }

  public editUser = (id: number) => {
    this.formPath(id);
  }

  public removeUser = (id: number, index?: number) => {
    let newUsers: any[] = [];

    this.users.forEach((user, key) => {
      if (key != index) {
        newUsers.push(user);
      }
    });

    this.users = newUsers;
    this.http.delete(global.apiLinks.users + "/" + id)
        .subscribe((response: any) => {
          global.showAlert("success", "Data deleted successfuly");
        }, (error: HttpErrorResponse) => {
          let errorMessage = "Status code: " + error.status + ". An error occurred: " + error.message
          global.showAlert("error", errorMessage);
        });
  }

  public formPath = (id: any = null) => {
    let path: string = '/users/form';

    if (id != null) {
      path = path + '/' + id;
    }

    this.router.navigate([path]);
  }
}
