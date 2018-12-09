import { Component } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dailtTaskApi: DataService, private http: HttpClient) {}
  responsedata: any;
  getUser = () => {
    this.dailtTaskApi.testService().then((res) => {
      this.responsedata = res[0].userID;
    });
  }
}
