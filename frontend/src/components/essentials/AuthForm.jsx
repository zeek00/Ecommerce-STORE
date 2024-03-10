import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import style from '../../stylesheets/Form.module.css'
import PostsRoutes from '../../app/routes'
import Button from './Button';
import Loading from './Loading'
import { useNavigate } from 'react-router-dom';
import { selectSessionLoading, selectSessionError } from '../../features/selectors'
import { signInAsync, signUpAsync } from '../../features/session/dataThunks';
import Warning from './Warning';


const AuthForm = ({ about, closingAbout, title, fields, authType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionError = useSelector(selectSessionError);
  
  const sessionLoad = useSelector(selectSessionLoading);
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    // Show the fail message when a sign-up fails
    
    const timeoutId = setTimeout(() => {
      if(error){
        setError(null)
      }

    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    };

  }, [error]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Phone Validation
    if(name === 'phone'){
      if(value.length < 10 ){
        setError('Phone must be at least 10 digits.');
      } else {
        setError(null);
      }
    }
    // Password validation
    if (name === 'password') {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{10,}$/;

      if (!passwordRegex.test(value)) {
        setError('Password must be at least 8 characters and include a capiatal letter and at least one number.');
      } else {
        setError(null);
      }
    }
    
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const{name, email, phone, password} = formData;
    try{
      if(authType === 'signUp'){
        
        let result = await dispatch(
          signUpAsync({
            name,
            email,
            phone,
            password,
          })
        );
        if(signUpAsync.rejected.match(result)){
          setError(sessionError.message) 
        }
        if(signUpAsync.fulfilled.match(result)){
          setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
          navigate(PostsRoutes.signAction.signin());
        }
      }else if(authType === 'signIn'){
        let result = await dispatch(signInAsync({email, password}));
        if(signInAsync.rejected.match(result)){
          setError(sessionError.message) 
        }
        if (signInAsync.fulfilled.match(result)) {
          setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
          navigate(PostsRoutes.home.home());
        }
      }
    }catch(err){
      console.log(err)
    }
      
    
    
  };

  return (
    <>
    {
      sessionLoad ? <Loading/> : (
      <div className={style.form}>
        {error && <Warning bgColor={'rgba(255, 23, 55, 0.45)'} error={error}/>}
          <h2>{title}</h2>
          <p>{about}</p>
          <form onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div key={field.name}>
                <label className={style.label} htmlFor={field.name}>
                  {field.label}
                  {field.type === error && (
                    <>
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required={field.required}
                      />
                    </>
                  )}
                  {field.type !== error && (
                    <input
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
          {/* {console.log(userNow)} */}
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
