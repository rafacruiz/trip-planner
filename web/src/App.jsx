
import { Routes, Route } from 'react-router';
import ScrollToTop from './components/trip-planner/utils/scrollToTop';
import { 
  DashboardPage, 
  ExploreTripsPage, 
  LoginPage, 
  NotFoundPage, 
  ProfilePage, 
  SignupPage, 
  TripInvitationPage, 
  TripSetupPage, 
  TripsFormPage, 
  TripsPage, 
  UserPage 
} from './pages';

import './App.css'

function App() {
  
  return (
    <>
      <ScrollToTop />

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

        <Route path='/trips/add'
          element={ <TripsFormPage /> } />

        <Route path='/trips/:tripId/setup'
          element={ <TripSetupPage /> } />

        <Route path='/invitations'
          element={ <TripInvitationPage />} />

        <Route path='*' 
          element={ <NotFoundPage /> } />
      </Routes>
    </>
  )
}

export default App
