import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import * as AppActions from "../actions/actions";
import { DataService } from "src/app/data.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AppEffect {
  constructor(
    private actions$: Actions,
    private appService: DataService,
    private router: Router
  ) {}

  getTaskList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.ActionTypes.SET_TASKLIST),
      mergeMap(() =>
        this.appService.getTaskList().pipe(
          map((response) => new AppActions.SetTaskListSuccess(response.data)),
          catchError((error) =>
            of(new AppActions.SetTaskListFail(error.error.message))
          )
        )
      )
    )
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.ActionTypes.ON_EDIT_TASK),
      mergeMap((action) =>
        this.appService.editTaskList(action.payload).pipe(
          map((res) => new AppActions.OnEditTaskSuccess(res.data)),
          catchError((error) =>
            of(new AppActions.OnEditTaskFail(error.error.message))
          )
        )
      )
    )
  );

  onSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.ActionTypes.ON_SIGNIN),
      mergeMap((action) =>
        this.appService.signIn(action.payload).pipe(
          map((response) => {
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("userID", response.data.userID);
            localStorage.setItem("token", response.token);
            return new AppActions.SigninSuccess(response.token);
          }),
          catchError((error) =>
            of(new AppActions.SigninFail(error.error.message))
          )
        )
      )
    )
  );

  onSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.ActionTypes.ON_SIGNUP),
      mergeMap((action) =>
        this.appService.signup(action.payload).pipe(
          map((response) => {
            localStorage.setItem("username", response.username);
            localStorage.setItem("userID", response.userID);
            return new AppActions.SignupSuccess("yegfjhsgfkyudg");
          }),
          catchError((error) =>
            of(new AppActions.SignupFail(error.error.message))
          )
        )
      )
    )
  );

  addNewTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.ActionTypes.ON_ADD_TASK),
      mergeMap((action) =>
        this.appService.addNewTask(action.payload).pipe(
          map((response) => new AppActions.OnAddTaskSuccess(response.data)),
          catchError((error) =>
            of(new AppActions.OnAddTaskFail(error.error.message))
          )
        )
      )
    );
  });
}
