type enableAppLoaderType = ReturnType<typeof enableAppLoaderAC>
type disableAppLoaderType = ReturnType<typeof disableAppLoaderAC>
type setAppErrorType = ReturnType<typeof setAppErrorAC>
type disableAppErrorType = ReturnType<typeof disableAppErrorAC>

export type appStatusActionsType = enableAppLoaderType | disableAppErrorType | disableAppLoaderType | setAppErrorType;

export type appStatusStateType = {
    isFetching: boolean,
    error: string,
}

const initialState: appStatusStateType = {
    isFetching: false,
    error: '',
};

export const appStatusReducer = (state: appStatusStateType = initialState, action: appStatusActionsType): appStatusStateType => {
    switch (action.type) {
        case 'ENABLE-LOADER': {
            console.log('enable')
            return {...state, isFetching: true};
        }
        case 'DISABLE-LOADER': {
            return {...state, isFetching: false};
        }
        case 'SET-ERROR': {
            return {...state, error: action.payload.message};
        }
        case 'DISABLE-ERROR': {
            return {...state, error: ''};
        }
        default: {
            return state;
        }
    }
};

export const enableAppLoaderAC = () => ({type: 'ENABLE-LOADER'} as const);
export const disableAppLoaderAC = () => ({type: 'DISABLE-LOADER'} as const);
export const disableAppErrorAC = () => ({type: 'DISABLE-ERROR'} as const);
export const setAppErrorAC = (message: string) => ({type: 'SET-ERROR', payload: {message}} as const);