import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PostsRoutes from '../../app/routes';
import { css } from '../../helpers/cssVariables';
import { selectMale, selectFemale, selectElectronics } from '../../features/selectors';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Categories from './Categories';
import { BsBoxSeam } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import { BiMessageSquareDots } from 'react-icons/bi';
import { MdOutlineHelpOutline } from "react-icons/md";


const Nav = styled.nav`
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    transition: transform 0.3s ease-in-out;

    .level{
      height: 5.7vh;
      background: ${css.primary};
    }
    
    nav{
      background-color: ${css.primary};
      width: 90%;
      display: flex;
      flex-direction: column;
      align-content: center;
    }
    .outer {
      width: 10%;
      height: 100vh;
      background: rgba(0,0,0,0.6);
    }
    .items{
      display: flex;
      width: 95%;
      margin: 0 auto;
      flex-direction: column;
      gap: 1rem;
    }
    .item{
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    
    .item button{
      background-color: rgb(242,242,242);
      width: 85%;
      font-size: 1.2rem;
      color: rgba(34, 34, 34);
      font-weight: 600;
      text-align: start;
      padding-left: 1rem;
      border: none;
  
    }
    .item button:hover{
      background-color: #dcd0a4;
  
    }
    .action {
      display: flex;
      flex-direction: column;
      justify-content: center; 
      align-items: center;     
      color: ${css.secondary}; 
      background-color: rgb(242,242,242);
      width: 15%;
    }

    .layerone{
      display: flex;
      height: 3rem;
      gap: 0.7rem;
    }
    .layertwo {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s ease-in-out;
    }
    
    .layertwo.visible {
      max-height: 500px;
      opacity: 0.8;
      transition: max-height 0.5s ease-in-out;
    }
    
    .layertwo .item {
      opacity: 0;
      transform: translateY(-20px);
      transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
    }
    
    .layertwo.visible .item {
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
    }
    
    .nav-link {
      color: #fff;
      cursor: pointer;
    }

    .nav-link:hover {
      background-color: #ff1737;
    }
    
  .assist{
    position: absolute;
    bottom: 0px;
    width: 90%;  
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .content {
    display: flex;
    background: rgb(242,242,242);
    width: 95%;
    margin: 0 auto;
    padding: 1rem;
    font-size: 1.4rem;
    color: #333;
  }

  .content:hover{
    color: rgb(234,227,201);
    cursor: pointer;
    font-weight: 600;
  }

  .content span {
    padding-left: 1rem;
    font-size: 1.2rem;
  }

  }
`;

const LeftNav = ({open, setOpen}) => {
  const navigate = useNavigate();
  const [men, setMen] = useState(false);
  const [women, setWomen] = useState(false);
  const [electronics, setElectronics] = useState(false);

  const male = useSelector(selectMale);
  const female = useSelector(selectFemale);
  const etronics = useSelector(selectElectronics);
  const maleCategories = male ? [...new Set(male.map(item => item.category))] : [];
  const femaleCategories = female ? [...new Set(female.map(item => item.category))] : [];
  const etronicsCategories = etronics ? [...new Set(etronics.map(item => item.category))] : [];


  const handleClick = (category) => {
    switch(category){
      case 'men':
        navigate(PostsRoutes.products.male());
        setOpen(false);
      break;
      case 'women':
        navigate(PostsRoutes.products.female());
        setOpen(false);
      break;
      case 'electronics':
        navigate(PostsRoutes.products.electronics());
        setOpen(false);
      break;
      default:
        navigate(PostsRoutes.home.root());
        setOpen(false);
      break;
    }
  }

  const handleArrowDownClick = (category) => {
    switch (category) {
      case 'men':
        setMen(!men);
        setWomen(false);
        setElectronics(false);
        break;
      case 'women':
        setMen(false);
        setWomen(!women);
        setElectronics(false);
        break;
      case 'electronics':
        setMen(false);
        setWomen(false);
        setElectronics(!electronics);
        break;
      default:
        setMen(false);
        setWomen(false);
        setElectronics(false);
      break;
    }
  };

  const handleArrowUpClick = (category) => {
    switch (category) {
      case 'men':
        setMen(false);
        break;
      case 'women':
        setWomen(false);
        break;
      case 'electronics':
        setElectronics(false);
        break;
      default:
        setMen(false);
        setWomen(false);
        setElectronics(false);
      break;
    }
  };


  const handleLayerClick = ()=>{
    setOpen(false)
  }



  

  return (
    <Nav open={open}>
      <nav>
        <div className="level"></div>
        <div className="items">
          <div className="item">
            <div className="layerone">
              <button name='men' tabIndex={0} onClick={()=> handleClick('men')}>
                MEN
              </button>

              <div className="action">
                { men ? <IoIosArrowUp onClick={()=> handleArrowUpClick()} /> :<IoIosArrowDown onClick={()=> handleArrowDownClick('men')}/>}
              </div> 
            </div>
            <div className={`layertwo ${men ? 'visible' : ''}`} onClick={()=>handleLayerClick()}>
             {men && <Categories link={'products/men/'} lnav={true} category={'men'} selectedCategory={maleCategories}/>}

            </div>
              
          </div>
          <div className="item">
            <div className="layerone">
              <button name='electronics' tabIndex={1} onClick={()=> handleClick('electronics')}>
                ELECTRONICS
              </button>  
              <div className="action">
                {electronics ? <IoIosArrowUp onClick={()=>handleArrowUpClick()} /> :<IoIosArrowDown onClick={()=> handleArrowDownClick('electronics')}/>}
              </div>
            </div>
            <div className={`layertwo ${electronics ? 'visible' : ''}`} onClick={()=>handleLayerClick()}>
              {electronics && <Categories link={'products/electronics/'} lnav={true} category={'electronics'} selectedCategory={etronicsCategories}/>}

            </div>
          </div>

          <div className="item">
            <div className="layerone">
              <button name='women' tabIndex={1} onClick={()=> handleClick('women')}>
                WOMEN
              </button> 
              <div className="action">
                {women ? <IoIosArrowUp onClick={()=>handleArrowUpClick()} /> :<IoIosArrowDown  onClick={()=> handleArrowDownClick('women')}/>}
              </div>
            </div>
            <div className={`layertwo ${women ? 'visible' : ''}`} onClick={()=>handleLayerClick()}>
              {women && <Categories link={'products/women/'}  lnav={true} category={'female'} selectedCategory={femaleCategories}/>}
            </div>
            
          </div>

        </div>
        <div className="assist">
          <Link onClick={()=>handleLayerClick()} to={PostsRoutes.coming()}>
            <div className="content">
              <MdOutlineHelpOutline />
              <span>Help</span>
            </div>
          </Link>
          <Link onClick={()=>handleLayerClick()} to={PostsRoutes.coming()}>
            <div className="content">
              <FaRegUser />
              <span>My Account</span>
            </div>
          </Link>
        <Link onClick={()=>handleLayerClick()} to={PostsRoutes.coming()}>  
          <div className="content">
            <BsBoxSeam />
            <span>My Orders</span>
          </div>
        </Link>
        <Link to={PostsRoutes.coming()}>
          <div className="content">
            <BiMessageSquareDots />
            <span>Contact Preferences</span>
          </div>
        </Link>
        </div>
      </nav> 
      <div className="outer"></div>
    </Nav>
  );
};

export default LeftNav;
