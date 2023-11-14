import React from 'react'
import Button from './Button';
import style from '../../stylesheets/Box.module.css'

const ActionBox = (props)=> {
    const {backgroundColor, title, describe} = props;
    const boxStyle = {
      backgroundColor: backgroundColor,
      border: '1px solid #fff',
      borderRadius:'0.7rem',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    }

  return (
    <div style={boxStyle} className={style.box}>
      <div className={style.innerBox}>
        <h3>{title}</h3>
        <p>{describe}</p>
      </div>
        
    </div>
  )
}

export default ActionBox