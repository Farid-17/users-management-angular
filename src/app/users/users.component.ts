import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  public getUsers = (page: number = 1) => {
    this.http.get(global.apiLinks.users + '?page=' + page + '&per_page=' + global.defaultSettings.perPage)
      .subscribe((response: any) => {
        this.users = response?.data;
      });
  }

  public pageUser = (page: number) => {
    this.currentPage = page;
    this.getUsers(page);
  }

  public removeUser = (index: number) => {
    let newUsers: any[] = [];

    this.users.forEach((user, key) => {
      if (key != index) {
        newUsers.push(user);
      }
    });

    this.users = newUsers;
  }
}
