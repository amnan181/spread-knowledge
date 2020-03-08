import React, {Component} from "react";
import { MDBContainer, MDBFormInline, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { Link } from 'react-router-dom';
import BACK_ARROW from '../../../assets/icons/left-arrow.svg';
import { connect } from 'react-redux';
import { studentLogin } from '../../../redux/actions/auth';
import { HashLoader } from 'react-spinners';

class Login extends Component {
    state = {
        email: '',
        password: '',
        loader: false
    }

    componentWillMount() {
        let user = localStorage.getItem("authStudent");
        if(user) {
            this.props.history.push("/StudentDashboard");
        }
    }

    onTextChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginHandler = (e) => {
        e.preventDefault();

        let email = this.state.email;
        let password = this.state.password;

        if(email === "" || password === "") {
            alert("No empty field allowed!");
        } else {
            this.props.studentLogin({ email, password });
            this.setState({ loader: true })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.studentLoginStatus === 'done') {
            this.setState({ loader: false })
            this.props.history.push('/StudentDashboard');
        } 

        if(nextProps.studentLoginStatus === 'error') {
            this.setState( { loader: false } );
            alert('Error logging in!');
        }
    }


    render() {
        let { loader } = this.state;

        return (
            <MDBContainer>
            <MDBRow>
                {
                    loader ?
                        <div style={{ marginTop: '35vh', marginLeft: '40vw' }}>
                            <HashLoader
                                color={'#AD9101'}
                                loading='true'
                            />
                        </div>
                    :
                    <MDBCol md="6" className="align-middle" style={{padding: "auto", margin: "auto", marginTop: "5.5vw"}}>
                        <MDBCard>
                            <MDBCardBody>
                            <form onSubmit={(event) => this.loginHandler(event)}>
                                <div className="text-left"> 
                                    <Link to="/"> 
                                        <img src={BACK_ARROW} alt="Back" style={{height: 20, width: 25, marginLeft: 40, cursor: 'pointer'}}/> 
                                    </Link> 
                                </div>
                                <p className="h4 text-center py-4">Login</p>
                                <div className="grey-text" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <div style={{textAlign: 'left'}}>
                                        
                                        <MDBInput
                                            label="Your email"
                                            icon="envelope"
                                            name='email'
                                            group
                                            type="email"
                                            validate
                                            error="wrong"
                                            success="right"
                                            onChange={(event) => this.onTextChange(event)}
                                        />
                                        <MDBInput
                                            label="Your password"
                                            icon="lock"
                                            name='password'
                                            group
                                            type="password"
                                            validate
                                            onChange={(event) => this.onTextChange(event)}
                                        />

                                    </div>
                                </div>
                                <div className="text-center py-4 mt-3">
                                    <MDBBtn color="cyan" type="submit">
                                        Login
                                    </MDBBtn>
                                    <div style={{marginTop: 10, cursor: 'pointer'}}>
                                        <Link to="/StudentSignup">Not member? Signup!</Link>
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

const mapStateToProps = (state) => {
    return {
        studentLoginStatus: state.authReducer.studentLoginStatus
    }
}

export default connect(mapStateToProps, { studentLogin })(Login);