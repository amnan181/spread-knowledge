import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Icon, { AntDesign, Zocial } from 'react-web-vector-icons';
import  { EndPoint } from '../../../EndPoint/EndPoint';

require('react-web-vector-icons/fonts');

const useStyles = theme => ({
  root: {
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  listItem: {
    margintTop: 15,
  }
});

function TutorHeader(props) {
  
  const classes = useStyles();
  let tutor = props.tutor;
  
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start" className="listItem">
          <ListItemAvatar style={{height: 100, width: 100 }}>
            <Avatar alt="Profile Picture" src={ tutor.imgURL.includes('imgURL') ? EndPoint+ "/" +tutor.imgURL : tutor.imgURL } />
          </ListItemAvatar>
        <span alignSelf="center" style={{ marginTop: 20, marginLeft: 25 }}>
          <ListItemText
            primary={tutor.tName}
            secondary={
              <div>
                <React.Fragment>
                  <Typography
                    edge="end"
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {tutor.tDegreeL+" of "+tutor.tDegreeT}
                  </Typography>
                </React.Fragment>
                <React.Fragment>
                  
                  {/* <Icon font="Entypo" name="login" color="black" size={20} /> */}

                  <Typography
                    edge="end"
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {tutor.tCity}
                  </Typography>
                </React.Fragment>
              </div>
            }
          />
        </span>
      </ListItem>
    </List>
  );
}

export default TutorHeader;