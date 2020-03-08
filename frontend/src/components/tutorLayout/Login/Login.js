import React, {Component} from "react";
import { MDBContainer, MDBFormInline, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { Link } from 'react-router-dom';
import BACK_ARROW from '../../../assets/icons/left-arrow.svg';
import { connect } from 'react-redux';
import { tutorLogin } from '../../../redux/actions/auth';
import { HashLoader } from 'react-spinners';

class Login extends Component {
    state = {
        email: '',
        password: '',
        loader: false
    }

    componentWillMount() {
        let user = localStorage.getItem("authUser");
        if(user) {
            this.props.history.push("/TutorDashboard");
        }
    }

    submitHandler = (event) => {
        event.preventDefault();

        let email = this.state.email;
        let password = this.state.password;

        if(email == "" || password == "") {
            alert("No empty field allowed!");
        } else {
            this.props.tutorLogin({ email, password });
            this.setState({ loader: true })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.tutorLoginStatus === 'done') {
            this.setState({ loader: false })
            this.props.history.push('/TutorDashboard');
        } 

        if(nextProps.tutorLoginStatus === 'error') {
            this.setState( { loader: false } );
            alert('Error logging in!');
        }
    }

    textChangeHandler = (name, event) => {
        this.setState({
            [name]: event.target.value
        })
    }    

    render() {
        let { loader } = this.state;
        return (
            <MDBContainer>
                <MDBRow style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {
                        loader ?
                            <div style={{ marginTop: '35vh' }}>
                                <HashLoader
                                    color={'#AD9101'}
                                    loading='true'
                                />
                            </div>
                            :
                            <MDBCol md="6" className="align-middle" style={{ padding: "auto", margin: "auto", marginTop: "5.5vw" }}>
                                <MDBCard>
                                    <MDBCardBody>
                                        <form>
                                            <div className="text-left">
                                                <Link to="/">
                                                    <img src={BACK_ARROW} alt="Back" style={{ height: 20, width: 25, marginLeft: 40, cursor: 'pointer' }} />
                                                </Link>
                                            </div>
                                            <p className="h4 text-center py-4">Login</p>
                                            <div className="grey-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <div style={{ textAlign: 'left' }}>

                                                    <MDBInput
                                                        label="Your email"
                                                        icon="envelope"
                                                        group
                                                        value={this.state.email}
                                                        onChange={(event) => this.textChangeHandler("email", event)}
                                                        type="email"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <MDBInput
                                                        label="Your password"
                                                        icon="lock"
                                                        group
                                                        value={this.state.password}
                                                        onChange={(event) => this.textChangeHandler("password", event)}
                                                        type="password"
                                                        validate
                                                    />

                                                </div>
                                            </div>
                                            <div className="text-center py-4 mt-3">
                                                <MDBBtn color="cyan" type="submit" onClick={this.submitHandler}>
                                                    Login
                                            </MDBBtn>
                                                <div style={{ marginTop: 10, cursor: 'pointer' }}>
                                                    <Link to="/TutorSignup">Not member? Signup!</Link>
                                                </div>
                                            </div>
                                        </form>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        }
                    </MDBRow>
            </MDBContainer>
        );
    }
};

const mapStateToProps = (store) => {
    return {
        tutors: store.tutorDataReducer.tutors,
        tutorLoginStatus: store.authReducer.tutorLoginStatus
    }
}

export default connect(mapStateToProps, { tutorLogin })(Login);