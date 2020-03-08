import axios from 'axios';
import { EndPoint } from '../../EndPoint/EndPoint';

export const ADD_STUDENT = "ADD_STUDENT";
export const ADD_STUDENT_ERR = "ADD_STUDENT_ERR";
export const EDIT_STUDENT = "EDIT_STUDENT";
export const EDIT_STUDENT_ERR = "EDIT_STUDENT_ERR";
export const GET_STUDENT = "GET_STUDENT";
export const GET_STUDENT_ERR = "GET_STUDENT_ERR";
export const DELETE_STUDENT = "DELETE_STUDENT";
export const DELETE_STUDENT_ERR = "DELETE_STUDENT_ERR";
export const UPDATE_STUDENT = "UPDATE_STUDENT";
export const UPDATE_STUDENT_ERR = "UPDATE_STUDENT_ERR";
export const GET_ALL_STUDENTS = "GET_ALL_STUDENTS";
export const GET_ALL_STUDENTS_ERR = "GET_ALL_STUDENTS_ERR";

const getAllStudentsSuc = (data) => {
    return {
        type: GET_ALL_STUDENTS,
        data
    }
}

const getAllStudentsFal = () => ({
    type: GET_ALL_STUDENTS_ERR
})  

export function getAllStudents() {
    return(dispatch) => {
        axios.get(EndPoint + "/student/getAllStudents")
          .then(res => dispatch(getAllStudentsSuc(res.data)))
          .catch(err => dispatch(getAllStudentsFal()))
      };
}

const addStudentSuc = (data) => {
    alert('Student created successfully!')
    return {
        type: ADD_STUDENT,
        data: data.user
    }   
}

const addStudentFal = () => {
    alert('Error creating student. Try again!')
    return {
        type: ADD_STUDENT_ERR
    }
}  

export function addStudent(data) {
    return(dispatch) => {
        axios.post(EndPoint + "/student/addStudent", data)
          .then(res => dispatch(addStudentSuc(res.data)))
          .catch(err => dispatch(addStudentFal()))
      };
}

export function getStudent(id) {
    return {
        type: GET_STUDENT,
        data: id
    }
}

const updateStudentSuc = (data) => {
    localStorage.setItem('authStudent', JSON.stringify(data.student));
    alert('Student updated successfully!');
    return {
        type: UPDATE_STUDENT,
        data: data.student
    }
}

const updateStudentFal = (err) => {
    alert('Error occoured updating student!')
    return{
        type: UPDATE_STUDENT_ERR
    }
}  

export function updateStudent(data) {
    return(dispatch) => {
        axios.post(EndPoint + "/student/updateStudent", data.student, {headers: {'authorization': data.token}})
          .then(res => dispatch(updateStudentSuc(res.data)))
          .catch(err => dispatch(updateStudentFal(err)))
      };
}

export function deleteStudent(id) {
    return {
        type: DELETE_STUDENT,
        data: id
    }
}