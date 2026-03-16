
import { Routes, Route } from 'react-router';

import { DashboardPage, LoginPage, SignupPage, TripsPage } from './pages';

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
        
        <Route path='/trips/:tripId' 
          element={ <TripsPage /> } />
      </Routes>
    </>
  )
}

export default App
