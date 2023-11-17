import React from 'react'
import ActionBox from '../essentials/ActionBox'
import AuthForm from '../essentials/AuthForm';
import { Link } from 'react-router-dom';

const SignIn = ()=> {
    const p ={
        textAlign: 'center'
    }

    
    const signInFields = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
    ];


  return (
    <>
    <ActionBox>
        <AuthForm 
            about={"Sign in to shop seamlessly and get great deals"} 
            title="Sign In" 
            fields={signInFields} 
            closingAbout={"Forgot Password?"}
            authType="signIn"
            />
            <p style={p}>Don't have an account? <Link to='/signup'>Sign Up</Link> </p>
            
    </ActionBox>
    </>
  )
}

export default SignIn