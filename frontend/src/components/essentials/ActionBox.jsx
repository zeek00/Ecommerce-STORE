import React from 'react'
import Button from './Button';
import style from '../../stylesheets/Box.module.css'

const ActionBox = (props)=> {
    const {backgroundColor, children} = props;
    const boxStyle = {
      backgroundColor: backgroundColor,
      margin: '2rem auto'
    }

  return (
    <div style={boxStyle} className={style.box}>
      <div className={style.innerBox}>
      {children}
      </div>
        
    </div>
  )
}

export default ActionBox