import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";


import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { sendProposal } from '../../redux/actions/TuitionProposalAction';
import { HashLoader } from 'react-spinners';


class TuitionRequest extends Component {
    state = {
        open: false,
        description: '',
        fee: '',
        loader: false
    }

    sendProposalHandler = () => {
        let tutor = localStorage.getItem('authUser');
        if(tutor) {
            tutor = JSON.parse(tutor);
            this.handleClickOpen();
        } else {
            alert('First login as tutor!');
        }
    }

    guidGenerator = () => {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
    handleClose = () => {
    this.setState({ open: false });
    };

    handleSend = () => {
        let { description, fee } = this.state;
        if(description === '' || fee === '') {
            alert('Both fields are required!')
        } else {
            this.setState({ loader: true })
            let tutor = localStorage.getItem('authUser');
            tutor = JSON.parse(tutor);

            let tuitionProposal = {
                _id: this.guidGenerator(),
                tutorID: tutor._id,
                tuitionID: this.props.tuition._id,
                description,
                fee
            }
            let token = JSON.parse(localStorage.getItem('auth'));

            this.props.sendProposal({proposal: tuitionProposal, token});
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.sendProposalStatus === 'done') {
            this.setState({
                loader: false,
                open: false, 
                description: '', 
                fee: ''
            })
        }

        if(nextProps.sendProposalStatus === 'error') {
            this.setState({
                loader: false,
            })
        }
    }

    textChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let { loader } = this.state;
        let tuition = this.props.tuition;

        return (
            loader 
            ?
            <div style={{ marginTop: '35vh', marginLeft: '50vw' }}>
                <HashLoader
                    color={'#AD9101'}
                    loading='true'
                />
            </div>
            :
            <div style={{width: '100%', maxWidth: 860, margin: 'auto'}}>
                <ExpansionPanel style={{marginTop: 8}}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <Typography variant="h5" style={{ marginBottom: 15, color: '#183b4e' }}>Tutor Required!</Typography>
                            <Divider style={{marginBottom: 11}} />
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                                <Typography variant="h7">{tuition.trDegreeL + " of " + tuition.trDegreeT}</Typography>
                                <Typography variant="h7">{tuition.trCity}</Typography>
                            </div>
                        </div>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{alignItems: 'center'}}>
                            <div style={{ margin: 'auto' }}>
                                <div className="card-body" style={{ marginTop: -80 }}>
                                    <div style={{ width: '100%', maxWidth: 860, margin: 'auto' }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow key={0}>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                                <TableRow key={1}>
                                                    <TableCell align="left">
                                                        <b>Class</b>
                                                    </TableCell>
                                                    <TableCell align="left">{tuition.trClass}</TableCell>
                                                </TableRow>
                                                <TableRow key={2}>
                                                    <TableCell align="left">
                                                        <b>Subject</b>
                                                    </TableCell>
                                                    <TableCell align="left">{tuition.trSubject}</TableCell>
                                                </TableRow>
                                                <TableRow key={4}>
                                                    <TableCell>
                                                        <b>Timing</b>
                                                    </TableCell>
                                                    <TableCell align="left">{tuition.timeFrom + " - " + tuition.timeTo}</TableCell>
                                                </TableRow>
                                                <TableRow key={5}>
                                                    <TableCell>
                                                        <b>Address</b>
                                                    </TableCell>
                                                    <TableCell align="left">{tuition.trAddress}</TableCell>
                                                </TableRow>
                                                <TableRow key={3}>
                                                    <TableCell>
                                                        <b>Posted At</b>
                                                    </TableCell>
                                                    <TableCell align="left">{tuition.trPostedAt}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                    </ExpansionPanelDetails>
                    <Divider style={{marginTop: -45}}/>
                    <ExpansionPanelActions>
                        <Button onClick={this.sendProposalHandler} color="primary" style={{marginRight: 45}}>
                            SEND PROPOSAL
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
                <div>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Proposal</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To send proposal to this request, please enter your qualities 
                                that make you perfect for this Tuition.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="description"
                                label="Enter Description"
                                type="text"
                                fullWidth
                                multiline
                                onChange={(event) => this.textChangeHandler(event)}
                                variant='outlined'
                                rowsMax="10"
                            />
                            <TextField
                                margin="dense"
                                name="fee"
                                label="Enter Fee (Rs.)"
                                type="number"
                                onChange={(event) => this.textChangeHandler(event)}
                                fullWidth
                                variant='outlined'
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleSend} color="primary">
                                Send
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

const mapState = (store) => {
    return {
        sendProposalStatus: store.tuitionProposalReducer.sendProposalStatus
    }
}

export default connect(mapState, { sendProposal })(TuitionRequest);