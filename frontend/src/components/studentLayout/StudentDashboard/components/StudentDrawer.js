import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from "@material-ui/styles";
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  header: {
    width: 250,
    height: 200,
    color: 'white',
    textAlign: 'center',
    marginTop: -25,
    backgroundColor: '#183b4e'
  },
  icon: {
    height: 25,
    width: 25,
    opacity: 0.5
  }
});

function MainDrawer(props) {
  const classes = useStyles();

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >

      <div className={classes.header}>
        <h1 style={{paddingTop: 55}}>Spread Knowledge</h1>
      </div>

      <List>
        
      <Link to='/'>
          <ListItem button key="3">
            <ListItemIcon> <img src={require('../../../../assets/icons/tutor.svg')} className={classes.icon} /> </ListItemIcon>
            <ListItemText primary="Find Tutor" />
          </ListItem>
        </Link>
        <Divider />
        <Link to='/StudentTuitionRequests'>
          <ListItem button key="1">
            <ListItemIcon> <img src={require('../../../../assets/icons/wallet.svg')} className={classes.icon} /> </ListItemIcon>
            <ListItemText primary="My Requests" />
          </ListItem>
        </Link>
        <Divider />
        <Link to='/StudentProposals'>
          <ListItem button key="1">
            <ListItemIcon> 
              <img src={require('../../../../assets/icons/proposal.png')} className={classes.icon} /> 
            </ListItemIcon>
            <ListItemText primary="Proposals" />
          </ListItem>
        </Link>
        <Divider />

      </List>  
    </div>
  );

  return (
    <div>
      <Drawer open={props.state} onClose={props.toggleDrawer(false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}

export default MainDrawer;