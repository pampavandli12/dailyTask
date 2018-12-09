import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/* import { reject } from 'q';
import { resolve } from 'path'; */

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private _http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  testService() {
    const promise = new Promise((resolve, reject) => {
      console.log('Service called');
      const apiURL = 'http://localhost:3000/api/users';
      this._http.post(apiURL, this.httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          }
        );
    });
    return promise;
  }
}
