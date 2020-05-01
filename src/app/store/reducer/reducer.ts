import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ActionTypes } from "../actions/actions";

export interface AppState {
  token: any;
  taskList: any;
  selectedTask: any;
  isLogedIn: boolean;
  error: any;
  loading: boolean;
  signinError: any;
  signupError: any;
}
const initialState: AppState = {
  token: null,
  taskList: [],
  selectedTask: null,
  isLogedIn: false,
  error: null,
  loading: false,
  signinError: null,
  signupError: null,
};

//Creating feature selector for user store
const getFeatureuserStore = createFeatureSelector<AppState>("app");

//Creating specific store selector
export const getLoginState = createSelector(
  getFeatureuserStore,
  (state) => state.isLogedIn
);

export const getTaskListState = createSelector(
  getFeatureuserStore,
  (state) => state.taskList
);

export const getSelectedTask = createSelector(
  getFeatureuserStore,
  (state) => state.selectedTask
);

export const getTokenState = createSelector(
  getFeatureuserStore,
  (state) => state.token
);
export const getLoadingState = createSelector(
  getFeatureuserStore,
  (state) => state.loading
);
export const getError = createSelector(
  getFeatureuserStore,
  (state) => state.error
);
export const getSigninError = createSelector(
  getFeatureuserStore,
  (state) => state.signinError
);
export const getsignUpError = createSelector(
  getFeatureuserStore,
  (state) => state.signupError
);

export const Reducer = (state = initialState, action): AppState => {
  switch (action.type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    case ActionTypes.SET_SELECTEDTASK:
      return { ...state, selectedTask: action.payload };
    case ActionTypes.SET_TASKLIST:
      return { ...state, loading: true };
    case ActionTypes.SET_TASKLIST_SUCCESS:
      return { ...state, taskList: action.payload, loading: false };
    case ActionTypes.SET_TASKLIST_FAIL:
      return { ...state, error: action.payload, loading: false };
    case ActionTypes.ON_EDIT_TASK:
      return { ...state, loading: true };
    case ActionTypes.ON_EDIT_TASK_FAIL:
      return { ...state, error: action.payload, loading: false };
    case ActionTypes.ON_EDIT_TASK_SUCCESS:
      return { ...state, loading: false, taskList: action.payload };
    case ActionTypes.ON_SIGNUP:
      return { ...state, loading: true };
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        token: action.payload,
        loading: false,
        signupError: null,
      };
    case ActionTypes.SIGNUP_FAIL:
      return { ...state, loading: false, signupError: action.payload };
    case ActionTypes.ON_SIGNIN:
      return { ...state, loading: true };
    case ActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
        signinError: null,
      };
    case ActionTypes.SIGNIN_FAIL:
      return { ...state, loading: false, signinError: action.payload };
    case ActionTypes.LOGOUT:
      return {
        token: null,
        taskList: [],
        selectedTask: null,
        isLogedIn: false,
        error: null,
        loading: false,
        signinError: null,
        signupError: null,
      };
    case ActionTypes.ON_ADD_TASK:
      return { ...state, loading: true };
    case ActionTypes.ON_ADD_TASK_SUCCESS:
      return { ...state, loading: false, taskList: action.payload };
    case ActionTypes.ON_ADD_TASK_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.RESET_ERROR:
      return { ...state, error: null, signupError: null, signinError: null };
    default:
      return state;
  }
};
