import { Action } from "@ngrx/store";

export enum ActionTypes {
  SET_TOKEN = "GET_TOKEN",
  SET_TASKLIST = "GET_TASKLIST",
  SET_TASKLIST_SUCCESS = "SET_TASKLIST_SUCCESS",
  SET_TASKLIST_FAIL = "SET_TASKLIST_FAIL",
  SET_SELECTEDTASK = "GET_SELECTEDTASK",
  ON_EDIT_TASK = "ON_EDIT_TASK",
  ON_ADD_TASK = "ON_ADD_TASK",
  ON_ADD_TASK_SUCCESS = "ON_ADD_TASK_SUCCESS",
  ON_ADD_TASK_FAIL = "ON_ADD_TASK_FAIL",
  ON_EDIT_TASK_SUCCESS = "ON_EDIT_TASK_SUCCESS",
  ON_EDIT_TASK_FAIL = "ON_EDIT_TASK_FAIL",
  ON_CREATE_TASK = "ON_CREATE_TASK",
  ON_CREATE_TASK_SUCCESS = "ON_CREATE_TASK_SUCCESS",
  ON_CREATE_TASK_FAIL = "ON_CREATE_TASK_FAIL",
  ON_SIGNUP = "ON_SIGNUP",
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  SIGNUP_FAIL = "SIGNUP_FAIL",
  ON_SIGNIN = "ON_SIGNIN",
  SIGNIN_SUCCESS = "SIGNIN_SUCCESS",
  SIGNIN_FAIL = "SIGNIN_FAIL",
  LOGOUT = "LOGOUT",
  AUTO_CHECK_LOGIN = "AUTO_CHECK_LOGIN",
  RESET_ERROR = "RESET_ERROR",
}

export class SetToken implements Action {
  readonly type = ActionTypes.SET_TOKEN;
  constructor(public payload: string) {}
}
export class SetTaskList implements Action {
  readonly type = ActionTypes.SET_TASKLIST;
}
export class SetSelectedTask implements Action {
  readonly type = ActionTypes.SET_SELECTEDTASK;
  constructor(public payload: any) {}
}
export class SetTaskListSuccess implements Action {
  readonly type = ActionTypes.SET_TASKLIST_SUCCESS;
  constructor(public payload: any) {}
}
export class SetTaskListFail implements Action {
  readonly type = ActionTypes.SET_TASKLIST_FAIL;
  constructor(public payload: any) {}
}
export class OnEditTask implements Action {
  readonly type = ActionTypes.ON_EDIT_TASK;
  constructor(public payload: any) {}
}
export class OnEditTaskSuccess implements Action {
  readonly type = ActionTypes.ON_EDIT_TASK_SUCCESS;
  constructor(public payload: any) {}
}
export class OnEditTaskFail implements Action {
  readonly type = ActionTypes.ON_EDIT_TASK_FAIL;
  constructor(public payload: any) {}
}
export class OnSignup implements Action {
  readonly type = ActionTypes.ON_SIGNUP;
  constructor(public payload: any) {}
}
export class SignupSuccess implements Action {
  readonly type = ActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}
export class SignupFail implements Action {
  readonly type = ActionTypes.SIGNUP_FAIL;
  constructor(public payload: any) {}
}
export class OnSignin implements Action {
  readonly type = ActionTypes.ON_SIGNIN;
  constructor(public payload: any) {}
}
export class SigninSuccess implements Action {
  readonly type = ActionTypes.SIGNIN_SUCCESS;
  constructor(public payload: any) {}
}
export class SigninFail implements Action {
  readonly type = ActionTypes.SIGNIN_FAIL;
  constructor(public payload: any) {}
}
export class Logout implements Action {
  readonly type = ActionTypes.LOGOUT;
}
export class OnAddTask implements Action {
  readonly type = ActionTypes.ON_ADD_TASK;
  constructor(public payload: any) {}
}
export class OnAddTaskSuccess implements Action {
  readonly type = ActionTypes.ON_ADD_TASK_SUCCESS;
  constructor(public payload: any) {}
}
export class OnAddTaskFail implements Action {
  readonly type = ActionTypes.ON_ADD_TASK_FAIL;
  constructor(public payload: any) {}
}
export class AutoCheckLogin implements Action {
  readonly type = ActionTypes.AUTO_CHECK_LOGIN;
}
export class ResetError implements Action {
  readonly type = ActionTypes.RESET_ERROR;
}
export type AllActions =
  | SetTaskList
  | SetToken
  | SetSelectedTask
  | SetTaskListSuccess
  | SetTaskListFail
  | OnEditTask
  | OnEditTaskSuccess
  | OnEditTaskFail
  | OnSignup
  | SignupSuccess
  | SignupFail
  | OnSignin
  | SigninSuccess
  | SigninFail
  | Logout
  | OnAddTask
  | OnAddTaskSuccess
  | OnAddTaskFail
  | AutoCheckLogin
  | ResetError;
