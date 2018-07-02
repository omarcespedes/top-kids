import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { UserService } from 'app/main/user.service';

@Injectable()
export class LoginService {
    constructor(
        private http: Http,
        private userService: UserService
    ) {}

    login(payload: {username: string, password: string}) {
        return this.http.post('/login', payload)
            .toPromise()
            .then(response => {
                response = response.json();
                window.localStorage.setItem('token', response['token']);
                this.userService.setUser(response['user']);
                return response;
            });
    }

    logout() {
        return this.http.post('/logout', {})
            .toPromise()
            .then(response => {
                this.userService.removeUser();
                window.localStorage.removeItem('token');
                return response.json();
            });
    }

    isLoggedIn() {
        return !!window.localStorage.getItem('token');
    }
}
