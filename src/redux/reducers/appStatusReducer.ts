type enableAppLoaderType = ReturnType<typeof enableAppLoaderAC>
type disableAppLoaderType = ReturnType<typeof disableAppLoaderAC>
type setAppErrorType = ReturnType<typeof setAppErrorAC>
type disableAppErrorType = ReturnType<typeof disableAppErrorAC>
type setLoggedStatusType = ReturnType<typeof setLoggedStatusAC>
type finishInitializeApp = ReturnType<typeof finishInitializeAppAC>

export type appStatusActionsType =
    enableAppLoaderType
    | disableAppErrorType
    | disableAppLoaderType
    | finishInitializeApp
    | setAppErrorType
    | setLoggedStatusType;

export type appStatusStateType = {
    isInitialized: boolean,
    isFetching: boolean,
    error: string,
    isUserAuth: boolean,
}

const initialState: appStatusStateType = {
    isInitialized: false,
    isFetching: false,
    error: '',
    isUserAuth: false,
};

export const appStatusReducer = (state: appStatusStateType = initialState, action: appStatusActionsType): appStatusStateType => {
    switch (action.type) {
        case 'ENABLE-LOADER': {
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
        case "SET-LOGGED-STATUS": {
            return {...state, isUserAuth: action.payload.value};
        }
        case "FINISH-INITIALIZE": {
            return {...state, isInitialized: true};
        }
        default: {
            return state;
        }
    }
};


export const finishInitializeAppAC = () => ({type: 'FINISH-INITIALIZE'} as const);
export const enableAppLoaderAC = () => ({type: 'ENABLE-LOADER'} as const);
export const disableAppLoaderAC = () => ({type: 'DISABLE-LOADER'} as const);
export const disableAppErrorAC = () => ({type: 'DISABLE-ERROR'} as const);
export const setAppErrorAC = (message: string) => ({type: 'SET-ERROR', payload: {message}} as const);
export const setLoggedStatusAC = (value:boolean) => ({type: 'SET-LOGGED-STATUS',payload:{value}} as const);