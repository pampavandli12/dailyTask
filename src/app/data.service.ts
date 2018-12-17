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
  signIn(data: any) {
    const promise = new Promise((resolve, reject) => {
      console.log('Service called');
      const apiURL = 'http://localhost:3000/api/signin';
      this._http.post(apiURL, data, this.httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          }
        );
    });
    return promise;
  }
  signup(data: any) {
    console.log(data);
    return new Promise((resolve, reject) => {
      const apiURL = 'http://localhost:3000/api/signup';
      this._http.post(apiURL, data, this.httpOptions)
      .toPromise()
      .then(res => {
        resolve(res);
      });
    });
  }
  addNewTask(data: any) {
    return new Promise((resolve, reject) => {
      const apiURL = 'http://localhost:3000/api/addTask';
      this._http.post(apiURL, data, this.httpOptions)
      .toPromise()
      .then(res => {
        resolve(res);
      });
    });
  }
  getTaskList() {
    return new Promise((resolve, reject) => {
      const apiURL = 'http://localhost:3000/api/getTaskList';
      this._http.post(apiURL, this.httpOptions)
      .toPromise()
      .then(res => {
        resolve(res);
      });
    });
  }
  editTaskList(data: any) {
    return new Promise((resolve, reject) => {
      const apiURL = 'http://localhost:3000/api/editTaskList';
      this._http.post(apiURL, data, this.httpOptions)
      .toPromise()
      .then(res => {
        resolve(res);
      })
    });
  }
}
