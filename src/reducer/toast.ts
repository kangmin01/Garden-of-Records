import { ReactNode } from "react";
import { AnyAction, Reducer } from "redux";

export const GET_TOAST = "GET_TOAST";
export const SET_TOAST = "SET_TOAST";
export const CLEAR_TOAST = "CLEAR_TOAST";

interface ToastState {
  message: string | null;
  icon: ReactNode | null;
}

const initialState: ToastState = {
  message: null,
  icon: null,
};

export const setToast = (message: string, icon: ReactNode) => ({
  type: SET_TOAST,
  payload: { message, icon },
});

export const clearToast = () => ({
  type: CLEAR_TOAST,
});

const toastReducer: Reducer<ToastState, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_TOAST:
      return {
        ...state,
      };
    case SET_TOAST:
      return {
        ...state,
        message: action.payload.message,
        icon: action.payload.icon,
      };
    case CLEAR_TOAST:
      return {
        ...state,
        message: null,
        icon: null,
      };
    default:
      return state;
  }
};

export default toastReducer;
