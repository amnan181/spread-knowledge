import React, { Component } from 'react';
import { connect } from 'react-redux';
import TuitionRequest from '../TuitionRequest';
import TitleAppBar from '../TitleAppBar';
import { HashLoader } from 'react-spinners';
import { getAllTuitions } from '../../../redux/actions/TuitionRequestAction';

class TuitionRequests extends Component {
    state = {
        loader: true,
        tuitions: []
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
        let { tuitions, loader} = this.state;


        return (
            <div>
                <TitleAppBar title='Tution Requests' backLink='/' />
                {
                    loader 
                    ? 
                    <div style={{ marginTop: '35vh', marginLeft: '50vw' }}>
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
                    <h3 style={{color: '#AD9101',marginLeft: '45vw',marginTop: '35vh'}}>No tuition request!</h3> 
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