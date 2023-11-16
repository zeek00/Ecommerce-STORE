import React from 'react'
import ActionBox from '../essentials/ActionBox'
import AuthForm from '../essentials/AuthForm';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../features/session/sessionSlice';

const SignUp = ()=> {
    const p ={
        textAlign: 'center'
    }
    
    const handleSignUp = (formData) => {
        // Dispatch your sign-up action or perform other actions with the form data
        return {
            type: 'signUp',
            payload:formData
        };
    };
    
    const signUpFields = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
    ];


  return (
    <>
    <ActionBox
       title={'Sign up'}
       describe={'Create your account to shop seamlessly'}
    >
        <AuthForm 
            about={"Create your account to shop seamlessly"} 
            title="Sign Up" 
            fields={signUpFields} 
            onSubmit={handleSignUp}
            closingAbout={"By signing up you accept our terms and conditions & privacy policy"}
            />
            <p style={p}>Already have an account? <Link>Sign In</Link> </p>
            
    </ActionBox>
    </>
  )
}

export default SignUp