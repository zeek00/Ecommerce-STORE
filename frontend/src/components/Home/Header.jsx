import React,{useState, useEffect } from 'react';
import style from '../../stylesheets/Header.module.css';
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import Burger from '../essentials/Burger';
import Nav from '../essentials/Nav';
import { Link } from 'react-router-dom';
import Search from '../UserActions/Search';
import UserMenu from '../UserActions/UserMenu';
import PostsRoutes from '../../app/routes';

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 999);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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

  const handleOpen = ()=>{
    setSearchOpen(!searchOpen)
    setTimeout(()=>{
      setSearchOpen(false)
    }, 7000)
  }

  const handleUserOpen = ()=>{
    setUserMenuOpen(!userMenuOpen)
    setTimeout(()=>{
      setUserMenuOpen(false)
    }, 4000)
  }

  const handleKeyDown = (event) => {
    // Check if the Enter key is pressed (key code 13)
    if (event.keyCode === 13) {
      PostsRoutes.root();
    }
  };

  return (
    <>
      <div className={style.header}>
        {isMobile && <Burger />}
        <h3 onClick={() => PostsRoutes.root()} onKeyDown={handleKeyDown} tabIndex={0} role="button">SHOOPP</h3>
        <nav className={style.nav}>
          <Nav className={style.navItem} name={'Men'} />
          <Nav className={style.navItem} name={'Electronics'} />
          <Nav className={style.navItem} name={'Women'} />
        </nav>
        <div className={style.actionbtn}>
          <Link to className={style.link}>
            <FiSearch onClick={handleOpen} className={style.icon} />
          </Link>
          <Link to className={style.link}>
            <FaRegUser onClick={handleUserOpen} className={style.icon} />
          </Link>
          <Link to className={style.link}>
            <FaRegHeart className={style.icon} />
          </Link>
          <Link to className={style.link}>
            <FiShoppingCart className={style.icon} />
          </Link>
        </div>
      </div>
      <Search open={searchOpen} onClose={() => setSearchOpen(false)} />
      {userMenuOpen && <UserMenu isOpen={userMenuOpen} onClose={()=>setUserMenuOpen(!userMenuOpen)} />}

    </>
  )
}

export default Header;
