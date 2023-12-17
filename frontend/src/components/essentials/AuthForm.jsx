import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import style from '../../stylesheets/Form.module.css'
import styled from 'styled-components';
import PostsRoutes from '../../app/routes'
import Button from './Button';
import Loading from '../Loading/Loading'
import { useNavigate } from 'react-router-dom';
import {selectCurrentUser, selectFail, selectSessionLoading} from '../../features/selectors'
import { signInAsync, signUpAsync } from '../../features/session/sessionSlice';
import { CiWarning } from "react-icons/ci";

const failStyle = {
  display: 'flex', 
  backgroundColor: 'rgb(236,29,57, 0.6)',
  padding: '.7rem',
  color: 'rgba(34, 34, 34, 0.9)'
};

const Input = styled.input`
  background:  ${(props)=> (props.showFail ? 'rgb(236,29,57, 0.6)' : '')} 


`;

const AuthForm = ({ about, closingAbout, title, fields, authType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userNow = useSelector(selectCurrentUser);
  const userFail = useSelector(selectFail);
  const sessionLoad = useSelector(selectSessionLoading);
  const [showFail, setShowFail] = useState(false);
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  
  useEffect(() => {
    // Show the fail message when a sign-up fails
    if (authType === 'signIn' && userFail) {
      console.log(userFail);
      setShowFail(true);

      //Set a timeout to hide the fail message after a certain duration
      const timeoutId = setTimeout(() => {
        setShowFail(false)
      }, 9000); // Adjust the duration as needed

      // Cleanup the timeout to avoid memory leaks
      return () =>{ 
        clearTimeout(timeoutId);
      };
    }
  }, [authType, userFail]);

  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Password validation
    if (name === 'password') {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{10,}$/;

      if (!passwordRegex.test(value)) {
        setPasswordError('Password must be at least 10 characters and include letters and at least one number.');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const{name, email, phone, password} = formData;
    let actionResult;
    try {
      if(authType === 'signUp'){
        actionResult = await dispatch(
          signUpAsync({
            name,
            email,
            phone,
            password,
          })
        );
        if(signUpAsync.fulfilled.match(actionResult)){
          setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
          navigate(PostsRoutes.home.home());
        }

      
      }else if(authType === 'signIn'){
        console.log('we here')
        console.log(sessionLoad)
        actionResult = await dispatch(signInAsync({email, password}));
        if (signInAsync.fulfilled.match(actionResult)) {
          setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
          navigate(PostsRoutes.home.featured());
        }
      }
      // if(sessionLoad === false){
      //   setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
      //   // setShowFail(false);

      //   if (authType === 'signUp' && !userFail) {
      //     navigate(PostsRoutes.home.home());
      //   } else if (authType === 'signIn' && userFail === false ) {
      //     console.log('we here now')
      //     console.log(userFail)
      //     navigate(PostsRoutes.home.featured());
      //   }
      // } else {
      //   // If authentication was not successful, handle accordingly
      //   console.log('Authentication failed.');
      // }  

    }catch (error) {
      console.error('Error during form submission:', error);
    }
    
    
  };

  return (
    <>
    {
      sessionLoad ? <Loading/> : (<div className={style.form}>
        {showFail &&(<div style={failStyle}>
            <CiWarning/>
            <h5>Looks like either your name or password were incorrect. Wanna try again?</h5>
          </div>)}
          <h2>{title}</h2>
          <p>{about}</p>
          <form onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div key={field.name}>
                <label className={style.label} htmlFor={field.name}>
                  {field.label}
                  {field.type === 'password' && (
                    <>
                      <Input
                        showFail={showFail}
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required={field.required}
                      />
                      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    </>
                  )}
                  {field.type !== 'password' && (
                    <Input
                      showFail={showFail}
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      required={field.required}
                    />
                  )}
                </label>
                <br /> 
              </div>
              
            ))}
            <p>{closingAbout}</p>
            <Button
            borderRadius={'0'}
            width={'100%'}
            label={title} 
            padding={'.7rem'}
            backgroundColor={'#222'}
            type="submit"/>
          </form>
          {console.log(userNow)}
        </div>)
    }
     
    
    </>
    
  );
};

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  authType: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      required: PropTypes.bool,
    })
  ).isRequired,
};

export default AuthForm;
