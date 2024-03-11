import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import Items from '../components/products/Items';
import ComingSoon from '../components/essentials/ComingSoon';
import { getProfile, getToken } from '../helpers/helperFunctions';
import { fetchUserDataAsync } from '../features/session/dataThunks';
import { selectCurrentUser } from '../features/selectors';
import Cart from '../components/useractions/Cart';


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  useEffect(() => {
    if(user){
      const accessToken = getToken();
      console.log(accessToken)
      const ud = getProfile();
      console.log(ud);
      if(accessToken){
        dispatch(fetchUserDataAsync());
      }

    }

    
  }, [user,dispatch]);

  return (
    <>
      <DataStore />
     
      <Routes>
        <Route path={`/${PostsRoutes.home.root()}`} element={<Root />} >
          <Route path={`/${PostsRoutes.home.root()}`} element={<Home/>}/>
          <Route path={`/${PostsRoutes.products.male()}/*`} element={<Men/>}>
            <Route path=":category" element={<FilteredProduct/>}/>


          </Route>
          <Route path={`/${PostsRoutes.products.female()}/*`} element={<Women />}>
            <Route path=":category" element={<FilteredProduct/>}/>


            
          </Route>
          <Route path={`/${PostsRoutes.products.electronics()}/*`} element={<Electronics/>}>
            <Route path=":category" element={<FilteredProduct/>}/>


          </Route>
          <Route path={`/${PostsRoutes.products.likedItems()}/`} element={<LikedItems />}>
            <Route path=":userId" element={<LikedItems />} />
          </Route>
          <Route path={`/${PostsRoutes.products.cart()}/`} element={<Cart/>}>
            <Route path=":userId" element={<Cart />} />
          </Route>
          <Route path=":itemName" element={<Items/>}/>
          <Route path={PostsRoutes.coming()} element={<ComingSoon/>} />
        </Route>


        <Route path={`/${PostsRoutes.signAction.root()}`} element={<SignAction />}>
          <Route path={PostsRoutes.signAction.signup()} element={<SignUp error={null} />} />
          <Route path={PostsRoutes.signAction.signin()} element={<SignIn error={null} />} />
        </Route>
      </Routes>
      
    </>
    
  );
}

export default App;
