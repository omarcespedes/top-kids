import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MailService {
    baseUrl: string;

    constructor(
        private http: Http
    ) {
        this.baseUrl = '/api/mail';
     }

    sendEmails(config: Object) {
        return this.http.post(`${this.baseUrl}/bulkSend`, config)
            .toPromise()
            .then(response => response.json());
    }
}
