import React from 'react'
import ActionBox from '../essentials/ActionBox'
import AuthForm from '../essentials/AuthForm';
import { Link } from 'react-router-dom';
import PostsRoutes from '../../app/routes';
import { getToken } from '../../helpers/helperFunctions';
import history from '../../helpers/history';
import { selectCurrentUserToken } from '../../features/selectors';
import { useSelector } from 'react-redux';

const SignIn = ({error})=> {
  const token = useSelector(selectCurrentUserToken)

    const p ={
      textAlign: 'center',
      color: '#333'
    }

    if(token || getToken()){
      history.push(PostsRoutes.home.root());
  }
    
    const signInFields = [
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
    ];


  return (
    <ActionBox>
      <AuthForm 
        error={error}
        about={"Sign in to shop seamlessly and get great deals"} 
        title="Sign In" 
        fields={signInFields} 
        closingAbout={"Forgot Password?"}
        authType="signIn"
      />
      <br/>
      <p style={p}>Don't have an account? <Link to={PostsRoutes.signAction.signup()}>Sign Up</Link> </p>
            
    </ActionBox>
  )
}

export default SignIn