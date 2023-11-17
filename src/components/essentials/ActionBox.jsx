import React from 'react'
import Button from './Button';
import style from '../../stylesheets/Box.module.css'

const ActionBox = (props)=> {
    const {backgroundColor, title, describe,children} = props;
    const boxStyle = {
      backgroundColor: backgroundColor || 'rgb(234,227,201)',
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