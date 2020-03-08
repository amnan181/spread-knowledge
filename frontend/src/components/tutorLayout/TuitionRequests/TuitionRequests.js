import React, { Component } from 'react';
import { connect } from 'react-redux';
import TuitionRequest from '../../myComponents/TuitionRequest';
import TitleAppBar from '../../myComponents/TitleAppBar';
import { HashLoader } from 'react-spinners';
import { getAllTuitions } from '../../../redux/actions/TuitionRequestAction';

class TuitionRequests extends Component {
    state = {
        loader: true,
        tuitions: []
    }

    componentWillMount() {
        let auth = localStorage.getItem('userType');
        if(auth !== 'tutor') {
            this.props.history.push('/TutorLogin');
        }
    }

    componentDidMount() {
        this.props.getAllTuitions();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.getAllTuitionsStatus === "done") {
            this.setState({
                tuitions: nextProps.tuitions,
                loader: false
            })
        }

        if(nextProps.getAllTuitionsStatus === "error") {
            this.setState({
                loader: false
            })
        }
    }

    render() {
        let { tuitions, loader } = this.state;

        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <TitleAppBar title='Tution Requests' backLink='/TutorDashboard' />
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
                     tuitions.length > 0 ?
                        tuitions.map( tuition => {
                            return (
                                <TuitionRequest tuition={tuition} />
                            );
                        } )
                    : 
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <h3 style={{color: '#AD9101', marginTop: '35vh'}}>No tuition request!</h3>
                    </div> 
                }                
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        tuitions: store.tuitionRequestReducer.tuitions,
        getAllTuitionsStatus: store.tuitionRequestReducer.getAllTuitionsStatus
    }
}

export default connect(mapStateToProps, { getAllTuitions })(TuitionRequests);