
import { Routes, Route } from 'react-router';

import { DashboardPage, LoginPage, SignupPage } from './pages';

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
      </Routes>
    </>
  )
}

export default App
