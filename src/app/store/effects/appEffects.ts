import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import * as AppActions from "../actions/actions";
import { DataService } from "src/app/data.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, catchError, tap } from "rxjs/operators";
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
          map((res: any) => new AppActions.SetTaskListSuccess(res.data)),
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
      mergeMap((action: AppActions.OnEditTask) =>
        this.appService.editTaskList(action.payload).pipe(
          map((res: any) => new AppActions.OnEditTaskSuccess(res.data)),
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
      mergeMap((action: AppActions.OnSignin) =>
        this.appService.signIn(action.payload).pipe(
          map((res: any) => {
            localStorage.setItem("username", res.data.username as any);
            localStorage.setItem("userID", res.data.userID);
            localStorage.setItem("token", res.token);
            return new AppActions.SigninSuccess(res.token);
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
      mergeMap((action: AppActions.OnSignup) =>
        this.appService.signup(action.payload).pipe(
          map((res: any) => {
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("userID", res.data.userID);
            return new AppActions.SignupSuccess(res.token);
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
      mergeMap((action: AppActions.OnAddTask) =>
        this.appService.addNewTask(action.payload).pipe(
          map((res: any) => {
            return new AppActions.OnAddTaskSuccess(res.data);
          }),
          catchError((error) =>
            of(new AppActions.OnAddTaskFail(error.error.message))
          )
        )
      )
    );
  });
}
