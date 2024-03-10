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
import { selectCurrentUser, selectCount } from '../../features/selectors'
import { useSelector } from 'react-redux'

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const count = useSelector(selectCount);
  const userId = user ? user._id : null;
  const [isVisible, setIsVisible] = useState(false);

  console.log(count);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 999);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(null);
  
console.log(cartCount)
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setIsVisible(scrollY > documentHeight - windowHeight - 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(()=> {
    setCartCount(count);

  }, [count])

  const handleOpen = ()=>{
    setSearchOpen(!searchOpen)
    setTimeout(()=>{
      setSearchOpen(false)
    }, 7000)
  }

  const handleUserOpen = ()=>{
    setUserMenuOpen(!userMenuOpen)
    scrollToTop()
    setTimeout(()=>{
      setUserMenuOpen(false)
    }, 4000)
  }

  const handleLIikedClick = ()=>{
    scrollToTop()
    if (user) navigate(`${PostsRoutes.products.likedItems()}/${userId}`);
    
  }

  const handleCartClick = ()=>{
    scrollToTop()
    if (user) navigate(`${PostsRoutes.products.cart()}`);
    
  }
 


  return (
    <>
      <div className={style.header}>
        {isMobile && <Burger />}
        <Link className={style.logo} to={PostsRoutes.home.root()}>SHOOPP</Link>
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
          <Link onClick={handleLIikedClick} to={PostsRoutes.products.likedItems()} className={style.link}>
            <FaRegHeart className={style.icon}  />
          </Link>
          <Link onClick={handleCartClick} to={PostsRoutes.products.cart()} className={style.link}>
            <FiShoppingCart className={style.icon} />
            {
              cartCount && (
                <span className={style.count}>
                  {cartCount}
                </span>
              )   
            }
            
          </Link>
        </div>
      </div>
      <Search open={searchOpen} onClose={() => setSearchOpen(false)} />
      {userMenuOpen && <UserMenu isOpen={userMenuOpen} onClose={()=>setUserMenuOpen(!userMenuOpen)} />}

    </>
  )
}

export default Header;
