import { DateAdapter } from '@angular/material';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { SideNavigationService } from './app.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'top-kids',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    SideNavigationService,
    LoginService
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  navSections: Object[];
  showSideNav: Boolean = false;
  @ViewChild('sidenav') sidenav: ElementRef;

  constructor(
    private sideNavService: SideNavigationService,
    private loginService: LoginService,
    private router: Router,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('es');
    this.navSections = this.sideNavService.getSideMenuSections();
    this.router.events.subscribe(event => {
      if (event.constructor.name === 'NavigationCancel') {
        this.router.navigate(['/']);
        this.showSideNav = false;
      } else {
        this.showSideNav = event['url'] !== '/';
      }
    });
  }

  onSectionSelected(section) {
    if (section.name === 'Logout') {
      this.loginService.logout().then(response => {
        this.router.navigate(['/']);
      });
    } else if (section.url) {
      this.router.navigate([section.url]);
    }
  }
}
