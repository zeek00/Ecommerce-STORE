import React from 'react'
import styles from '../../stylesheets/Button.module.css'

const Button = (props)=> {
    const { label, color, backgroundColor } = props;
    const buttonStyle = {
        color: color || 'white',
        backgroundColor: backgroundColor || 'blue',
        // Add more styles as needed
      };

  return (
    <button style={buttonStyle} className={styles.btn}>{label}</button>
  )
}

export default Button