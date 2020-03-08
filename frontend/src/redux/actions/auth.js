import axios from 'axios';
import { EndPoint } from '../../EndPoint/EndPoint';

export const TUTOR_LOGIN = "TUTOR_LOGIN";
export const TUTOR_LOGIN_ERR = "TUTOR_LOGIN_ERR";
export const STUDENT_LOGIN = "STUDENT_LOGIN";
export const STUDENT_LOGIN_ERR = "STUDENT_LOGIN_ERR";

const tutorLoginSuc = (data) => {
    console.log("USER LOGIN", data)
    
    localStorage.setItem('authUser', JSON.stringify(data.user));
    localStorage.setItem('auth', JSON.stringify(data.token));
    localStorage.setItem('userType', 'tutor');
    
    return {
        type: TUTOR_LOGIN,
        data
    }
}

const tutorLoginFal = (err) => {
    console.log("ERROR Login", err)
    return {
        type: TUTOR_LOGIN_ERR
    }
}

export function tutorLogin(data) {
    return(dispatch) => {
        axios.post(EndPoint + "/tutors/login", data)
          .then(res => dispatch(tutorLoginSuc(res.data)))
          .catch(err => dispatch(tutorLoginFal()))
      };
}

const studentLoginSuc = (data) => {
    
    localStorage.setItem('authStudent', JSON.stringify(data.user));
    localStorage.setItem('auth', JSON.stringify(data.token));
    localStorage.setItem('userType', 'student');

    return {
        type: STUDENT_LOGIN,
        data
    }
}

const studentLoginFal = () => ({
    type: STUDENT_LOGIN_ERR
})  

export function studentLogin(data) {
    return(dispatch) => {
        axios.post(EndPoint + "/students/login", data)
          .then(res => dispatch(studentLoginSuc(res.data)))
          .catch(err => dispatch(studentLoginFal(err)))
      };
}