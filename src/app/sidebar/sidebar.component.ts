import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as global from '../../globals';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public currentUrl = '';
  public views = global.views;
  constructor(private router: Router) { }

  ngOnInit() {
    this.currentUrl = this.router.url;
  }
}
