import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TutorHeader from '../../../TutorsList/components/TutorHeader';
import SimpleTable from '../../../TutorsList/components/TutorDetails';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginLeft: 'auto',
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

//   searchingForName = searchQuery => {
//     return function(tutor) {
//       return (
//         tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         tutor.city.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery
//       );
//     };
//   };


  render() {
  const { classes,tutors } = this.props;
  
  return (
    <div className={classes.root}>
      { tutors.length > 0 ?
      <div>
        {/* { tutors.filter(this.searchingForName(this.props.searchQuery)).length > 0 ?  */}
        <div>
       {tutors.map( tutor => (

        <ExpansionPanel
          style={{ marginBottom: '5px', marginTop: '5px', marginLeft: "auto", marginRight: "auto" }}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              <TutorHeader tutor={tutor} />
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <SimpleTable tutor={tutor} style={{width: '100%'}}/>
          </ExpansionPanelDetails>
            <Typography className={classes.para}>
              {tutor.tAbout}
            </Typography>
        </ExpansionPanel>

      ) )}
        </div>
      {/* : <span className={classes.text}><h4>No match found! </h4> </span> } */}
      </div>
      : <span className={classes.text}> <h3>No tutor found!</h3> </span> }
    </div>
  );
}
}

TutorsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TutorsList);