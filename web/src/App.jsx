
import { Routes, Route } from 'react-router';

import { Dashboard, LoginPage } from './pages';

import './App.css'


function App() {
  
  return (
    <>
      <Routes>
        <Route path='/login' 
          element={ <LoginPage /> } />

        <Route path='/' 
          element={ <Dashboard /> } />

      </Routes>
    </>
  )
}

export default App
