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
declare var $: any;

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  constructor(
    private dailtTaskApi: DataService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}
  signinform: FormGroup;
  resetPassword: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  errorDiv = false;
  errmsg = "";
  successrstdiv = false;
  successrstmsg = "";
  failrstdiv = false;
  failrstmsg = "";
  loading: boolean = false;
  ngOnInit() {
    this.signinform = this.fb.group({
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
    this.resetPassword = this.fb.group({
      resetEmail: [
        "",
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
    });
    this.store.pipe(select(AppStore.getTokenState)).subscribe((token) => {
      if (token) {
        this.router.navigateByUrl("/tasklist");
      }
    });
    this.store.pipe(select(AppStore.getSigninError)).subscribe((error) => {
      if (error) {
        this.errmsg = error;
        this.errorDiv = true;
        clearTimeout();
        setTimeout(() => {
          this.errorDiv = false;
          this.store.dispatch(new AllActions.ResetError());
        }, 3000);
      }
    });
    this.store.pipe(select(AppStore.getLoadingState)).subscribe((loading) => {
      this.loading = loading;
    });
  }
  onSubmit = () => {
    if (this.signinform.valid) {
      const data = {
        userId: this.signinform.controls.email.value,
        password: this.signinform.controls.password.value,
      };
      this.store.dispatch(new AllActions.OnSignin(data));
    } else {
      for (const x in this.signinform.controls) {
        this.signinform.controls[x].markAsTouched();
      }
    }
  };
  signuplink() {
    this.router.navigateByUrl("/signup");
  }
  forgotpasswordlink() {
    $("#exampleModalCenter").modal("toggle");
  }
  closeModal = () => {
    this.resetPassword.reset();
    $("#exampleModalCenter").modal("toggle");
  };
  onReset = () => {
    if (this.resetPassword.valid) {
      alert("submitted");
    } else {
      for (const x in this.resetPassword.controls) {
        this.resetPassword.controls[x].markAsTouched();
      }
    }
  };
}
