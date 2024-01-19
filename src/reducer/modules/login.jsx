const CHANGE_LOGIN_STATE = 'login/CHANGE_LOGIN_STATE';
const SET_ACCESS_TOKEN = 'login/SET_ACCESS_TOKEN';
const SET_REFRESH_TOKEN = 'login/SET_REFRESH_TOKEN';
const SET_LONG = 'login/SET_LONG';
const SET_LATI = 'login/SET_LATI';

export const changeLoginState = (isLogin) => ({ type: CHANGE_LOGIN_STATE, isLogin });
export const setAccessToken = (accessToken) => ({ type: SET_ACCESS_TOKEN, accessToken});
export const setRefreshToken = (refreshToken) => ({ type: SET_REFRESH_TOKEN, refreshToken});
export const setLong = (long) => ({ type: SET_LONG, long});
export const setLati = (lati) => ({ type: SET_LATI, lati});

const initialState = {
    isLogin: false,
    accessToken: "",
    refreshToken: "",
    longitude: "",
    latitude: "",
};

export default function login(state = initialState, action){
    switch (action.type){
        case CHANGE_LOGIN_STATE:
            return { ...state, isLogin: action.isLogin };
        case SET_ACCESS_TOKEN:
            return { ...state, accessToken: action.accessToken };
        case SET_REFRESH_TOKEN:
            return { ...state, refreshToken: action.refreshToken };
        case SET_LONG:
            return { ...state, longitude: action.long };
        case SET_LATI:
            return { ...state, latitude: action.lati };
        default:
            return state;
    }
}