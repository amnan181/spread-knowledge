import { TUTOR_LOGIN, TUTOR_LOGIN_ERR, STUDENT_LOGIN, STUDENT_LOGIN_ERR } from '../actions/auth';

    var initState = {
        user: {},
        token: '',
        tutorLoginStatus: 'not done',
        studentLoginStatus: 'not done'
    }

export default function authReducer(state = initState, action) {
    switch (action.type) {
        case TUTOR_LOGIN:
        {
            return {
                ...state,
                user: action.data.user,
                token: action.data.token,
                tutorLoginStatus: 'done',
                studentLoginStatus: 'not done'
            }

        }

        case TUTOR_LOGIN_ERR:
        {
            return {
                ...state,
                tutorLoginStatus: 'error'
            }

        }

        case STUDENT_LOGIN:
        {
            return {
                ...state,
                user: action.data.user,
                token: action.data.token,
                studentLoginStatus: 'done',
                tutorLoginStatus: 'not done'
            }

        }

        case STUDENT_LOGIN_ERR:
        {
            return {
                ...state,
                studentLoginStatus: 'error'
            }

        }
    
        default:
            return state;
    }
}