import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import AuthenticatedRoute from './AuthenticatedRoute';
import NotFound from './NotFound';
import './styles/App.css'
import './styles/Landing.css'
import Landing from './signup-login/landing.jsx'
import Login from './signup-login/Login'
import Signup from './signup-login/Signup'
import Home from './home/Home'
import HouseSelection from './house-selection/page'
import InvitePage from './add-members/page'
import InvitationsCreate from './invitations-create/InvitationsCreate'
import SchedulePage from './schedule/page'
import UserContext from './UserContext';
import HouseContext from './HouseContext';
import ChoresList from './chores-list/ChoresList'
import React from 'react';
import Chore from './home/Chore';

function App() {
  const [currentUserEmail, setUserEmail] = React.useState('');
  const [currentUserName, setUserName] = React.useState('');
  const [houseName, setHouseName] = React.useState('');
  const [houseType, setHouseType] = React.useState('');
  // const [selectedWorkspace, setSelectedWorkspace] = React.useState('');
  // const [selectedChannel, setChannel] = React.useState('');

  return (
    //   selectedWorkspace, setSelectedWorkspace, selectedChannel, setChannel}}>
    <UserContext.Provider value={{currentUserEmail, setUserEmail, currentUserName, setUserName}}>
      <HouseContext.Provider value={{houseName, setHouseName, houseType, setHouseType}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={
            // <AuthenticatedRoute>
              <Login />
            // </AuthenticatedRoute>
          } />
          <Route path="/signup" element={
            // <AuthenticatedRoute>
              <Signup />
            // </AuthenticatedRoute>
          } />
          <Route path="/home" element={
            // <AuthenticatedRoute>
              <Home />
            // </AuthenticatedRoute>
          } />
          <Route path="/schedule" element={
            // <AuthenticatedRoute>
              <SchedulePage />
            // </AuthenticatedRoute>
          } />
          <Route path="/invitationscreate" element={
            // <AuthenticatedRoute>
              <InvitationsCreate />
            // </AuthenticatedRoute>
          } />
          <Route path="/houseselection" element={
            // <AuthenticatedRoute>
              <HouseSelection />
            // </AuthenticatedRoute>
          } />
          <Route path="/invites" element={
            // <AuthenticatedRoute>
              <InvitePage />
            // </AuthenticatedRoute>
          } />
          <Route path="/choreslist" element={
            // <AuthenticatedRoute>
              <ChoresList />
            // </AuthenticatedRoute>
          } />
          <Route path="*"
            element={
              // <AuthenticatedRoute >
                <NotFound />
              // </AuthenticatedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      </HouseContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
