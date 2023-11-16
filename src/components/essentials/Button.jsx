import React from 'react'
import styles from '../../stylesheets/Button.module.css'

const Button = (props)=> {
    const { type, label, color, backgroundColor, borderRadius, width } = props;
    const buttonStyle = {
        color: color || 'white',
        backgroundColor: backgroundColor || '#222',
        borderRadius: borderRadius || '.7rem',
        padding: '.7rem',
        width: width || '100%',
        fontSize: '.7rem'
        // Add more styles as needed
      };

  return (
    <button type={type} style={buttonStyle} className={styles.btn}>{label}</button>
  )
}

export default Button