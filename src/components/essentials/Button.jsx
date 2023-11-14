import React from 'react'
import styles from '../../stylesheets/Button.module.css'

const Button = (props)=> {
    const { label, color, backgroundColor, borderRadius, width } = props;
    const buttonStyle = {
        color: color || 'white',
        backgroundColor: backgroundColor || 'blue',
        borderRadius: borderRadius || '1rem',
        padding: '.7rem',
        width: width || '30%',
        fontSize: '.7rem'
        // Add more styles as needed
      };

  return (
    <button style={buttonStyle} className={styles.btn}>{label}</button>
  )
}

export default Button