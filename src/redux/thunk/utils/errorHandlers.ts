import {Dispatch} from "redux";
import {ResponseType} from '../../../api/api'
import {appStatusActionsType, setAppErrorAC} from "../../reducers/appStatusReducer";

export const defaultErrorMessage: string = 'Something went wrong!';

export const handleAppError = <D>(dispatch: Dispatch<appStatusActionsType>, res: ResponseType<D>) => {
    if (res.messages.length) {
        dispatch(setAppErrorAC(res.messages[0]));
    } else {
        dispatch(setAppErrorAC(defaultErrorMessage));
    }
}

export const handleServerError = (dispatch: Dispatch<appStatusActionsType>, message: string) => {
    dispatch(setAppErrorAC(message ? message : defaultErrorMessage));
    console.error(message);
}