import React, { Component } from 'react';
import '../../../App.css';
import AppBar from './components/DashAppBar';
import Drawer from './components/StudentDrawer';
import StudentProfile from './components/StudentProfile';


class StudentDashboard extends Component {
  state = {
    searchQuery: '',
    left: false
  }

  componentWillMount() {
    let auth = localStorage.getItem('userType');
    if(auth !== 'student') {
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
    let student = localStorage.getItem("authStudent");
    student = JSON.parse(student);   
  return (
    <div className="App">
        <AppBar toggleDrawer={this.toggleDrawer} />
        <StudentProfile />
        <Drawer toggleDrawer={this.toggleDrawer} state={this.state.left} />

    </div>
  );
}
}

export default StudentDashboard;