const SET_LOGIN = 'login/SET_LOGIN';
const SET_ACCESS_TOKEN = 'login/SET_ACCESS_TOKEN';
const SET_REFRESH_TOKEN = 'login/SET_REFRESH_TOKEN';

export const setLogin = (isLogin) => ({ type:SET_LOGIN, isLogin });
export const setAccessToken = (access) => ({ type:SET_ACCESS_TOKEN, access });
export const setRefreshToken = (refresh) => ({ type:SET_REFRESH_TOKEN, refresh });

const initialState = {
    isLogin: false,
    accessToken: "",
    refreshToken: ""
}

export default function login(state=initialState, action){
    switch(action.type){
        case SET_LOGIN:
            return{
                ...state, isLogin: action.isLogin
            };
        case SET_ACCESS_TOKEN:
            return{
                ...state, accessToken: action.access
            };
        case SET_REFRESH_TOKEN:
            return{
                ...state, refreshToken: action.refresh
            };
        default:
            return state;
    }
}