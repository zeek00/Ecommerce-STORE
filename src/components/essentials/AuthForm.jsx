import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import style from '../../stylesheets/Form.module.css'
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import {selectCurrentUser, selectFail} from '../../features/selectors'
import { signIn, signUp } from '../../features/session/sessionSlice';
import { CiWarning } from "react-icons/ci";

const failStyle = {
  display: 'flex', 
  backgroundColor: 'rgb(236,29,57, 0.6)',
  padding: '.7rem',
  color: 'rgba(34, 34, 34, 0.9)'
};

const AuthForm = ({ about, closingAbout, title, fields, authType }) => {
  const userFail = useSelector(selectFail);
  const [showFail, setShowFail] = useState(false);
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const dispatch = useDispatch();
  const userNow = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  useEffect(() => {
    // Show the fail message when a sign-up fails
    if (authType === 'signIn' && userFail) {
      console.log(userFail);
      setShowFail(true);

      // Set a timeout to hide the fail message after a certain duration
      const timeoutId = setTimeout(() => {
        setShowFail(false);
      }, 9000); // Adjust the duration as needed

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [authType, userFail]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const{name, email, phone, password} = formData;
    if(authType === 'signUp'){
      dispatch(
        signUp({
          name,
          email,
          phone,
          password,
        })
      );
      
    }else if(authType === 'signIn'){
      dispatch(signIn({name, password}));
    }
  
    //Reset form data
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));

    
  };

  return (
    <div className={style.form}>
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
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                required={field.required}
              />
            </label>
            <br /> 
          </div>
          
        ))}
        <p>{closingAbout}</p>
        <Button
        width={'100%'}
        label={title} 
        type="submit"/>
      </form>
      {console.log(userNow)}
    </div>
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
