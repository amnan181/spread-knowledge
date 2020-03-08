import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from "mdbreact";
import { CITIES } from '../../../constants/Constants';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addTutor } from '../../../redux/actions/TutorDataAction';
import { HashLoader } from 'react-spinners';

class TutorGetStart extends React.Component {

  state = {
    formActivePanel1: 1,
    formActivePanel1Changed: false,
    
    tCity: 'Lahore',
    tAddress: 'Model town B',
    tPhone: '030185965230',
    tDegreeL: 'Bachelors',
    tDegreeT: 'CS',
    eDegreeL: 'Intermediate',
    eDegreeT: 'CS',
    wttDegreeL: 'Bachelors',
    wttDegreeT: 'CS',
    subject1: 'AI',
    subject2: 'SE1',
    subject3: 'SE2',
    fFrom: '4500',
    fTo: '6500',
    tAbout: 'Aliya sdfjskdfjsd sdkfjksdjf dskjfhsdjkfbs dfkjsdfmnsd ckjw.',
    tName: 'Aliya',
    tEmail: 'aliya@gmail.com',
    tPassword: 'aliya123',
    tGender: 'male',
    imgURL: '',

    loader: false
  }

  componentWillMount() {
    this.setState({
      tName: this.props.location.state.username,
      tEmail: this.props.location.state.email,
      tPassword: this.props.location.state.password,
      tGender: this.props.location.state.gender,
      imgURL: this.props.location.state.imgURL
    })
  }

  swapFormActive = (a) => (param) => (e) => {
    this.setState({
      ['formActivePanel' + a]: param,
      ['formActivePanel' + a + 'Changed']: true
    });
  }

