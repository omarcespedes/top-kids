import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    constructor() { }

    setUser(user: User) {
        window.localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): User {
        return JSON.parse(window.localStorage.getItem('user'));
    }

    removeUser() {
        window.localStorage.removeItem('user');
    }

    isAdmin(): boolean {
        return this.getUser().type === 'ADMIN';
    }
}

interface User {
    username: string;
    type: string;
}
