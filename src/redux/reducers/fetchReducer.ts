type enableLoaderType = ReturnType<typeof enableLoaderAC>
type disableLoaderType = ReturnType<typeof disableLoaderAC>
type setErrorType = ReturnType<typeof setErrorAC>
type disableErrorType = ReturnType<typeof disableErrorAC>

export type fetchActionsType = enableLoaderType | disableErrorType | disableLoaderType | setErrorType;

export type fetchStateType = {
    isFetching: boolean,
    error: string,
}

const initialState: fetchStateType = {
    isFetching: false,
    error: '',
};

export const fetchReducer = (state: fetchStateType = initialState, action: fetchActionsType): fetchStateType => {
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

export const enableLoaderAC = () => ({type: 'ENABLE-LOADER'} as const);
export const disableLoaderAC = () => ({type: 'DISABLE-LOADER'} as const);
export const disableErrorAC = () => ({type: 'DISABLE-ERROR'} as const);
export const setErrorAC = (message: string) => ({type: 'SET-ERROR', payload: {message}} as const);