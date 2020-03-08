import { ADD_STUDENT, ADD_STUDENT_ERR, GET_ALL_STUDENTS, GET_ALL_STUDENTS_ERR, GET_STUDENT, DELETE_STUDENT, UPDATE_STUDENT, UPDATE_STUDENT_ERR } from '../actions/StudentDataAction';

var initState = {
    students: [
        // {
        //     _id: '004100d0d0fdf0fd',
        //     name: 'Faiza',
        //     email: 'faiza@gmail.com',
        //     password: 'faiza123',
        //     gender: 'female',
        //     city: 'Toba Tek Singh',
        //     address: 'Perrha, Toba Tek Singh',
        //     sClass: '14',
        //     subject1: 'Artificial Intelligence',
        //     subject2: 'Machine Learning',
        //     subject3: 'Computer Graphics',
        // },
        // {
        //     _id: '00dfdfx71sfdf014',
        //     name: 'Salman Nadeem',
        //     email: 'salman@gmail.com',
        //     password: 'salman123',
        //     gender: 'male',
        //     city: 'Sahiwal',
        //     address: 'Perrha, Toba Tek Singh',
        //     sClass: '12',
        //     subject1: 'Graphic Designing',
        //     subject2: 'Machine Learning',
        //     subject3: 'Computer Graphics',
        // },
        // {
        //     _id: '00dfdfd0d0qpa10',
        //     name: 'Sadia Khanum',
        //     email: 'sadia@gmail.com',
        //     password: 'sadia123',
        //     gender: 'female',
        //     city: 'Nankana Sahib',
        //     address: 'Qila Noor Pur, Nankana Sahib',
        //     sClass: '15',
        //     subject1: 'CS',
        //     subject2: 'Graphic Designing',
        //     subject3: '',
        // },
    ],
    updateStudentStatus: 'not done',
    getAllStudentsStatus: 'not done',
    addStudentStatus: 'not done'
};

export default function studentDataReducer(state = initState, action) {
    switch (action.type) {

        case GET_ALL_STUDENTS:
        {
            return {
                ...state,
                students: action.data,
                getAllStudentsStatus: 'done'
            }

        }

        case GET_ALL_STUDENTS_ERR:
        {
            return {
                ...state,
                getAllStudentsStatus: 'error'
            }

        }

        case ADD_STUDENT:
        {
            let students = state.students;
            students.push(action.data);
            
            return {
                ...state,
                students,
                addStudentStatus: 'done'
            }
        }

        case ADD_STUDENT_ERR:
        {
            return {
                ...state,
                addStudentStatus: 'error'
            }
        }

        case UPDATE_STUDENT:
        {
            let students = state.students.map( student => {
                if(student._id === action.data._id) {
                    return action.data
                } else {
                    return student
                }
            });
            return {
                ...state,
                students,
                updateStudentStatus: 'done'
            }

        }

        case UPDATE_STUDENT_ERR:
        {
            return {
                ...state,
                updateStudentStatus: 'error'
            }

        }    
    
        default:
            return state;
    }
}