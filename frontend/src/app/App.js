import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Root from '../components/Home/Root';
import SignUp from '../components/UserActions/SignUp';
import SignIn from '../components/UserActions/SignIn';
import UserMenu from '../components/UserActions/UserMenu';
import PostsRoutes from './routes';
import SignAction from '../components/UserActions/SignAction';
import Home from '../components/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`/${PostsRoutes.root()}`} element={<Root />} >
          <Route path={`/${PostsRoutes.root()}`} element={<Home/>}/>
        </Route>

        <Route path={`/${PostsRoutes.signAction.root()}`} element={<SignAction />}>
          <Route path={PostsRoutes.signAction.signup()} element={<SignUp />} />
          <Route path={PostsRoutes.signAction.signin()} element={<SignIn />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
