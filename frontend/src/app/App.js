import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Root from '../components/home/Root';
import SignUp from '../components/useractions/SignUp';
import SignIn from '../components/useractions/SignIn';
import PostsRoutes from './routes';
import SignAction from '../components/useractions/SignAction';
import Home from '../components/home/Home';
import DataStore from '../api/dataStore';
import Men from '../components/products/Men';
import Women from '../components/products/Women';
import Electronics from '../components/products/Electronics';
import LikedItems from '../components/useractions/LikedItems';
import FilteredProduct from '../components/products/FilteredProducts';

function App() {
  return (
    <>
      <DataStore />
      <Router>
        <Routes>

          <Route path={`/${PostsRoutes.home.root()}`} element={<Root />} >
            <Route path={`/${PostsRoutes.home.home()}`} element={<Home/>}/>
            <Route path={`/${PostsRoutes.products.male()}/*`} element={<Men/>}>
              <Route path={":category"} element={<FilteredProduct/>}/>
            </Route>
            <Route path={`/${PostsRoutes.products.female()}/*`} element={<Women />}>
              <Route path={":category"} element={<FilteredProduct/>}/>
            </Route>
            <Route path={`/${PostsRoutes.products.electronics()}/*`} element={<Electronics/>}>
              <Route path={":category"} element={<FilteredProduct/>}/>
            </Route>
            <Route path={`/${PostsRoutes.products.likedItems()}/`} element={<LikedItems />}>
              <Route path={`:userId`} element={<LikedItems />} />
            </Route>
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
