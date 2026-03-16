
import { Routes, Route } from 'react-router';

import { DashboardPage, LoginPage, ProfileEditPage, ProfilePage, SignupPage, TripsPage } from './pages';

import './App.css'


function App() {
  
  return (
    <>
      <Routes>
        <Route path='/login' 
          element={ <LoginPage /> } />

        <Route path='/signup'
          element={ <SignupPage/> } />

        <Route path='/' 
          element={ <DashboardPage /> } />

        <Route path='/profile'
          element={ <ProfilePage /> } />

        <Route path='/profile/edit'
          element={ <ProfileEditPage/> } />
        
        <Route path='/trips/:tripId' 
          element={ <TripsPage /> } />
      </Routes>
    </>
  )
}

export default App
