import { SEND_TUITION_PROS, SEND_TUITION_PROS_ERR, GET_ALL_PROPOSALS, GET_ALL_PROPOSALS_ERR } from '../actions/TuitionProposalAction';

var initState = {
    proposals: [
        // {
        //     _id: '4sd2ds24q4w2ssd24es',
        //     tutorID: '00dfdfd0d0fdf000',
        //     tuitionID: '7d1sd5sd1sd2d4s2',
        //     description: 'Effective teaching style and techniques with years of teaching experience makes me a special one.',
        //     fee: '10500'
        // },
        // {
        //     _id: 'qw57s2s1dc0xs5d46s5d4ds',
        //     tutorID: '00dfdfd0d0fdf0fd',
        //     tuitionID: '1sddssd23sdd56ds45',
        //     description: 'Some of my special qualities are narateable in words but most of them are out of explanation.',
        //     fee: '7500'
        // },
        // {
        //     _id: 'sd4242sdsdds6ds889sdsd',
        //     tutorID: '00dfdfd0d0fdf014',
        //     tuitionID: '4ds4sddscsddsc11ew',
        //     description: 'Effiecient time management and good teacher.',
        //     fee: '5500'
        // },
    ],
    sendProposalStatus: 'not done',
    getAllProposalsStatus: 'not done'
};

export default function tuitionProposalReducer(state = initState, action) {
    switch (action.type) {
        case SEND_TUITION_PROS:
        {
            let proposals = state.proposals;
            proposals.push(action.data);
            
            return {
                ...state,
                proposals,
                sendProposalStatus: 'done',
                getAllProposalsStatus: 'not done'
            }
        } 

        case SEND_TUITION_PROS_ERR:
        {
            return {
                ...state,
                sendProposalStatus: 'error',
                getAllProposalsStatus: 'not done'
            }
        } 
        case GET_ALL_PROPOSALS:
        {
            let proposals = action.data;
            
            return {
                ...state,
                proposals,
                getAllProposalsStatus: 'done',
                sendProposalStatus: 'not done'
            }
        } 

        case GET_ALL_PROPOSALS_ERR:
        {
            return {
                ...state,
                getAllProposalsStatus: 'error',
                sendProposalStatus: 'not done'
            }
        }  
    
        default:
            return state;
    }
}