import React from 'react'
import style from '../../stylesheets/Box.module.css'

const ActionBox = (props)=> {
    const {backgroundColor, children} = props;
    const boxStyle = {
      backgroundColor: backgroundColor,
      margin: '0 auto'
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