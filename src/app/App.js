import {React, useEffect} from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from '../components/Home/Header'
import Footer from '../components/Home/Footer'
import SignUp from '../components/UserActions/SignUp';
import SignIn from '../components/UserActions/SignIn';
function App() {

  return (
    <Router>
      <Header />
      <main>
        <Routes>
        <Route path="/signup" element={ <SignUp/> } />
        <Route path="/signin" element={ <SignIn/> } />
            
        </Routes>
      </main>
      <Footer />
    </Router>
    
  );
}

export default App;
