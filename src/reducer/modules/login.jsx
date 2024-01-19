const CHANGE_LOGIN_STATE = 'login/CHANGE_LOGIN_STATE';
const SET_TOKKEN1 = 'login/SET_TOKKEN1';
const SET_TOKKEN2 = 'login/SET_TOKKEN2';
const SET_LONG = 'login/SET_LONG';
const SET_LATI = 'login/SET_LATI';

export const changeLoginState = (isLogin) => ({ type: CHANGE_LOGIN_STATE, isLogin });
export const setTokken1 = (tokken1) => ({ type: SET_TOKKEN1, tokken1});
export const setTokken2 = (tokken2) => ({ type: SET_TOKKEN2, tokken2});
export const setLong = (long) => ({ type: SET_LONG, long});
export const setLati = (lati) => ({ type: SET_LATI, lati});

const initialState = {
    isLogin: false,
    tokken1: "",
    tokken2: "",
    longitude: "",
    latitude: "",
};

export default function login(state = initialState, action){
    switch (action.type){
        case CHANGE_LOGIN_STATE:
            return { ...state, isLogin: action.isLogin };
        case SET_TOKKEN1:
            return { ...state, tokken1: action.tokken1 };
        case SET_TOKKEN2:
            return { ...state, tokken2: action.tokken2 };
        case SET_LONG:
            return { ...state, longitude: action.long };
        case SET_LATI:
            return { ...state, latitude: action.lati };
        default:
            return state;
    }
}