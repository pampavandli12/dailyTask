import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private dailtTaskApi: DataService, private http: HttpClient, private fb: FormBuilder, private router: Router) { }
  signupform: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  usernamepattern = '^[A-Za-z0-9]+[\s[a-z0-9]]*$';
  errorDiv = false;
  errmsg = '';
  successdiv = false;
  successmsg = '';
  ngOnInit() {
    if (localStorage.getItem('username')) {
      this.router.navigateByUrl('/tasklist');
    }
    this.signupform = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(this.usernamepattern)]],
      email : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit () {
    if (this.signupform.valid) {
      const data = {
        username: this.signupform.controls.username.value,
        userID: this.signupform.controls.email.value,
        password: this.signupform.controls.password.value
      };
      this.dailtTaskApi.signup(data).then((res) => {
        const response = (res as any);
        if (response.status === 1) {
          this.successdiv = true;
          this.successmsg = response.message;
          setTimeout(() => {
            this.router.navigateByUrl('/signin');
          }, 3000);
        } else {
          this.errorDiv = true;
          this.errmsg = response.message;
          setTimeout(() => {
            this.errorDiv = false;
          }, 3000);
        }
      });
    } else {
      for (const x in this.signupform.controls) {
        this.signupform.controls[x].markAsTouched();
      }
    }
  }
  signinlink () {
    this.router.navigateByUrl('/signin');
  }
}
