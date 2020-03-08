import { ADD_TUITION_REQ, ADD_TUITION_REQ_ERR, EDIT_TUITION_REQ, GET_ALL_TUITIONS, GET_ALL_TUITIONS_ERR, GET_TUITION_REQ, DELETE_TUITION_REQ, getAllTuitions } from '../actions/TuitionRequestAction';

var initState = {
    tuitions: [
        // {
        //     _id: '7d1sd5sd1sd2d4s2',
        //     trSenderId: '00dfdfx71sfdf014',
        //     trCity: 'Toba Tek Singh',
        //     trAddress: 'Perrha, Toba Tek Singh',
        //     trClass: '15',
        //     trDegreeL: 'Masters',
        //     trDegreeT: 'Software Engineering',
        //     trSubject: 'Artificial Intelligence',
        //     trPostedAt: '15-May-2019',
        //     timeFrom: '10:00 AM',
        //     timeTo: '11:00 AM'
        // },
        // {
        //     _id: '1sddssd23sdd56ds45',
        //     trSenderId: '004100d0d0fdf0fd',
        //     trCity: 'Sahiwal',
        //     trClass: '12',
        //     trAddress: 'Perrha, Toba Tek Singh',
        //     trDegreeL: 'Intermediate',
        //     trDegreeT: 'F.Sc (Pre Engg.)',
        //     trSubject: 'Mathematics',
        //     trPostedAt: '17-August-2018',
        //     timeFrom: '02:30 PM',
        //     timeTo: '05:00 PM'
        // },
        // {
        //     _id: '4ds4sddscsddsc11ew',
        //     trSenderId: '00dfdfd0d0qpa10',
        //     trCity: 'Lahore',
        //     trClass: '13',
        //     trAddress: 'Perrha, Toba Tek Singh',
        //     trDegreeL: 'Bachelors',
        //     trDegreeT: 'Computer Science',
        //     trSubject: 'Computer Network',
        //     trPostedAt: '10-June-2019',
        //     timeFrom: '04:00 PM',
        //     timeTo: '05:30 PM'
        // }
    ],
    getAllTuitionsStatus: 'not done',
    addTuitionStatus: 'not done'
};

export default function tuitionRequestReducer(state = initState, action) {
    switch (action.type) {
        case GET_ALL_TUITIONS:
        {
            let tuitions = action.data;
            return {
                ...state,
                tuitions,
                getAllTuitionsStatus: 'done',
                addTuitionStatus: 'not done'
            }
        }

        case GET_ALL_TUITIONS_ERR:
        {
            return {
                ...state,
                getAllTuitionsStatus: 'error',
                addTuitionStatus: 'not done'
            }
        }

        case ADD_TUITION_REQ:
        {
            let tuitions = state.tuitions;
            tuitions.push(action.data);
            
            return {
                ...state,
                tuitions,
                addTuitionStatus: 'done',
                getAllTuitionsStatus: 'not done',
            }

        }

        case ADD_TUITION_REQ_ERR:
        {
            return {
                ...state,
                addTuitionStatus: 'error',
                getAllTuitionsStatus: 'not done',
            }
        }

        case EDIT_TUITION_REQ:
        {
            let tuitions = state.tuitions;
            return {
                ...state,
                tuitions: tuitions.push(action.data)
            }

        }   
    
        default:
            return state;
    }
}