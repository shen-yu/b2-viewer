import {
    SET_LOGIN,
    SET_UPLOAD,
    SET_FRESH
} from './actions';

const reducer = (state = { upload: {} }, action: any) => {
    switch (action.type) {
        case SET_LOGIN:
            return { ...state, ...action.params };
        case SET_UPLOAD:
            return { ...state, ...{ upload: action.params } };
        case SET_FRESH:
            return { ...state };
        default:
            return state;
    }
};

export default reducer;
