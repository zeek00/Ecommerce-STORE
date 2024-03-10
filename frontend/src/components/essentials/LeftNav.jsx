import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import style from '../../stylesheets/Nav.module.css'
import PostsRoutes from '../../app/routes';

const Ul = styled.ul`

  list-style: none;
  display: flex;
  flex-flow: row-reverse;
  padding: 0;
  height: 100vh;

 
  @media (min-width: 999px){
    display: none;
    
  }

  @media (max-width: 999px) {
    flex-flow: column nowrap;
    background-color: #fff;
    border-right: 1px solid rgb(234,227,201);
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    top: 0;
    left: 0;
    height: 100vh;
    width: 90%;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    .nav-link {
      color: #fff;
      cursor: pointer;
    }

    .nav-link:hover {
      background-color: #ff1737;
    }
  }
`;

const LeftNav = ({open, setOpen}) => {
  const navigate = useNavigate();
  

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
  };

  

  return (
    <Ul open={open}>
        <nav className={style.lnav}>
          <button name='men' tabIndex={0} onClick={()=> handleClick('men')}>
            MEN
          </button>
          <button name='electronics' tabIndex={1} onClick={()=> handleClick('electronics')}>
            ELECTRONICS
          </button>  
          <button name='women' tabIndex={1} onClick={()=> handleClick('women')}>
            WOMEN
          </button>
          
        </nav> 
        
    </Ul>
  );
};

export default LeftNav;
