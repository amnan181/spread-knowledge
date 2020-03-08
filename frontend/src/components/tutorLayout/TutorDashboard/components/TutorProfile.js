import React, { Component } from "react";
import { MDBCard, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBBtn, MDBCardImage, MDBCardText, MDBCardBody } from "mdbreact";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import SearchAppBar from './AppBar';
import { Link } from 'react-router-dom';
import {  connect } from 'react-redux';
import TuitionRequest from "../../../myComponents/TuitionRequest";
import { HashLoader } from 'react-spinners';
import { EndPoint } from '../../../../EndPoint/EndPoint';
import { getAllTuitions } from '../../../../redux/actions/TuitionRequestAction';

class CardExample extends Component {
    state = {
        searchQuery: '',
        tutor: {},
        loader: true,
        tuitions: [],
        tLoader: true
    }

    componentWillMount() {
        let auth = localStorage.getItem('userType');
        if(auth === 'tutor') {
            let tutor = localStorage.getItem("authUser");
            tutor = JSON.parse(tutor);
            this.setState({ tutor, loader: false })
        }
    }

    componentDidMount() {
        this.props.getAllTuitions();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.getAllTuitionsStatus === "done") {
            this.setState({
                tLoader: false,
                tuitions: nextProps.tuitions
            })
        }

        if(nextProps.getAllTuitionsStatus === "error") {
            this.setState({
                tLoader: false,
            })
        }
    }

    searchTextChangeHandler = (e) => {
        this.setState({
            searchQuery: e.target.value
        })
    }

    searchingForTuition = searchQuery => {
      return function(tuition) {
        return (
            tuition.trCity.toLowerCase().includes(searchQuery.toLowerCase()) || 
            tuition.trDegreeT.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tuition.trDegreeL.toLowerCase().includes(searchQuery.toLowerCase()) || 
            tuition.trSubject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            !searchQuery
        );
      };
    };

    render() {
        let { tutor, loader, tuitions, tLoader } = this.state;

        return (
            <MDBContainer>
                { loader ?
                    <MDBRow>
                        <div style={{ marginTop: '35vh' }}>
                            <HashLoader
                                color={'#AD9101'}
                                loading='true'
                            />
                        </div>
                    </MDBRow>
                : 
                <div>   
                    <MDBRow>
                        <MDBCol md="4" style={{ padding: 10, margin: 'auto' }}>
                            <MDBCard>
                                    <img src={tutor.imgURL.includes('imgURL') ? EndPoint+ "/" +tutor.imgURL : tutor.imgURL} style={{ height: 200, width: 200, marginLeft: 'auto', marginRight: 'auto', borderRadius: 100, objectFit: 'cover' }} />
                                <MDBCardBody>
                                    <MDBCardTitle tag="h5">{tutor.tName}</MDBCardTitle>
                                    <MDBCardText style={{ textAlign: 'justify' }}>
                                        {tutor.tAbout}
                                    </MDBCardText>
                                    <Link to={{ pathname: `/EditTutorProfile/${tutor._id}`, 
                                            query: {
                                                tutor
                                            }}} >
                                        <MDBBtn color="primary" size="md">
                                            Edit Profile
                                        </MDBBtn>
                                    </Link>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        
                        <MDBCol md="8" style={{ padding: 10 }}>
                            <div className="card">
                                <div className="card-header" style={{ backgroundColor: 'rgba(24, 59, 78, 0.7)', color: 'white' }}>
                                    Profile Information
                                </div>

                                <div className="card-body" style={{ marginTop: 23 }}>
                                    <div style={{width: "100%", overflowX: "auto"}}>
                                        <Table style={{width: "100%"}}>
                                            <TableBody>
                                                <TableRow key={1}>
                                                    <TableCell align="left">
                                                        <b>Qualification</b>
                                                    </TableCell>
                                                    <TableCell align="left">{tutor.tDegreeL + " of " + tutor.tDegreeT}</TableCell>
                                                </TableRow>
                                                <TableRow key={2}>
                                                    <TableCell align="left">
                                                        <b>Subjects</b>
                                                    </TableCell>
                                                    <TableCell align="left">{tutor.subject1 +", "+ tutor.subject2+ ", "+ tutor.subject3}</TableCell>
                                                </TableRow>
                                                <TableRow key={2}>
                                                    <TableCell>
                                                        <b>Degree to Taught</b>
                                                    </TableCell>
                                                    <TableCell align="left">{tutor.wttDegreeL + " of " + tutor.wttDegreeT}</TableCell>
                                                </TableRow>
                                                <TableRow key={3}>
                                                    <TableCell>
                                                        <b>Experience</b>
                                                    </TableCell>
                                                    <TableCell align="left">{tutor.eDegreeL + " of " + tutor.eDegreeT}</TableCell>
                                                </TableRow>
                                                <TableRow key={4}>
                                                    <TableCell>
                                                        <b>Contact</b>
                                                    </TableCell>
                                                    <TableCell align="left">{tutor.tPhone + ", " + tutor.tEmail}</TableCell>
                                                </TableRow>
                                                <TableRow key={5}>
                                                    <TableCell>
                                                        <b>Fee Range</b>
                                                    </TableCell>
                                                    <TableCell align="left">Rs. {tutor.fFrom + " - " + tutor.fTo}</TableCell>
                                                </TableRow>
                                                <TableRow key={6}>
                                                    <TableCell>
                                                        <b>Gender</b>
                                                    </TableCell>
                                                    <TableCell align="left">{ tutor.tGender == "male" ? "Male" : "Female"}</TableCell>
                                                </TableRow>
                                                <TableRow key={7}>
                                                    <TableCell>
                                                        <b>Address</b>
                                                    </TableCell>
                                                    <TableCell align="left">{tutor.tAddress}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol md="12">
                            <SearchAppBar searchQuery={this.state.searchQuery} searchTextChangeHandler={this.searchTextChangeHandler} />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol md="12">
                            {
                                tLoader ?
                                    <div style={{ marginTop: '5vh', marginLeft: '40vw' }}>
                                        <HashLoader
                                            color={'#AD9101'}
                                            loading='true'
                                        />
                                    </div>
                                :
                                tuitions.filter(this.searchingForTuition(this.state.searchQuery)).length > 0 ?
                                tuitions.filter(this.searchingForTuition(this.state.searchQuery)).map(tuition => {
                                    return (
                                        <TuitionRequest tuition={tuition} />
                                    );
                                })
                                : "No tuition request!"}
                        </MDBCol>
                    </MDBRow>
                </div>
                }
            </MDBContainer>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        tuitions: store.tuitionRequestReducer.tuitions,
        getAllTuitionsStatus: store.tuitionRequestReducer.getAllTuitionsStatus
    }
}

export default connect(mapStateToProps, { getAllTuitions })(CardExample);