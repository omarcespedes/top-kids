import { Http } from '@angular/http';
import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class BaseService {
    protected http: Http;
    protected baseUrl: string;
    protected snackBar: MatSnackBar;

    constructor(
        injector: Injector
    ) {
        this.http = injector.get(Http);
        this.snackBar = injector.get(MatSnackBar);
    }

    getAll() {
        return this.http.get(this.baseUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError(this));
    }

    getOne(id) {
        return this.http.get(`${this.baseUrl}/get/${id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError(this));
    }

    create(baseData): Promise<any> {
        return this.http.post(this.baseUrl, baseData)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError(this));
    }

    update(baseData) {
        return this.http.put(this.baseUrl, baseData)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError(this));
    }

    delete(entityId: number) {
        return this.http.delete(`${this.baseUrl}/${entityId}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError(this));
    }

    protected handleError(scope: any) {
        return (error: any): Promise<any> => {
            scope.snackBar.open(`Ocurrio un error. Revise la informacion introducida,
            si el problema persiste contacte al administrador.`, 'OK', {
                duration: 10000,
                extraClasses: 'error-snack'
            });
            return Promise.reject(error.message || error);
        }
    }
}
