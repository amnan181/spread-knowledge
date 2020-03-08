import React, { Component } from 'react';
import { connect } from 'react-redux';
import TitleAppBar from '../../../myComponents/TitleAppBar';
import { HashLoader } from 'react-spinners';
import { getAllProposals } from '../../../../redux/actions/TuitionProposalAction';
import { getAllTuitions } from '../../../../redux/actions/TuitionRequestAction';
import { getAllTutors } from '../../../../redux/actions/TutorDataAction';
import Proposal from '../../../myComponents/Proposal';

class MyProposals extends Component {
    state = {
        loader: true,
        proposals: [],
        tutors: [],
        tuitions: []
    }

    componentWillMount() {
        let auth = localStorage.getItem('userType');
        if(auth !== 'student') {
            this.props.history.push('/StudentLogin');
        }
    }

    componentDidMount() {
        this.props.getAllProposals();
        this.props.getAllTuitions();
        this.props.getAllTutors();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.getAllTutorsStatus === "done") {
            this.setState({
                tutors: nextProps.tutors
            })
        }

        if(nextProps.getAllTutorsStatus === "error") {
            this.setState({
                loader: false
            })
        }
        
        if(nextProps.getAllTuitionsStatus === "done") {
            this.setState({
                tuitions: nextProps.tuitions
            })
        }

        if(nextProps.getAllTuitionsStatus === "error") {
            this.setState({
                loader: false
            })
        }

        if(nextProps.getAllProposalsStatus === "done") {
            this.setState({
                proposals: nextProps.proposals,
            })
        }

        if(nextProps.getAllProposalsStatus === "error") {
            this.setState({
                loader: false
            })
        }

        if(nextProps.getAllProposalsStatus === "done" && nextProps.getAllTuitionsStatus === "done" && nextProps.getAllTutorsStatus === "done") {
            this.setState({
                loader: false
            })
        }
    }

    render() {
        let { proposals, loader, tuitions, tutors } = this.state;
        let student = {};
        let ps = [];
        student = JSON.parse(localStorage.getItem('authStudent'))
        tuitions = tuitions.filter( t => t.trSenderId ===  student._id);
        tuitions.map( tu => {
            ps = proposals.filter(pr => tu._id === pr.tuitionID)
        })

        return (
            <div style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <TitleAppBar title='Tuition Proposals' backLink='/StudentDashboard' />
                {
                    loader 
                    ? 
                    <div style={{ marginTop: '35vh' }}>
                        <HashLoader
                            color={'#AD9101'}
                            loading='true'
                        />
                    </div>
                    :
                    
                    
                    ps.length > 0 ?
                    ps.map( proposal => {
                        
                        return (
                            <Proposal proposal={proposal} tutors={tutors} tuitions={tuitions} />
                        );
                    } )
                    :
                    <h3 style={{color: '#AD9101', marginTop: '35vh'}}>No proposal yet!</h3>
                }              
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        tutors: store.tutorDataReducer.tutors,
        tuitions: store.tuitionRequestReducer.tuitions,
        proposals: store.tuitionProposalReducer.proposals,
        getAllTutorsStatus: store.tutorDataReducer.getAllTutorsStatus,
        getAllProposalsStatus: store.tuitionProposalReducer.getAllProposalsStatus,
        getAllTuitionsStatus: store.tuitionRequestReducer.getAllTuitionsStatus
    }
}

export default connect(mapStateToProps, { getAllProposals, getAllTuitions, getAllTutors })(MyProposals);