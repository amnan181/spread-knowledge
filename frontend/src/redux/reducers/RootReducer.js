import tutorDataReducer from './TutorDataReducer';
import tuitionRequestReducer from './TuitionRequestReducer';
import messageReducer from './MessageReducer';
import studentDataReducer from './StudentDataReducer';
import authReducer from './authReducer';
import tuitionProposalReducer from './TuitionProposalReducer';

import thunk from 'redux-thunk';

import { combineReducers, applyMiddleware } from 'redux';

export default combineReducers({
    tutorDataReducer,
    studentDataReducer,
    tuitionRequestReducer,
    tuitionProposalReducer,
    messageReducer,
    authReducer
}, applyMiddleware(thunk));