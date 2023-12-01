import React from 'react'
import { NavLink } from 'react-router-dom';
import style from '../../stylesheets/Nav.module.css'


const  Nav = ({type,name, to})=> {

    
  return (
    <NavLink to={to} className={style.nav}>{name}</NavLink>
  )
}

export default Nav