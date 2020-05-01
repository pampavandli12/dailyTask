import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Store, select } from "@ngrx/store";
import * as AppStore from "./store/reducer/reducer";

@Injectable({
  providedIn: "root",
})
export class DataService {
  token: null;
  constructor(private _http: HttpClient, private store: Store) {
    this.store.pipe(select(AppStore.getTokenState)).subscribe((token) => {
      this.token = token;
    });
  }
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  signIn(data: any) {
    const apiURL = "http://localhost:3000/api/signin";
    return this._http.post(apiURL, data, this.httpOptions);
  }
  signup(data: any) {
    const apiURL = "http://localhost:3000/api/signup";
    return this._http.post(apiURL, data, this.httpOptions);
  }
  addNewTask(data: any) {
    const apiURL = "http://localhost:3000/api/addTask";
    let httpOptions = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${this.token}`);
    return this._http.post(apiURL, data, { headers: httpOptions });
  }
  getTaskList() {
    const apiURL = "http://localhost:3000/api/getTaskList";
    let httpOptions = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${this.token}`);
    return this._http.get(apiURL, { headers: httpOptions });
  }
  editTaskList(data: any) {
    const apiURL = "http://localhost:3000/api/editTaskList";
    let httpOptions = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${this.token}`);
    return this._http.put(apiURL, data, { headers: httpOptions });
  }
}
