import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { UserService } from 'app/main/user.service';

@Component({
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.scss'
    ],
    providers: [
        LoginService
    ]
})

export class LoginComponent {
    login: any = {};
    error = '';

    constructor(
        private loginService: LoginService,
        private userService: UserService,
        private router: Router
    ) {
      if (this.loginService.isLoggedIn()) {
        this.router.navigate(['/kids']);
      }
    }

    onLoginSubmit() {
        this.loginService.login(this.login).then(response => {
            this.router.navigate(['/kids']);
        }).catch(response => {
            response = response.json();
            this.error = response.message;
        });
    }
}
