import {React, useState, useEffect} from 'react';
import style from '../../stylesheets/Header.module.css';
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import Burger from '../essentials/Burger';
import Nav from '../essentials/Nav';
import { Link } from 'react-router-dom';

const Header= ()=> {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 999)
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 999);
        };

    // Attach the event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };

    }, []);
    
  return (
    <div  className={style.header}>
       {isMobile && <Burger />}
        <h3>SHOP</h3>
        <nav className={style.nav}>
            <Nav className={style.navItem} name={'Home'}/>
            <Nav className={style.navItem} name={'About'}/>
            <Nav className={style.navItem} name={'Products'}/>

        </nav>
        <div className={style.actionbtn}>
            <Link to>
                <FiSearch className={style.icon} />
            </Link>
            <Link to>
                <FaRegUser className={style.icon} />
            </Link>
            <Link to>
                <FaRegHeart className={style.icon} />
            </Link>
            <Link to>
                <FiShoppingCart className={style.icon} />
            </Link>
            
        </div>
    </div>
  )
}

export default Header