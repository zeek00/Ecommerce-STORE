import {React, useEffect} from 'react'
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from '../components/Home/Header'
import Footer from '../components/Home/Footer'
function App() {

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          
        </Routes>
      </main>
      <Footer />
    </Router>
    
  );
}

export default App;
