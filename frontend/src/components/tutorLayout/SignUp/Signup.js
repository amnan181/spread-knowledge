import React, {Component} from "react";
import { MDBContainer, MDBFormInline, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import BACK_ARROW from '../../../assets/icons/left-arrow.svg';
import { Link } from 'react-router-dom';
import './signUpStyles.css';
import toastr from 'toastr';

class SignUp extends Component {
    state= {
        radio: 1,
        username: 'Ali',
        email: 'ali@gmail.com',
        password: 'ali123',
        imgURL: ''
    }

    componentWillMount() {
        let user = localStorage.getItem("authUser");
        if(user) {
            this.props.history.push("/TutorDashboard");
        }
    }

    onClick = nr => () =>{
        this.setState({
          radio: nr
        });
    }

    onTextChange = (name, event) => {
        this.setState({
            [name]: event.target.value
        })
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        
        let username = this.state.username;
        let email = this.state.email;
        let password = this.state.password;
        
        let gender = "male"; 
        if ( this.state.radio == 1 ) {
            gender = "male";
        } else {
            gender = "female";
        }

        let imgURL = this.state.imgURL;
        
        if (username=="" || email=="" || password=="" || imgURL=="") {
            alert("No empty field allowed!");
        } else {
            let user = {
                username,
                email,
                password,
                gender,
                imgURL
            }
            this.props.history.push({pathname: `/TutorGetStart/${username}`, state: {username, email, password, gender, imgURL}});
        }
    }

    imagePickerHandler = (event) => {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            var str = event.target.result;
        }
        fileReader.readAsText(event.target.files[0]); 
        console.log(event.target.files[0]);
        this.setState({imgURL: event.target.files[0]});
    }

    render() {
        return (
            <MDBContainer>
            <MDBRow>
                <MDBCol md="6" style={{padding: 10, margin: "auto"}}>
                <MDBCard>
                    <MDBCardBody>
                    <form onSubmit={this.onFormSubmit}>
                        <div className="text-left"> 
                            <Link to="/"> 
                                <img src={BACK_ARROW} alt="Back" style={{height: 20, width: 25, marginLeft: 40, cursor: 'pointer'}}/> 
                            </Link> 
                        </div>
                        <p className="h4 text-center py-4">Sign up</p>
                        <div className="grey-text" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{textAlign: 'left'}}>
                                <MDBInput
                                    label="Your name"
                                    icon="user"
                                    value={this.state.username}
                                    onChange={(event) => this.onTextChange("username", event)}
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                />
                                <MDBInput
                                    label="Your email"
                                    icon="envelope"
                                    value={this.state.email}
                                    onChange={(event) => this.onTextChange("email", event)}
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                />
                                <MDBInput
                                    label="Your password"
                                    icon="lock"
                                    value={this.state.password}
                                    onChange={(event) => this.onTextChange("password", event)}
                                    group
                                    type="password"
                                    validate
                                />

                                <MDBFormInline style={{marginTop: -35}}>
                                    <span style={{marginRight: 8}}>Gender:</span>
                                    <MDBInput onClick={this.onClick(1)} checked={this.state.radio===1 ? true : false} label="Male"
                                        type="radio" id="radio1" />
                                    <MDBInput onClick={this.onClick(2)} checked={this.state.radio===2 ? true : false} label="Female"
                                        type="radio" id="radio2" />
                                </MDBFormInline>

                            </div>
                        </div>
                        <div style={{marginTop: 0}}>
                            {/* Select Image: <input type="file" style={{textAlign: 'center',backgroundImage: `url(${IMG})`, height: 100, width: 100, borderRadius: 50}}/> */}
                            <MDBRow>
                                <MDBCol style={{textAlign: 'right', marginRight: -18}}>
                                    <span>Select Image: </span>
                                </MDBCol>
                                <MDBCol style={{textAlign: 'left'}}>
                                    <input onChange={this.imagePickerHandler} src={BACK_ARROW} type="file" name="pic" accept="image/*" />
                                </MDBCol>
                            </MDBRow>
                        </div>
                        <div className="text-center py-4 mt-3">
                            <MDBBtn color="cyan" type="submit">
                                Register
                            </MDBBtn>
                            <div style={{marginTop: 10, cursor: 'pointer'}}>
                                <Link to="TutorLogin">Alreay member? Login!</Link>
                            </div>
                        </div>
                    </form>
                    </MDBCardBody>
                </MDBCard>
                </MDBCol>
            </MDBRow>
            </MDBContainer>
        );
    }
};

export default SignUp;