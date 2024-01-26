import { combineReducers } from 'redux';
import login from '../../../member/redux/modules/login';

const rootReducer = combineReducers({
    login
});

export default rootReducer;