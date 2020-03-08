import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
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
        
        <Link to='/TuitionRequests'>
          <ListItem button key="1">
            <ListItemIcon> <img src={require('../../assets/icons/wallet.svg')} className={classes.icon} /> </ListItemIcon>
            <ListItemText primary="Tuition Requests" />
          </ListItem>
        </Link>
        <Divider />
        <Link to='TutorLogin'>
          <ListItem button key="2">
            <ListItemIcon> <img src={require('../../assets/icons/tutor.svg')} className={classes.icon} /> </ListItemIcon>
            <ListItemText primary="Login As Tutor" />
          </ListItem>
        </Link>
        <Divider />
        <Link to='StudentLogin'>
          <ListItem button key="3">
            <ListItemIcon> <img src={require('../../assets/icons/student1.svg')} className={classes.icon} /> </ListItemIcon>
            <ListItemText primary="Login As Student" />
          </ListItem>
        </Link>
        <Divider />

      </List>  
    </div>
  );

  return (
    <div>
      {/* <Button onClick={toggleDrawer('left', true)}>Open Left</Button> */}
      <Drawer open={props.state} onClose={props.toggleDrawer(false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}

export default MainDrawer;