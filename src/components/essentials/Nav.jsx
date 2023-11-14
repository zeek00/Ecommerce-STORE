import React from 'react'
import { NavLink } from 'react-router-dom';
import style from '../../stylesheets/Nav.module.css'


const  Nav = ({name, to})=> {
    const btnStyles = {
        padding: '.rem auto',
        color: 'rgba(34, 34, 34)',
        textDecoration: 'none'

    }
  return (
    <NavLink to={to} className={style.nav} style={btnStyles}>{name}</NavLink>
  )
}

export default Nav