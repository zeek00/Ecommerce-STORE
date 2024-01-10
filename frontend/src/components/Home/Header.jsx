import React,{useState, useEffect } from 'react';
import style from '../../stylesheets/Header.module.css';
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import Burger from '../essentials/Burger';
import Nav from '../essentials/Nav';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../useractions/Search';
import UserMenu from '../useractions/UserMenu';
import PostsRoutes from '../../app/routes';

const Header = () => {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 999);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [count, setCount] = useState(null);

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
      PostsRoutes.home.root();
    }
  };


  return (
    <>
      <div className={style.header}>
        {isMobile && <Burger />}
        <h3 onClick={() => navigate(PostsRoutes.home.home())} onKeyDown={handleKeyDown} tabIndex={0} role="button">SHOOPP</h3>
        <nav className={style.nav}>
          <Nav to={PostsRoutes.products.male()} className={style.navItem} name={'Men'} />
          <Nav to={PostsRoutes.products.electronics()} className={style.navItem} name={'Electronics'} />
          <Nav to={PostsRoutes.products.female()} className={style.navItem} name={'Women'} />
        </nav>
        <div className={style.actionbtn}>
          <Link to className={style.link}>
            <FiSearch onClick={handleOpen} className={style.icon}  />
          </Link>
          <Link to className={style.link}>
            <FaRegUser onClick={handleUserOpen} className={style.icon}   />
          </Link>
          <Link to={PostsRoutes.products.likedItems()} className={style.link}>
            <FaRegHeart className={style.heart}  />
            <p className={style.count}>{count}</p>
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
