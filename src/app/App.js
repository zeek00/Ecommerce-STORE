import {React, useEffect} from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from '../components/Home/Header'
import Footer from '../components/Home/Footer'
import SignUp from '../components/UserActions/SignUp';
import SignIn from '../components/UserActions/SignIn';
import Home from '../components/Home/Home';
function App() {

  return (
    <Router>
      <Header />
      <main>
        <Routes>
        <Route path="/home" element={ <Home/> } />
        <Route path="/signup" element={ <SignUp/> } />
        <Route path="/signin" element={ <SignIn/> } />
        <Route path="/footer" element={ <Footer/> } />
            
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
    
  );
}

export default App;
