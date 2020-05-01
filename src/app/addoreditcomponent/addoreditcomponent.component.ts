import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { DataService } from "../data.service";
import { HttpClient } from "@angular/common/http";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
declare var moment: any;
import { Store } from "@ngrx/store";
import * as AllActions from "../store/actions/actions";
import * as fromAllReducer from "../store/reducer/reducer";

@Component({
  selector: "app-addoreditcomponent",
  templateUrl: "./addoreditcomponent.component.html",
  styleUrls: ["./addoreditcomponent.component.css"],
})
export class AddoreditcomponentComponent implements OnInit {
  constructor(
    private dailtTaskApi: DataService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}
  AddOrEditTaskForm: FormGroup;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() tasklistdata: any;
  successdiv = false;
  successmsg = "";
  isEditTask = false;
  titletext = "";
  ngOnInit() {
    this.AddOrEditTaskForm = this.fb.group({
      headline: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
    if (this.tasklistdata) {
      this.isEditTask = true;
      this.titletext = "Edit";
      this.AddOrEditTaskForm.controls.headline.patchValue(
        this.tasklistdata.headline
      );
      this.AddOrEditTaskForm.controls.description.patchValue(
        this.tasklistdata.description
      );
    } else {
      this.titletext = "Add";
      this.isEditTask = false;
    }
  }
  onSubmit = () => {
    if (this.AddOrEditTaskForm.valid) {
      const today = new Date();
      if (this.isEditTask) {
        const data = {
          username: localStorage.getItem("username"),
          userID: localStorage.getItem("userID"),
          headline: this.AddOrEditTaskForm.controls.headline.value,
          description: this.AddOrEditTaskForm.controls.description.value,
          date: moment(today).format("LLL"),
          id: this.tasklistdata._id,
        };
        this.store.dispatch(new AllActions.OnEditTask(data));
        this.close.emit();
      } else {
        const data = {
          username: localStorage.getItem("username"),
          userID: localStorage.getItem("userID"),
          headline: this.AddOrEditTaskForm.controls.headline.value,
          description: this.AddOrEditTaskForm.controls.description.value,
          date: moment(today).format("LLL"),
        };
        this.store.dispatch(new AllActions.OnAddTask(data));
        this.closeTaskForm();
      }
    } else {
      for (const x in this.AddOrEditTaskForm.controls) {
        this.AddOrEditTaskForm.controls[x].markAsTouched();
      }
    }
  };
  closeTaskForm = () => {
    this.close.emit();
  };
}
