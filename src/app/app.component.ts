import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'CSS Properties',
      url: '/home',
      icon: 'flask'
    },
    {
      title: 'CSS Selectors',
      url: '/selectors',
      icon: 'file-tray'
    },
    {
      title: 'Colors',
      url: '/colors',
      icon: 'color-palette'
    }
  ];
  themeFlag = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage
  ) {
    this.initializeApp();
    this.storage.get('theme').then(data => {
      this.themeFlag = data;
      this.toggleTheme(this.themeFlag);
    });
  }
  toggleTheme(flag): void {
    this.themeFlag = flag;
    this.storage.set('theme', this.themeFlag);
    document.body.classList.toggle('dark', flag);
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('home/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
