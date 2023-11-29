import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import PostsRoutes from '../../app/routes';

const FooterWithConditionalRender = () => {
  const location = useLocation();

  // Check if the current location is the signAction route
  const isSignAction =
    location.pathname === PostsRoutes.signAction.root() || location.pathname === `${PostsRoutes.signAction.root()}/`;
    const isSignInAction =
    location.pathname === PostsRoutes.signAction.signin() || location.pathname === `${PostsRoutes.signAction.signin()}/`;
    const isSignUpAction =
    location.pathname === PostsRoutes.signAction.signup() || location.pathname === `${PostsRoutes.signAction.signup()}/`;

  // Conditionally render the Header component based on the route
  if(isSignAction){
    return null;
  }else if(isSignInAction){
    return null;
  }else if(isSignUpAction){
    return null;
  }else{
    return <Footer/>
  }
};

export default FooterWithConditionalRender;
