import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as global from '../../globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public currentUrl = '';
  public views = global.views;
  constructor(private router: Router) { }

  ngOnInit() {
    this.currentUrl = this.router.url;
  }
}
