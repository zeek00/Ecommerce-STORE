import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFemale, selectLaptops, selectMale, selectElectronics } from '../../features/selectors';
import { Outlet, useNavigate } from 'react-router-dom';
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
    left: 0
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

const LeftNav = ({open}) => {
  const navigate = useNavigate();
  const male = useSelector(selectMale);
  const female = useSelector(selectFemale);
  const electronics = useSelector(selectElectronics);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = {
    men: [...new Set(male.map(item => item.category))],
    women: [...new Set(female.map(item => item.category))],
    electronics: [...new Set(electronics.map(item => item.category))],
  };

  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCatClick = (category) =>{
    navigate(`/category/${category}`);
  }


  return (
    <Ul open={open}>
        <nav className={style.lnav}>
          <button name='men' tabIndex={0} onClick={()=> handleClick('men')}>
            MEN
          </button>
          <span>|</span>
          <button name='electronics' tabIndex={1} onClick={()=> handleClick('electronics')}>
            ELECTRONICS
          </button>  
          <span>|</span>
          <button name='women' tabIndex={1} onClick={()=> handleClick('women')}>
            WOMEN
          </button>
          
        </nav> 
        <div className={style.outlet}>
          {selectedCategory && (
            <ul>
              {categories[selectedCategory].map((item, index) => (
                <li onClick={()=>handleCatClick(item)} key={index}>{item}</li>
              ))}
            </ul>
          )}  
        </div>    
    </Ul>
  );
};

export default LeftNav;
