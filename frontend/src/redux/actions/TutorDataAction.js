import axios from 'axios';
import { EndPoint } from '../../EndPoint/EndPoint';

export const ADD_TUTOR = "ADD_TUTOR";
export const ADD_TUTOR_ERR = "ADD_TUTOR_ERR";
export const EDIT_TUTOR = "EDIT_TUTOR";
export const EDIT_TUTOR_ERR = "EDIT_TUTOR_ERR";
export const GET_TUTOR = "GET_TUTOR";
export const GET_TUTOR_ERR = "GET_TUTOR_ERR";
export const GET_ALL_TUTORS = "GET_ALL_TUTORS";
export const GET_ALL_TUTORS_ERR = "GET_ALL_TUTORS_ERR";
export const DELETE_TUTOR = "DELETE_TUTOR";
export const DELETE_TUTOR_ERR = "DELETE_TUTOR_ERR";
export const UPDATE_TUTOR = "UPDATE_TUTOR";
export const UPDATE_TUTOR_ERR = "UPDATE_TUTOR_ERR";

const getAllTutorsSuc = (data) => {
    return {
        type: GET_ALL_TUTORS,
        data
    }
}

const getAllTutorsFal = () => ({
    type: GET_ALL_TUTORS_ERR
})  

export function getAllTutors() {
    return(dispatch) => {
        axios.get(EndPoint + "/tutor/getAllTutors")
          .then(res => dispatch(getAllTutorsSuc(res.data)))
          .catch(err => dispatch(getAllTutorsFal()))
      };
}

const addTutorSuc = (data) => {
    alert('Tutor created successfully!')
    return {
        type: ADD_TUTOR,
        data: data.user
    }
}

const addTutorFal = () => {
    alert('Error creating tutor. Try again!')
    return {
        type: ADD_TUTOR_ERR
    }
}  

export function addTutor(data) {
    const mydata = new FormData()
    mydata.append("imgURL", data.imgURL);
    mydata.append("tName", data.tName);
    mydata.append("_id", data._id);
    mydata.append("tEmail", data.tEmail);
    mydata.append("tPassword", data.tPassword);
    mydata.append("tGender", data.tGender);
    mydata.append("tAbout", data.tAbout);
    mydata.append("tCity", data.tCity);
    mydata.append("tAddress", data.tAddress);
    mydata.append("tPhone", data.tPhone);
    mydata.append("tDegreeT", data.tDegreeT);
    mydata.append("tDegreeL", data.tDegreeL);
    mydata.append("eDegreeL", data.eDegreeL);
    mydata.append("eDegreeT", data.eDegreeT);
    mydata.append("wttDegreeL", data.wttDegreeL);
    mydata.append("wttDegreeT", data.wttDegreeT);
    mydata.append("subject1", data.subject1);
    mydata.append("subject2", data.subject2);
    mydata.append("subject3", data.subject3);
    mydata.append("fFrom", data.fFrom);
    mydata.append("fTo", data.fTo);
    return(dispatch) => {
        axios.post(EndPoint + "/tutor/addTutor", mydata)
          .then(res => dispatch(addTutorSuc(res.data)))
          .catch(err => dispatch(addTutorFal()))
      };
}

export function getTutor(id) {
    return {
        type: GET_TUTOR,
        data: id
    }
}

const updateTutorSuc = (data) => {
    localStorage.setItem('authUser', JSON.stringify(data.tutor));
    alert('Tutor updated successfully!');
    return {
        type: UPDATE_TUTOR,
        data: data.tutor
    }
}

const updateTutorFal = (err) => {
    alert('Error occoured updating tutor!')
    return{
        type: UPDATE_TUTOR_ERR
    }
}  

export function updateTutor(data) {
    return(dispatch) => {
        axios.post(EndPoint + "/tutor/updateTutor", data.tutor, {headers: {'authorization': data.token}})
          .then(res => dispatch(updateTutorSuc(res.data)))
          .catch(err => dispatch(updateTutorFal(err)))
      };
}

export function deleteTutor(id) {
    return {
        type: DELETE_TUTOR,
        data: id
    }
}