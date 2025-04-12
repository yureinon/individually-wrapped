import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import NotFound from './NotFound';
import './styles/App.css'
import './styles/Landing.css'
import Landing from './signup-login/landing'
import Login from './signup-login/Login'
import Signup from './signup-login/Signup'
import Home from './home/Home'
import HouseSelection from './house-selection/page'
import InvitePage from './add-members/page'
import SchedulePage from './schedule/page'

// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <Landing/>
//   )
// }

// export default App

function App() {
  // const [currentUserID, setUserID] = useState('');
  // const [selectedWorkspace, setSelectedWorkspace] = React.useState('');
  // const [selectedChannel, setChannel] = React.useState('');

  return (
    // <UserContext.Provider value={{currentUserID, setUserID,
    //   selectedWorkspace, setSelectedWorkspace, selectedChannel, setChannel}}>
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
          <Route path="*"
            element={
              // <AuthenticatedRoute >
                <NotFound />
              // </AuthenticatedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    // </UserContext.Provider>
  );
}

export default App;
