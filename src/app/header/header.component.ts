import { Component } from '@angular/core';
import * as global from '../../globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public langs = global.langs;
  public currentLang = global.searchLang(global.defaultSettings.lang);

  /**
   * changeLang
   * @param lang string
   */
  public changeLang(lang: string) {
    this.currentLang = global.searchLang(lang);
  }
}
