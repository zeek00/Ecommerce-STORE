import {React, useEffect} from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from '../components/Home/Header'
import Footer from '../components/Home/Footer'
import SignUp from '../components/UserActions/SignUp';
function App() {

  return (
    <Router>
      <Header />
      <main>
        <Routes>
        <Route path="/signup" element={ <SignUp/> } />
            
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
    
  );
}

export default App;
