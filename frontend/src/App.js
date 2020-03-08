import React from 'react';
import './App.css';

import Home from './components/Home/Home';
import TutorLogin from './components/tutorLayout/Login/Login';
import TutorSignUp from './components/tutorLayout/SignUp/Signup';
import StudentLogin from './components/studentLayout/Login/Login';
import StudentSignUp from './components/studentLayout/SignUp/Signup';
import TutorGetStart from './components/tutorLayout/GetStart/GettingStarted';
import TutorDashboard from './components/tutorLayout/TutorDashboard/TutorDashboard';
import TuitionRequests from './components/myComponents/TuitionRequests/TuitionRequests';
import StudentDashboard from './components/studentLayout/StudentDashboard/StudentDashboard';
import MyProposals from './components/studentLayout/StudentDashboard/components/StudentProposals';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import EditTutorProfile from './components/tutorLayout/TutorDashboard/components/EditTutorProfile';
import GetStarted from './components/studentLayout/SignUp/GetStarted';
import EditStudentProfile from './components/studentLayout/StudentDashboard/components/EditStudentProfile';
import MyTuitionRequests from './components/studentLayout/TuitionRequests/MyTuitionRequests';
import TutorTuitionRequests from './components/tutorLayout/TuitionRequests/TuitionRequests';
import NoMatch from './components/myComponents/NoMatch';

function App() {
  return (
    <Router>
    <Switch>
        <Route
          path='/'
          exact
          component={Home}
        />
        <Route
          exact
          path='/TutorLogin'
          component={TutorLogin}
        />
        <Route
          exact
          path='/StudentLogin'
          component={StudentLogin}
        />
        <Route
          exact
          path='/StudentSignup'
          component={StudentSignUp}
        />
        <Route
          exact
          path='/StudentGetStarted/:id'
          component={GetStarted}
        />
        <Route
          exact
          path="/StudentDashboard"
          component={StudentDashboard}
        />
        <Route
          exact
          path='/TutorSignup'
          component={TutorSignUp}
        />
        <Route
          exact
          path='/TutorGetStart/:username'
          component={TutorGetStart}
        />
        <Route
          exact
          path="/TutorDashboard"
          component={TutorDashboard}
        />  
        <Route
          exact
          path="/TuitionRequests"
          component={TuitionRequests}
        />  
        <Route
          exact
          path="/EditTutorProfile/:id"
          component={EditTutorProfile}
        />  
        <Route
          exact
          path="/TutorTuitionRequests"
          component={TutorTuitionRequests}
        />  
        <Route
          exact
          path="/EditStudentProfile/:id"
          component={EditStudentProfile}
        />  
        <Route
          exact
          path="/StudentTuitionRequests"
          component={MyTuitionRequests}
        />  
        <Route
          exact
          path="/StudentProposals"
          component={MyProposals}
        />  
        <Route component={NoMatch} />
    </Switch>
    </Router>
  );
}

export default App;
