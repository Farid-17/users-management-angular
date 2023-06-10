import { Component } from '@angular/core';
import * as global from '../../globals';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  public globalVariable = global;
}
