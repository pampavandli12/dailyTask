import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { HttpClient } from "@angular/common/http";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import * as AllActions from "../store/actions/actions";
import * as AppStore from "../store/reducer/reducer";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  constructor(
    private dailtTaskApi: DataService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}
  signupform: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  usernamepattern = "^[A-Za-z0-9]+[s[a-z0-9]]*$";
  errorDiv = false;
  errmsg = "";
  successdiv = false;
  successmsg = "";
  ngOnInit() {
    if (localStorage.getItem("username")) {
      this.router.navigateByUrl("/tasklist");
    }
    this.signupform = this.fb.group({
      username: [
        "",
        [Validators.required, Validators.pattern(this.usernamepattern)],
      ],
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
    this.store.pipe(select(AppStore.getTokenState)).subscribe((token) => {
      if (token) {
        // success
        this.router.navigateByUrl("/signin");
      }
    });
    this.store.pipe(select(AppStore.getError)).subscribe((error) => {});
  }
  onSubmit() {
    if (this.signupform.valid) {
      const data = {
        username: this.signupform.controls.username.value,
        userID: this.signupform.controls.email.value,
        password: this.signupform.controls.password.value,
      };
      this.store.dispatch(new AllActions.OnSignup(data));
    } else {
      for (const x in this.signupform.controls) {
        this.signupform.controls[x].markAsTouched();
      }
    }
  }
  signinlink() {
    this.router.navigateByUrl("/signin");
  }
}
