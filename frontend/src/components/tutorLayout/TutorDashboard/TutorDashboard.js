import React, { Component } from 'react';
import '../../../App.css';
import AppBar from './components/DashAppBar';
import Drawer from '../TutorDrawer/TutorDrawer';
import TutorProfile from './components/TutorProfile';
import { connect } from 'react-redux';


class TutorDashboard extends Component {
  state = {
    searchQuery: '',
    left: false
  }

  componentWillMount() {
    let auth = localStorage.getItem('userType');
    if(auth !== 'tutor') {
      this.props.history.push('/TutorLogin');
    }
  }

  toggleDrawer = (open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ left: open });
  };

  searchTextChangeHandler = (event) => {
    this.setState({
      searchQuery: event.target.value
    })
  }

  render() {

    return (
      <div className="App">
        <AppBar toggleDrawer={this.toggleDrawer} />
        <TutorProfile tutors={this.props.tutors} />
        <Drawer toggleDrawer={this.toggleDrawer} state={this.state.left} />
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    tutors: store.tutorDataReducer.tutors
  }
}

export default connect(mapStateToProps)(TutorDashboard);