  guidGenerator = () => {
      var S4 = function() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  handleNextPrevClick = (a) => (param) => (e) => {
    this.setState({
      ['formActivePanel' + a]: param,
      ['formActivePanel' + a + 'Changed']: true
    });
  }

  handleSubmission = () => {
    let _id = this.guidGenerator();
    let tCity = this.state.tCity;
    let tAddress = this.state.tAddress;
    let tPhone = this.state.tPhone;
    let tDegreeT = this.state.tDegreeT;
    let tDegreeL = this.state.tDegreeL;
    let eDegreeT = this.state.eDegreeT;
    let eDegreeL = this.state.eDegreeL;
    let wttDegreeL = this.state.wttDegreeL;
    let wttDegreeT = this.state.wttDegreeT;
    let subject1 = this.state.subject1;
    let subject2 = this.state.subject2;
    let subject3 = this.state.subject3;
    let fFrom = this.state.fFrom;
    let fTo = this.state.fTo;
    let tAbout = this.state.tAbout;
    let tName = this.state.tName;
    let tEmail = this.state.tEmail;
    let tPassword = this.state.tPassword;
    let tGender = this.state.tGender;
    let imgURL = this.state.imgURL;

    if (tCity===""||tAddress===""||tPhone===""||tAbout===""||tDegreeL===""||tDegreeT===""||eDegreeL===""||eDegreeT===""||wttDegreeL===""||wttDegreeT===""||subject1===""||subject2===""||subject3===""||fFrom===""||fTo==="") {
      alert("No empty field allowed!");
    } else {
      this.setState({ loader: true })
      var tutotInfo = {
        _id,
        tName,
        tEmail,
        tPassword,
        tGender,
        tAbout,
        imgURL,
        tCity,
        tAddress,
        tPhone,
        tDegreeT,
        tDegreeL,
        eDegreeL,
        eDegreeT,
        wttDegreeL,
        wttDegreeT,
        subject1,
        subject2,
        subject3,
        fFrom,
        fTo
      }

      this.props.addTutor(tutotInfo);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.addTtutorStatus === "done" ) {
      this.setState({ loader: false })
      this.props.history.push('/TutorLogin');
    }

    if(nextProps.addTtutorStatus === "error" ) {
      this.setState({ loader: false })
    }
  }

  calculateAutofocus = (a) => {
    if (this.state['formActivePanel' + a + 'Changed']) {
      return true
    }
  }

  onTextChange = (name, event) => {
    this.setState({
      [name]: event.target.value
    })
  }

  selectHandler = (name, event) => {
    // let city = event.target.value;
    this.setState({[name]: event.target.value});
    
  }

  render() {
    let { loader } = this.state;

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol xl="6" lg="7" md="10" style={{ margin: 'auto' }}>
            <MDBCard>
              <MDBCardBody>
                <h2 className="text-center font-weight-bold pt-4 pb-5">
                  <strong>Let's just get started!</strong>
                </h2>
                <MDBRow>
                  <MDBCol>
                    <a href="#formstep1" onClick={this.swapFormActive(1)(1)}>
                      <MDBBtn color={this.state.formActivePanel1 === 1 ? "indigo" : "default"} circle>
                        1
                            </MDBBtn>
                    </a>
                    <p>Contact Information</p>
                  </MDBCol>
                  <MDBCol>
                    <a href="#formstep2" onClick={this.swapFormActive(1)(2)}>
                      <MDBBtn color={this.state.formActivePanel1 === 2 ? "indigo" : "default"} circle>
                        2
                            </MDBBtn>
                    </a>
                    <p>Qualification</p>
                  </MDBCol>
                  <MDBCol>
                    <a href="#formstep3" onClick={this.swapFormActive(1)(3)}>
                      <MDBBtn color={this.state.formActivePanel1 === 3 ? "indigo" : "default"} circle>
                        3
                            </MDBBtn>
                    </a>
                    <p>What to teach</p>
                  </MDBCol>
                </MDBRow>

                <form action="" method="post">
                  <MDBRow>
                    {
                      loader ?
                        <div style={{ marginTop: '35vh' }}>
                          <HashLoader
                            color={'#AD9101'}
                            loading='true'
                          />
                        </div>
                      :
                      this.state.formActivePanel1 === 1 && (
                      <MDBCol md="12">
                        <h3 className="font-weight-bold pl-0 my-4">
                          <strong>Contact Information</strong>
                        </h3>
                        <div style={{ textAlign: 'left', marginLeft: 30, marginRight: 30, justifyContent: 'center', alignItems: 'center' }}>
                          <div>
                            <span style={{ marginRight: 15 }}>Select City: </span>
                            <select onChange={(event) => this.selectHandler("tCity", event)} class="mdb-select md-form" style={{ zoom: 1.3, border: 'none', padding: 3 }}>
                              { this.state.tCity == "" ?
                              <option value="" disabled selected>Choose your city</option>
                              : <option value="" disabled>Choose your city</option> }
                              {CITIES.map(item => {
                                return (
                                   this.state.tCity == item ?  
                                  <option selected value={item}>{item}</option>
                                  : 
                                  <option value={item}>{item}</option>
                                )
                              })
                              }
                            </select>
                          </div>

                          <MDBInput
                            label="Address"
                            icon="map-marker-alt"
                            name="tAddress"
                            autoFocus={this.calculateAutofocus(1)}
                            value={this.state.tAddress}
                            onChange={(event) => this.onTextChange("tAddress", event)}
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                          />
                          <MDBInput
                            label="Contact Number"
                            name="tPhone"
                            icon="phone"
                            value={this.state.tPhone}
                            onChange={(event) => this.onTextChange("tPhone", event)}
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                          />
                          <MDBInput
                            label="About Yourself"
                            name="tAbout"
                            icon="user"
                            value={this.state.tAbout}
                            onChange={(event) => this.onTextChange("tAbout", event)}
                            group
                            multiline
                            type="text"
                            validate
                            rowsMax='6'
                            error="wrong"
                            success="right"
                          />
                        </div>
                        <MDBBtn color="indigo" rounded className="float-right" onClick={this.handleNextPrevClick(1)(2)}>
                          next
                    </MDBBtn>
                      </MDBCol>
                    )}
                    {this.state.formActivePanel1 === 2 && (
                      <MDBCol md="12">
                        <h3 className="font-weight-bold pl-0 my-4">
                          <strong>Qualification</strong>
                        </h3>
                        <div style={{ textAlign: 'left', marginLeft: 30, marginRight: 30, justifyContent: 'center', alignItems: 'center' }}>
                          <div>
                            <span style={{ marginRight: 15 }}>Select Degree: </span>
                            <select onChange={(event) => this.selectHandler("tDegreeL", event)} class="mdb-select md-form" style={{ zoom: 1.3, border: 'none', padding: 3 }}>
                              <option value="" disabled selected>Choose your degree level</option>
                              <option value="Primary">Primary</option>
                              <option value="Middle">Middle</option>
                              <option value="Matric">Matric</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Bachelors">Bachelors</option>
                              <option value="Masters">Masters</option>
                              <option value="Doctoral">Doctoral</option>
                            </select>
                          </div>

                          <MDBInput
                            label="Degree Title i.e. Software Engineering"
                            name="tDegreeT"
                            icon="graduation-cap"
                            value={this.state.tDegreeT}
                            onChange={(event) => this.onTextChange("tDegreeT", event)}
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                          />
                          <div>
                            <span style={{ marginRight: 15 }}>Experience Degree: </span>
                            <select onChange={(event) => this.selectHandler("eDegreeL", event)} class="mdb-select md-form" style={{ zoom: 1.3, border: 'none', padding: 3 }}>
                              <option value="" disabled selected>Choose degree level</option>
                              <option value="Primary">Primary</option>
                              <option value="Middle">Middle</option>
                              <option value="Matric">Matric</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Bachelors">Bachelors</option>
                              <option value="Masters">Masters</option>
                              <option value="Doctoral">Doctoral</option>
                            </select>
                          </div>

                          <MDBInput
                            label="Degree Title i.e. Software Engineering"
                            name="eDegreeT"
                            icon="graduation-cap"
                            value={this.state.eDegreeT}
                            onChange={(event) => this.onTextChange("eDegreeT", event)}
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                          />
                        </div>
                        <MDBBtn color="indigo" rounded className="float-left" onClick={this.handleNextPrevClick(1)(1)}>
                          previous
                    </MDBBtn>
                        <MDBBtn color="indigo" rounded className="float-right" onClick={this.handleNextPrevClick(1)(3)}>
                          next
                    </MDBBtn>
                      </MDBCol>
                    )}
                    {this.state.formActivePanel1 === 3 && (
                      <MDBCol md="12">
                        <h3 className="font-weight-bold pl-0 my-4">
                          <strong>What to teach</strong>
                        </h3>
                        <div style={{ textAlign: 'left', marginLeft: 30, marginRight: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <span style={{ marginRight: 15 }}>Select Degree: </span>
                            <select onChange={(event) => this.selectHandler("wttDegreeL", event)} class="mdb-select md-form" style={{ zoom: 1.3, border: 'none', padding: 3 }}>
                              <option value="" disabled selected>Choose degree level</option>
                              <option value="Primary">Primary</option>
                              <option value="Middle">Middle</option>
                              <option value="Matric">Matric</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Bachelors">Bachelors</option>
                              <option value="Masters">Masters</option>
                              <option value="Doctoral">Doctoral</option>
                            </select>
                          </div>

                          <MDBInput
                            label="Degree Title i.e. F.Sc (Pre Engineering)"
                            name="wttDegreeT"
                            icon="certificate"
                            value={this.state.wttDegreeT}
                            onChange={(event) => this.onTextChange("wttDegreeT", event)}
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                          />

                          <div style={{display: 'flex', flexDirection: 'row'}}>
                            <MDBInput
                              label="Subject 1"
                              name="subject1"
                              icon="book"
                              value={this.state.subject1}
                              onChange={(event) => this.onTextChange("subject1", event)}
                              group
                              type="text"
                              validate
                              error="wrong"
                              success="right"
                            />
                            <MDBInput
                              label="Subject 2"
                              name="subject2"
                              icon="book"
                              value={this.state.subject2}
                              onChange={(event) => this.onTextChange("subject2", event)}
                              group
                              type="text"
                              validate
                              error="wrong"
                              success="right"
                            />
                            <MDBInput
                              label="Subject 3"
                              name="subject3"
                              icon="book"
                              value={this.state.subject3}
                              onChange={(event) => this.onTextChange("subject3", event)}
                              group
                              type="text"
                              validate
                              error="wrong"
                              success="right"
                            />
                          </div>  
                          <div style={{display: 'flex', flexDirection: 'row'}}>
                            <span>Fee range:</span>
                            <MDBInput
                              label="From"
                              // icon="book"
                              value={this.state.fFrom}
                              onChange={(event) => this.onTextChange("fFrom", event)}
                              group
                              type="number"
                              validate
                              error="wrong"
                              success="right"
                            />
                            <MDBInput
                              label="To"
                              // icon="book"
                              value={this.state.fTo}
                              onChange={(event) => this.onTextChange("fTo", event)}
                              group
                              style={{marginLeft: 15}}
                              type="number"
                              validate
                              error="wrong"
                              success="right"
                            />
                          </div>
                        </div>
                        <MDBBtn color="indigo" rounded className="float-left" onClick={this.handleNextPrevClick(1)(2)}
                          autoFocus={this.calculateAutofocus(1)}>
                          previous
                    </MDBBtn>
                        <MDBBtn color="default" rounded className="float-right" onClick={this.handleSubmission}>
                          submit
                        </MDBBtn>
                      </MDBCol>
                    )}
                  }
                  </MDBRow>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };
}

const mapStateToProps = (state) => {
  return {
      addTtutorStatus: state.tutorDataReducer.addTtutorStatus
  }
}

export default withRouter(connect(mapStateToProps, {addTutor})(TutorGetStart));