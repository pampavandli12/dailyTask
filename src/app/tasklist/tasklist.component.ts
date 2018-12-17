import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
declare var moment: any;

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  constructor(private router: Router, private dailtTaskApi: DataService) { }
  IsTaskList = true;
  taskList: any;
  tasklistdata: any;
  ngOnInit() {
    if (!localStorage.getItem('username')) {
      this.router.navigateByUrl('/signin');
    }
    this.dailtTaskApi.getTaskList().then((res) => {
      const results = (res as any);
      if (results.status === 1) {
        this.taskList = results.data;
      } else {
        console.log('error occured');
      }
    });
  }
  AddNewTask = () => {
    this.IsTaskList = false;
  }
  EditTaskList = (data) => {
    this.IsTaskList = false;
    this.tasklistdata = data;
  }
  closeChild = () => {
   this.IsTaskList = true;
   this.dailtTaskApi.getTaskList().then((res) => {
    const results = (res as any);
    if (results.status === 1) {
      this.taskList = results.data;
    } else {
      console.log('error occured');
    }
  });
  }
  Logout = () => {
    localStorage.clear();
    this.router.navigateByUrl('/signin');
  }
}
