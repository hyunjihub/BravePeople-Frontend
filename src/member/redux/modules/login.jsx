const SET_LOGIN = 'login/SET_LOGIN';
const SET_MEMBER_ID = 'login/SET_MEMBER_ID';
const SET_LOCATION = 'login/SET_LOC';
const SET_PROFILEIMG = 'login/SET_PROFILEIMG'
const SET_ISNEW = 'login/SET_ISNEW';

export const setLogin = (isLogin) => ({ type:SET_LOGIN, isLogin });
export const setMemberId = (id) => ({ type:SET_MEMBER_ID, id });
export const setLocation = (loc) => ({ type:SET_LOCATION, loc });
export const setProfileImg = (profile) => ({ type:SET_PROFILEIMG, profile });
export const setIsNew = (isNew) => ({type:SET_ISNEW, isNew});

const initialState = {
    isLogin: false,
    memberId: null,
    location: {
        longitude: null,
        latitude: null
    },
    profileImg: null,
    isNew: false
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
        case SET_LOCATION:
            return{
                ...state, location: action.loc
            };
        case SET_PROFILEIMG:
            return{
                ...state, profileImg: action.profile
            };
        case SET_ISNEW:
            return{
                ...state, isNew: action.isNew
            };
        default:
            return state;
    }
}