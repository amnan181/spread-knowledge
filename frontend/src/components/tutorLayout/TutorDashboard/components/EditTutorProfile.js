import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppBarEditTutor from '../../../myComponents/TitleAppBar';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { CITIES } from '../../../../constants/Constants';
import { connect } from 'react-redux';
import { updateTutor } from '../../../../redux/actions/TutorDataAction';

import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import { HashLoader } from 'react-spinners';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    button: {
      margin: theme.spacing.unit,
      marginTop: 25,
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });

class EditTutorProfile extends Component {

    state = {
        _id: '',
        name: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        address: '',
        imgURL: '',
        tDegreeL: '',
        tDegreeT: '',
        tAbout: '',
        eDegreeL: '',
        eDegreeT: '',
        wttDegreeL: '',
        wttDegreeT: '',
        subject1: '',
        subject2: '',
        subject3: '',
        feeFrom: '',
        feeTo: '',

        labelWidth: 0,
        loader: true,
        tutor: {}
    }

    componentWillMount() {
        let auth = localStorage.getItem('userType');
        if(auth !== 'tutor') {
            this.props.history.push('/TutorLogin');
        } else if(auth === 'tutor'){
            this.setState({ loader: false })
        }
    }

    componentDidMount() {
        let auth = localStorage.getItem('userType');
        if(auth !== 'tutor') {
            this.props.history.push('/TutorLogin');
        } else if(auth === 'tutor'){
            let tutor = this.props.location.query.tutor;
            if(tutor) {
                this.setState({
                    _id: tutor._id,
                    imgURL: tutor.imgURL,
                    name: tutor.tName,
                    email: tutor.tEmail,
                    password: tutor.tPassword,
                    phone: tutor.tPhone,
                    city: tutor.tCity,
                    tAbout: tutor.tAbout,
                    tGender: tutor.tGender,
                    address: tutor.tAddress,
                    tDegreeL: tutor.tDegreeL,
                    tDegreeT: tutor.tDegreeT,
                    eDegreeL: tutor.eDegreeL,
                    eDegreeT: tutor.eDegreeT,
                    wttDegreeL: tutor.wttDegreeL,
                    wttDegreeT: tutor.wttDegreeT,
                    subject1: tutor.subject1,
                    subject2: tutor.subject2,
                    subject3: tutor.subject3,
                    feeFrom: tutor.fFrom,
                    feeTo: tutor.fTo,
                    labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
                    loader: false
                })
            }
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    updateHandler = () => {
        let { _id, tGender, imgURL, name, email, password, phone, city, address, tDegreeL, 
            tDegreeT, eDegreeL, eDegreeT, wttDegreeL, wttDegreeT, tAbout, 
            subject1, subject2, subject3, feeFrom, feeTo  } = this.state;

        let checkSubjects = false;
        if(subject1==="" && subject2==="" && subject3==="") {
            checkSubjects = true;
        }

        if (name===""||email===""||password===""||tAbout===""||city===""||address===""||phone===""||tDegreeL===""||tDegreeT===""||eDegreeL===""||eDegreeT===""||wttDegreeL===""||wttDegreeT===""||feeFrom===""|| checkSubjects ||feeTo==="") {
            alert("No empty field allowed!");
        } else {
            this.setState({loader: true})
            var tutorInfo = {
                _id,
                tName: name,
                tEmail: email,
                tPassword: password,
                tGender,
                imgURL,
                tAbout,
                tCity: city,
                tAddress: address,
                tPhone: phone,
                tDegreeT,
                tDegreeL,
                eDegreeL,
                eDegreeT,
                wttDegreeL,
                wttDegreeT,
                subject1,
                subject2,
                subject3,
                fFrom: feeFrom,
                fTo: feeTo
            }
            let token = localStorage.getItem('auth');

            this.props.updateTutor({tutor: tutorInfo, token: JSON.parse(token)});
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.updateTutorStatus === "done") {
            this.setState({ loader: false });
            this.props.history.push('/TutorDashboard');
        }

        if(nextProps.updateTutorStatus === "error") {
            this.setState({ loader: false });
        }
    }

    render() {
        const { classes } = this.props;
        let { loader } = this.state;

        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                >
                
                <AppBarEditTutor title='Edit Profile' backLink='/TutorDashboard' />
            { loader ? 
                <div style={{ marginTop: '35vh' }}>
                    <HashLoader
                        color={'#AD9101'}
                        loading='true'
                    />
                </div>
            :
                <Paper style={{width: '85%', paddingTop: 30, paddingBottom: 20, paddingLeft: 30, paddingRight: 30, marginBottom: 10}}>
                    <TextField
                        id="standard-full-width"
                        label="Name"
                        placeholder="Enter your name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Email"
                        placeholder="Enter your email"
                        fullWidth
                        type='email'
                        margin="normal"
                        variant="outlined"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Password"
                        placeholder="Enter new password"
                        fullWidth
                        // type='password'
                        margin="normal"
                        variant="outlined"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Phone"
                        placeholder="Enter your phone"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                        <InputLabel
                            ref={ref => {
                                this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-age-simple"
                        >
                            City
                        </InputLabel>
                        <Select
                            value={this.state.city}
                            onChange={this.handleChange}
                            style={{textAlign: 'left'}}
                            input={
                                <OutlinedInput
                                    labelWidth={this.state.labelWidth}
                                    name="city"
                                    id="outlined-age-simple"
                                />
                            }
                        >
                            { CITIES.map( cty => (
                                <MenuItem value={cty}>{cty}</MenuItem>
                            )) }
                        </Select>
                    </FormControl>
                    
                    <TextField
                        id="standard-full-width"
                        label="Address"
                        placeholder="Enter your address"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="address"
                        value={this.state.address}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                        <InputLabel
                            ref={ref => {
                                this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-age-simple"
                        >
                            Degree Level
                        </InputLabel>
                        <Select
                            value={this.state.tDegreeL}
                            onChange={this.handleChange}
                            style={{textAlign: 'left'}}
                            input={
                                <OutlinedInput
                                    labelWidth={this.state.labelWidth}
                                    name="tDegreeL"
                                    id="outlined-age-simple"
                                />
                            }
                        >
                            <MenuItem value='Matric'>Matric</MenuItem>
                            <MenuItem value="Intermediate">Intermediate</MenuItem>
                            <MenuItem value="Bachelors">Bachelors</MenuItem>
                            <MenuItem value="Masters">Masters</MenuItem>
                            <MenuItem value="Doctorial">Doctorial</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        id="standard-full-width"
                        label="Degree Title"
                        placeholder="Enter your degree title i.e. Software Engineering"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="tDegreeT"
                        value={this.state.tDegreeT}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                        <InputLabel
                            ref={ref => {
                                this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-age-simple"
                        >
                            Experienced Degree Level
                        </InputLabel>
                        <Select
                            value={this.state.eDegreeL}
                            onChange={this.handleChange}
                            style={{textAlign: 'left'}}
                            input={
                                <OutlinedInput
                                    labelWidth={this.state.labelWidth}
                                    name="eDegreeL"
                                    id="outlined-age-simple"
                                />
                            }
                        >
                            <MenuItem value='Matric'>Matric</MenuItem>
                            <MenuItem value="Intermediate">Intermediate</MenuItem>
                            <MenuItem value="Bachelors">Bachelors</MenuItem>
                            <MenuItem value="Masters">Masters</MenuItem>
                            <MenuItem value="Doctorial">Doctorial</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        id="standard-full-width"
                        label="Experienced Degree Title"
                        placeholder="Enter degree you have taught i.e. Pre-Engineering"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="eDegreeT"
                        value={this.state.eDegreeT}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                        <InputLabel
                            ref={ref => {
                                this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-age-simple"
                        >
                            Degree Level
                        </InputLabel>
                        <Select
                            value={this.state.wttDegreeL}
                            onChange={this.handleChange}
                            style={{textAlign: 'left'}}
                            input={
                                <OutlinedInput
                                    labelWidth={this.state.labelWidth}
                                    name="wttDegreeL"
                                    id="outlined-age-simple"
                                />
                            }
                        >
                            <MenuItem value='Matric'>Matric</MenuItem>
                            <MenuItem value="Intermediate">Intermediate</MenuItem>
                            <MenuItem value="Bachelors">Bachelors</MenuItem>
                            <MenuItem value="Masters">Masters</MenuItem>
                            <MenuItem value="Doctorial">Doctorial</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        id="standard-full-width"
                        label="Degree Title"
                        placeholder="Enter degree to teach i.e. Software Engineering"
                        fullWidth
                        margin="normal"
                        name="wttDegreeT"
                        value={this.state.wttDegreeT}
                        onChange={this.handleChange}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    
                    <TextField
                        id="standard-full-width"
                        label="Subject 1"
                        placeholder="Enter subject to teach"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="subject1"
                        value={this.state.subject1}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    
                    <TextField
                        id="standard-full-width"
                        label="Subject 2"
                        placeholder="Enter subject to teach"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="subject2"
                        value={this.state.subject2}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    
                    <TextField
                        id="standard-full-width"
                        label="Subject 3"
                        placeholder="Enter subject to teach"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="subject3"
                        value={this.state.subject3}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    
                    <TextField
                        id="standard-full-width"
                        label="Fee Range"
                        placeholder="Fee From i.e. 7500 Rs."
                        fullWidth
                        type='number'
                        margin="normal"
                        variant="outlined"
                        name="feeFrom"
                        value={this.state.feeFrom}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />     
                    
                    <TextField
                        id="standard-full-width"
                        label="Fee Range"
                        type='number'
                        placeholder="Fee To i.e. 9500 Rs."
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="feeTo"
                        value={this.state.feeTo}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />     
                    
                    <TextField
                        id="standard-full-width"
                        label="About Yourself"
                        type='text'
                        placeholder="About yourself"
                        fullWidth
                        multiline
                        margin="normal"
                        variant="outlined"
                        name="tAbout"
                        value={this.state.tAbout}
                        onChange={this.handleChange}
                        maxRows={6}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />   
                    <Button onClick={() => this.updateHandler()} variant="contained" color="primary" className={classes.button}>
                      Update
                    </Button>  
                </Paper>   
            }
            </Grid>
        )
    }
}

const mapState = (state) => {
    return {
        updateTutorStatus: state.tutorDataReducer.updateTutorStatus
    }
}

 export default connect(mapState, { updateTutor })(withStyles(styles)(EditTutorProfile));