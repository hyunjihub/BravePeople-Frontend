const SET_LOGIN = 'login/SET_LOGIN';
const SET_ACCESS_TOKEN = 'login/SET_ACCESS_TOKEN';
const SET_REFRESH_TOKEN = 'login/SET_REFRESH_TOKEN';
const SET_MEMBER_ID = 'login/SET_MEMBER_ID';
const SET_PARAM_ID = 'login/SET_PARAM_ID';

export const setLogin = (isLogin) => ({ type:SET_LOGIN, isLogin });
export const setAccessToken = (access) => ({ type:SET_ACCESS_TOKEN, access });
export const setRefreshToken = (refresh) => ({ type:SET_REFRESH_TOKEN, refresh });
export const setMemberId = (id) => ({ type:SET_MEMBER_ID, id });
export const setParamId = (paramid) => ({ type:SET_PARAM_ID, paramid });

const initialState = {
    isLogin: false,
    accessToken: "",
    refreshToken: "",
    memberId: "",
    paramId: ""
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
        case SET_MEMBER_ID:
            return{
                ...state, memberId: action.id
            };
        case SET_PARAM_ID:
            return{
                ...state, paramId: action.paramid
            };
        default:
            return state;
    }
}