import { ADD_TUTOR, ADD_TUTOR_ERR, GET_ALL_TUTORS, GET_ALL_TUTORS_ERR, GET_TUTOR, DELETE_TUTOR, UPDATE_TUTOR, UPDATE_TUTOR_ERR } from '../actions/TutorDataAction';

var initState = {
    tutors: [
        // {
        //     _id: '00dfdfd0d0fdf0fd',
        //     tName: 'Faizan Mustafa',
        //     tEmail: 'faizan@gmail.com',
        //     tPassword: 'faizan123',
        //     imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Chris_Evans_SDCC_2014.jpg/220px-Chris_Evans_SDCC_2014.jpg',
        //     tGender: 'male',
        //     tPhone: '0336-7725522',
        //     tCity: 'Toba Tek Singh',
        //     tAbout: 'Being an Artificial Intelligence expert I am responsible for data extraction, management, manipulation and implementation. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
        //     tAddress: 'Perrha, Toba Tek Singh',
        //     tDegreeL: 'Masters',
        //     tDegreeT: 'Software Engineering',
        //     eDegreeL: 'Intermediate',
        //     eDegreeT: 'F.Sc (Pre Engineering)',
        //     wttDegreeL: 'Bachelors',
        //     wttDegreeT: 'Computer Science',
        //     subject1: 'Artificial Intelligence',
        //     subject2: 'Machine Learning',
        //     subject3: 'Computer Graphics',
        //     fFrom: '7500',
        //     fTo: '10500'
        // },
        // {
        //     _id: '00dfdfd0d0fdf014',
        //     tName: 'Sajawal Nadeem',
        //     tEmail: 'sajawal@gmail.com',
        //     tPassword: 'sajawal123',
        //     imgURL: 'https://www.liveabout.com/thmb/9vQzNaQgTElyqGFtKfJa9JnDjvI=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-102558225-5ba1336dc9e77c0050045c65.jpg',
        //     tGender: 'male',
        //     tAbout: 'Being a graphic designer I am responsible for data extraction, management, manipulation and implementation. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
        //     tPhone: '0336-7725522',
        //     tCity: 'Sahiwal',
        //     tAddress: 'Perrha, Toba Tek Singh',
        //     tDegreeL: 'Masters',
        //     tDegreeT: 'Computer Graphics',
        //     eDegreeL: 'Intermediate',
        //     eDegreeT: 'F.Sc (Pre Engineering)',
        //     wttDegreeL: 'Bachelors',
        //     wttDegreeT: 'Computer Science',
        //     subject1: 'Graphic Designing',
        //     subject2: 'Machine Learning',
        //     subject3: 'Computer Graphics',
        //     fFrom: '2500',
        //     fTo: '5500'
        // },
        // {
        //     _id: '00dfdfd0d0fdf000',
        //     tName: 'Hamza Khurshid',
        //     tEmail: 'hamza@gmail.com',
        //     tPassword: 'hamza123',
        //     imgURL: 'http://www.usmilitariaforum.com/uploads//monthly_05_2019/post-2322-0-18059200-1557703038.jpg',
        //     tGender: 'male',
        //     tPhone: '0336-7725522',
        //     tAbout: 'Being a data scientist I am responsible for data extraction, management, manipulation and implementation. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
        //     tCity: 'Nankana Sahib',
        //     tAddress: 'Qila Noor Pur, Nankana Sahib',
        //     tDegreeL: 'Masters',
        //     tDegreeT: 'Software Engineering',
        //     eDegreeL: 'Intermediate',
        //     eDegreeT: 'F.Sc (Pre Engineering)',
        //     wttDegreeL: 'Bachelors',
        //     wttDegreeT: 'Computer Science',
        //     subject1: 'Artificial Intelligence',
        //     subject2: 'Machine Learning',
        //     subject3: 'Deep Learning',
        //     fFrom: '4500',
        //     fTo: '7500'
        // }
    ],
    addTtutorStatus: 'not done',
    getAllTutorsStatus: 'not done',
    updateTutorStatus: 'not done'
};

export default function tutorDataReducer(state = initState, action) {
    switch (action.type) {

        case GET_ALL_TUTORS:
        {
            return {
                ...state,
                tutors: action.data,
                getAllTutorsStatus: 'done'
            }

        }

        case GET_ALL_TUTORS_ERR:
        {
            return {
                ...state,
                getAllTutorsStatus: 'error'
            }

        }

        case ADD_TUTOR:
        {
            let tutors = state.tutors;
            let tutor = action.data;
            tutors = tutors.concat(tutor);
            
            return {
                ...state,
                tutors: tutors,
                addTtutorStatus: 'done',
                getAllTutorsStatus: 'not done',
                updateTutorStatus: 'not done'
            }

        }

        case ADD_TUTOR_ERR:
        {
            return {
                ...state,
                addTtutorStatus: 'error',
                getAllTutorsStatus: 'not done',
                updateTutorStatus: 'not done'
            }
        }

        case UPDATE_TUTOR:
        {
            let tutors = state.tutors.map( tutor => {
                if(tutor._id === action.data._id) {
                    return action.data
                } else {
                    return tutor
                }
            });
            return {
                ...state,
                tutors,
                updateTutorStatus: 'done'
            }

        }

        case UPDATE_TUTOR_ERR:
        {
            return {
                ...state,
                updateTutorStatus: 'error'
            }

        }    
        
        default:
            return state;
    }
}