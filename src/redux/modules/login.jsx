const SET_LOGIN = 'login/SET_LOGIN';
const SET_MEMBER_ID = 'login/SET_MEMBER_ID';
const SET_PARAM_ID = 'login/SET_PARAM_ID';
const SET_LOCATION = 'login/SET_LOC';
const SET_PROFILEIMG = 'log/SET_PROFILEIMG'

export const setLogin = (isLogin) => ({ type:SET_LOGIN, isLogin });
export const setMemberId = (id) => ({ type:SET_MEMBER_ID, id });
export const setParamId = (paramid) => ({ type:SET_PARAM_ID, paramid });
export const setLocation = (loc) => ({ type:SET_LOCATION, loc });
export const setProfileImg = (profileImg) => ({ type:SET_PROFILEIMG, profileImg });

const initialState = {
    isLogin: false,
    memberId: null,
    paramId: null,
    location: {
        longitude: null,
        latitude: null
    },
    profileImg: ""
}

export default function login(state=initialState, action){
    switch(action.type){
        case SET_LOGIN:
            return{
                ...state, isLogin: action.isLogin
            };
        case SET_MEMBER_ID:
            return{
                ...state, memberId: action.id
            };
        case SET_PARAM_ID:
            return{
                ...state, paramId: action.paramid
            };
        case SET_LOCATION:
            return{
                ...state, location: action.loc
            };
        case SET_PROFILEIMG:
            return{
                ...state, profileImg: action.profileImg
            };
        default:
            return state;
    }
}