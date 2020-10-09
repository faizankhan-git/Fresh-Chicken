import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/folder',
      icon: 'home'
    },
    {
      title: 'My Account',
      url: '/location',
      icon: 'person'
      
    },
    {
      title: 'My Orders',
      url: '/orders',
      icon: 'speedometer'
    },
    {
      title: 'Wallet',
      url: '/wallet',
      icon: 'wallet'
    },
    {
      title: 'Notification',
      url: '/notifications',
      icon: 'notifications'
    },
    {
      title: 'Contact Us',
      url: '/contact-us',
      icon: 'people'
    }
  ];
  public labels = ["Refer a Friend", "Term and conditions", "FAQ's", "Privacy Policy", "version","Logout"];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ngOnInit() {
    const path = window.location.pathname.split('/')[1];
    console.log(path);
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
