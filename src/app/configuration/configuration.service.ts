import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {
  baseUrl: String = '/api/configuration';
  constructor(
    private http: Http
  ) { }

  getConfigurationProperties(): Promise<any> {
    return this.http.get(`${this.baseUrl}/getProperties`)
      .toPromise()
      .then(res => res.json())
      .catch(res => console.error(res));
  }

  updateConfigurationProperties(properties: any): Promise<any> {
    return this.http.post(`${this.baseUrl}/updateProperties`, properties)
      .toPromise()
      .then(res => res.json())
      .catch(res => console.error(res));
  }
}

export class Configuration {
  minNationalSalary: number;
  salaryIncreasePercentage: number;
  previousMinNationalSalary: number;
}
