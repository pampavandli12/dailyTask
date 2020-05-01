import { Component, OnInit } from "@angular/core";
import { DataService } from "./data.service";
import { HttpClient } from "@angular/common/http";
import { Store, select } from "@ngrx/store";
import * as AppStore from "./store/reducer/reducer";
declare var moment: any;
import * as AllActions from "./store/actions/actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    this.store.pipe(select(AppStore.getTokenState)).subscribe((token) => {
      if (!token) {
        if (!localStorage.getItem("token")) {
          this.store.dispatch(new AllActions.Logout());
        } else {
          let token = localStorage.getItem("token");
          this.store.dispatch(new AllActions.SetToken(token));
        }
      }
    });
  }
  constructor(
    private dailtTaskApi: DataService,
    private http: HttpClient,
    private store: Store
  ) {}
}
