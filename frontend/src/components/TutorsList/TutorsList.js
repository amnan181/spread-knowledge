import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { HashLoader } from 'react-spinners';

import TutorHeader from './components/TutorHeader';
import TutorDetails from './components/TutorDetails';
import { connect } from 'react-redux';
import { getAllTutors } from '../../redux/actions/TutorDataAction';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginLeft: 'auto',
    maxWidth: 860,
    marginRight: 'auto',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  para: {
    textAlign: 'left',
    display: 'flex',
    padding: 20,
  },
  text: {
    color: '#AD9101'
  }
});

class TutorsList extends Component {
  state = {
    tutors: [],
    loader: true
  }

  componentDidMount() {
    this.props.getAllTutors();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.getAllTutorsStatus === 'done') {
      this.setState({
        tutors: nextProps.tutors, 
        loader: false
      })
    }

    if(nextProps.getAllTutorsStatus === 'error') {
      this.setState({
        loader: false
      })
    }
  }

  searchingForName = searchQuery => {
    return function(tutor) {
      return (
        tutor.tName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.tCity.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tutor.tDegreeL.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tutor.tDegreeT.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery
      );
    };
  };


  render() {
    const { classes} = this.props;
    let { tutors, loader } = this.state;

  return (
    <div className={classes.root}>
      {
        loader ? 
        <div style={{ marginTop: '35vh'}}>
          <HashLoader 
            color={'#AD9101'}
            loading='true'
          />
        </div>
        :
        tutors.length > 0 ?
        <div>
          { tutors.filter(this.searchingForName(this.props.searchQuery)).length > 0 ? 
          <div>
        {tutors.filter(this.searchingForName(this.props.searchQuery)).map( tutor => (

          <ExpansionPanel
            style={{ marginBottom: '5px', marginTop: '5px', marginLeft: "auto", marginRight: "auto" }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                <TutorHeader tutor={tutor} />
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <TutorDetails tutor={tutor} style={{width: '100%'}}/>
            </ExpansionPanelDetails>
              <Typography className={classes.para}>
                {tutor.tAbout}
              </Typography>
          </ExpansionPanel>

        ))}
        </div>
          : <span style={{marginTop: 25}} className={classes.text}><h4>No match found! </h4> </span> }
        </div>
        : <span style={{marginTop: 25}} className={classes.text}> <h3>No tutor found!</h3> </span>
      }
    </div>
  );
}
}

TutorsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    tutors: state.tutorDataReducer.tutors,
    getAllTutorsStatus: state.tutorDataReducer.getAllTutorsStatus
  }
}

export default withStyles(styles)(connect(mapStateToProps, { getAllTutors })(TutorsList));