import React,{useState, useEffect } from 'react';
import style from '../../stylesheets/Header.module.css';
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import Burger from '../essentials/Burger';
import Nav from '../essentials/Nav';
import { Link, useNavigate } from 'react-router-dom';
import UserMenu from '../useractions/UserMenu';
import PostsRoutes from '../../app/routes';
import { selectCurrentUser, selectCartCount, selectLikesCount } from '../../features/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { addfilterProducts } from '../../features/products/productsSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser)
  const cart = useSelector(selectCartCount);
  const likes = useSelector(selectLikesCount);
  const userId = user ? user._id : null;
  const [isVisible, setIsVisible] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("")

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 999);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(null);
  const [likedCount, setLikedCount] = useState(null);
  
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
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(()=> {
    setLikedCount(likes);

  }, [likes])
  
  useEffect(()=> {
    setCartCount(cart);

  }, [cart])

  
  const handleSearch = ()=>{
    setOpenSearch(!openSearch);
    if(!openSearch){
    setTimeout(() => {
      document.getElementById("search").focus();
    }, 0);
  }

  }



  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      dispatch(addfilterProducts(searchPhrase.toLowerCase()))
      setOpenSearch(!openSearch)
      navigate(`${PostsRoutes.products.products()}/${searchPhrase}`)
    }
  };

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
        {openSearch && <input
          className={`${style.search} ${style.slideIn}`}
          id='search'
          type='search' 
          placeholder='Search a category'
          onChange={(e)=>{setSearchPhrase(e.target.value.toLowerCase())}}
          onKeyDown={handleKeyPress}
          />}
          <Link className={style.link} aria-label="Search">
            <FiSearch onClick={handleSearch} className={style.icon}  />
          </Link>
          <Link className={style.link}aria-label="User Profile">
            <FaRegUser onClick={handleUserOpen} className={style.icon} />
          </Link>
          <Link onClick={handleLIikedClick} to={PostsRoutes.products.likedItems()} className={style.link} aria-label="Liked Items">
            <FaRegHeart className={style.icon}  />
            {
              likedCount === 0 ? (
                <>
                </>
              )   :
              (likedCount && <span className={style.count}>
                  {likedCount}
                </span>)
            }
          </Link>
          <Link onClick={handleCartClick} to={PostsRoutes.products.cart()} className={style.link} aria-label="Shopping Cart">
            <FiShoppingCart className={style.icon} />
            
            {
              cartCount === 0 ? (
                <>
                </>
              )   :
              (cartCount && <span className={style.count}>
                  {cartCount}
                </span>)
            }
            
          </Link>
          <Link className={style.link} aria-label="Online status">
            <span className={ user ? style.isloggedin : style.isloggedout } aria-hidden="true"></span>
          </Link>
        </div>
      </div>
      {userMenuOpen && <UserMenu isOpen={userMenuOpen} onClose={()=>setUserMenuOpen(!userMenuOpen)} />}

    </>
  )
}

export default Header;
