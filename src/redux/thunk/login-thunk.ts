import {authAPI, loginDataType} from "../../api/api";
import {Dispatch} from "redux";
import {
    appStatusActionsType,
    disableAppLoaderAC,
    enableAppLoaderAC,
    finishInitializeAppAC,
    setLoggedStatusAC
} from "../reducers/appStatusReducer";
import {handleAppError, handleServerError} from "./utils/errorHandlers";
import {clearDataAC, clearDataType} from "../reducers/taskReducer";

export const loginTC = (data: loginDataType) => async (dispatch: Dispatch<appStatusActionsType>) => {
    dispatch(enableAppLoaderAC());
    try {
        const response = await authAPI.login(data);
        if (response.data.resultCode) {
            handleAppError(dispatch, response.data);
        } else {
            dispatch(setLoggedStatusAC(true));
        }
    } catch (error: any) {
        handleServerError(dispatch, error.message);
    }
    dispatch(disableAppLoaderAC());
}

export const checkAuthTC = () => async (dispatch: Dispatch<appStatusActionsType>) => {
    try {
        const response = await authAPI.checkAuth();
        if (!response.data.resultCode) {
            dispatch(setLoggedStatusAC(true));
        }
    } catch (error: any) {
        handleServerError(dispatch, error.message);
    }
    dispatch(finishInitializeAppAC());
}

export const logOutTC = () => async (dispatch: Dispatch<appStatusActionsType | clearDataType>) => {
    dispatch(enableAppLoaderAC());
    try {
        const response = await authAPI.logOut();
        if (!response.data.resultCode) {
            dispatch(setLoggedStatusAC(false));
            dispatch(clearDataAC());
        } else {
            handleAppError(dispatch, response.data);
        }
    } catch (error: any) {
        handleServerError(dispatch, error.message);
    }
    dispatch(disableAppLoaderAC());
}