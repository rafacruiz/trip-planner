
import { Routes, Route } from 'react-router';

import { DashboardPage, ExploreTripsPage, LoginPage, NotFoundPage, ProfilePage, SignupPage, TripsPage, UserPage } from './pages';

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
          element={ <ProfilePage/> } />

        <Route path='/user/:userId'
          element={ <UserPage /> } />

        <Route path='/trips'
          element={ <ExploreTripsPage /> } />
        
        <Route path='/trips/:tripId' 
          element={ <TripsPage /> } />

        <Route path='*' 
          element={ <NotFoundPage /> } />
      </Routes>
    </>
  )
}

export default App
