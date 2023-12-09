import React from 'react'
import ActionBox from '../essentials/ActionBox'
import AuthForm from '../essentials/AuthForm';
import { Link } from 'react-router-dom';
import PostsRoutes from '../../app/routes'


const SignUp = ()=> {
    const p ={
        textAlign: 'center'
    }

    
    const signUpFields = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
    ];


  return (
    <>
    <ActionBox
    >
        <AuthForm 
            about={"Create your account to shop seamlessly"} 
            title="Sign Up" 
            fields={signUpFields} 
            closingAbout={"By signing up you accept our terms and conditions & privacy policy"}
            authType="signUp"
            />
            <br/>

            <p style={p}>Already have an account? <Link to={PostsRoutes.signAction.signin()}>Sign In</Link> </p>
            
    </ActionBox>
    </>
  )
}

export default SignUp