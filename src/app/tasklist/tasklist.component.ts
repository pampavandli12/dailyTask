import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";
import { Store, select } from "@ngrx/store";
import * as AppStore from "../store/reducer/reducer";
declare var moment: any;
import * as AllActions from "../store/actions/actions";

@Component({
  selector: "app-tasklist",
  templateUrl: "./tasklist.component.html",
  styleUrls: ["./tasklist.component.css"],
})
export class TasklistComponent implements OnInit {
  constructor(
    private router: Router,
    private dailtTaskApi: DataService,
    private store: Store
  ) {}
  IsTaskList = true;
  taskList: any;
  tasklistdata: any;
  ngOnInit() {
    this.store.pipe(select(AppStore.getTaskListState)).subscribe((taskList) => {
      this.taskList = taskList;
    });
    this.store.pipe(select(AppStore.getTokenState)).subscribe((token) => {
      if (!token) {
        this.router.navigateByUrl("/signin");
      }
    });
    this.store.dispatch(new AllActions.SetTaskList());
  }
  AddNewTask = () => {
    this.tasklistdata = null;
    this.IsTaskList = false;
  };
  EditTaskList = (data) => {
    this.IsTaskList = false;
    this.tasklistdata = data;
  };
  closeChild = () => {
    this.IsTaskList = true;
  };
  Logout = () => {
    localStorage.clear();
    this.store.dispatch(new AllActions.Logout());
  };
}
