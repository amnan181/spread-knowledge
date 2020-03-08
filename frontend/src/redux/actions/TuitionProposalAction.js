import axios from 'axios';
import { EndPoint } from '../../EndPoint/EndPoint';

export const SEND_TUITION_PROS = "SEND_TUITION_PROS";
export const SEND_TUITION_PROS_ERR = "SEND_TUITION_PROS_ERR";
export const GET_ALL_PROPOSALS = "GET_ALL_PROPOSALS";
export const GET_ALL_PROPOSALS_ERR = "GET_ALL_PROPOSALS_ERR";

const getAllProposalsSuc = (data) => {
    return {
        type: GET_ALL_PROPOSALS,
        data
    }
}

const getAllProposalsFal = () => {
    alert('Error occoured while fetching tuition proposals!');
    return {
        type: GET_ALL_PROPOSALS_ERR
    }
} 

export function getAllProposals() {
    return(dispatch) => {
        axios.get(EndPoint + "/proposal/getAllProposals")
          .then(res => dispatch(getAllProposalsSuc(res.data)))
          .catch(err => dispatch(getAllProposalsFal()))
      };
}

const sendProposalSuc = (data) => {
    alert('Proposal sent successfully!')
    return {
        type: SEND_TUITION_PROS,
        data: data.proposal
    }
}

const sendProposalFal = () => {
    alert('Error sending proposal. Try again!')
    return {
        type: SEND_TUITION_PROS_ERR
    }
}  

export function sendProposal(data) {

    return(dispatch) => {
        axios.post(EndPoint + "/proposal/addProposal", data.proposal, {headers: {'authorization': data.token}})
          .then(res => dispatch(sendProposalSuc(res.data)))
          .catch(err => dispatch(sendProposalFal()))
      };
}