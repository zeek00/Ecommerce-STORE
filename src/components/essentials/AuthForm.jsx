import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import style from '../../stylesheets/Form.module.css'
import Button from './Button';
import {selectCurrentUser} from '../../features/selectors'

const AuthForm = ({ about, closingAbout, title, fields, onSubmit }) => {
  const dispatch = useDispatch();
  const userNow = useSelector(selectCurrentUser)
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const actionObject = onSubmit(formData);
    if (actionObject) {
      console.log(actionObject)
      dispatch(actionObject);
      setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
    } else {
      console.error('onSubmit did not return a valid action object');
    }
    
  };

  return (
    <div className={style.form}>
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
        label={title} 
        type={"submit"}/>

      </form>
      {console.log(userNow)}
    </div>
  );
};

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      required: PropTypes.bool,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AuthForm;
