
import { Routes, Route } from 'react-router';

import { HomePage, LoginPage } from './pages';

import './App.css'


function App() {
  
  return (
    <>
      <Routes>
        <Route path='/login' 
          element={ <LoginPage /> } />

        <Route path='/' 
          element={ <HomePage /> } />

      </Routes>
    </>
  )
}

export default App
