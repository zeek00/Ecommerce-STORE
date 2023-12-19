import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Root from '../components/Home/Root';
import SignUp from '../components/UserActions/SignUp';
import SignIn from '../components/UserActions/SignIn';
import UserMenu from '../components/UserActions/UserMenu';
import PostsRoutes from './routes';
import SignAction from '../components/UserActions/SignAction';
import Home from '../components/Home/Home';
import LeftNav from '../components/essentials/LeftNav';
import SideMenu from '../components/UserActions/SideMenu';
import DataStore from '../api/dataStore';

function App() {
  return (
    <>
      <DataStore />
      <Router>
        <Routes>
          <Route path={`/${PostsRoutes.home.root()}`} element={<Root />} >
            <Route path={`/${PostsRoutes.home.root()}`} element={<Home/>}/>
          </Route>

          <Route  element={<LeftNav />}>
            <Route path={PostsRoutes.leftnav.men()} element={<SideMenu men={true} />} />
            <Route path={PostsRoutes.leftnav.women()} element={<SideMenu women={true}/>} />
          </Route>

          <Route path='/data'>
            {/* <Route path='data/clothing' element={<Clothing/>} /> */}

          </Route>

          <Route path={`/${PostsRoutes.signAction.root()}`} element={<SignAction />}>
            <Route path={PostsRoutes.signAction.signup()} element={<SignUp />} />
            <Route path={PostsRoutes.signAction.signin()} element={<SignIn />} />
          </Route>

        </Routes>
      </Router>
    </>
    
  );
}

export default App;
