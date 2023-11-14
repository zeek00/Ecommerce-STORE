import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row-reverse;
  padding: 0;

  li {
    margin: 70px auto;
    width: 50%;
    
  }
  @media (min-width: 999px){
    li{
        display: none;
    }
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
    width: 330px;
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

const LeftNav = ({ open }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Ul open={open}>
      {/* Directly placing li elements inside the ul */}
      <li>
        <a onClick={() => handleNavigation('/home')} className="nav-link">
          Home
        </a>
      </li>

      <li>
        <a onClick={() => handleNavigation('/about')} className="nav-link">
          About
        </a>
      </li>

      <li>
        <a onClick={() => handleNavigation('/portfolio')} className="nav-link">
          Portfolio
        </a>
      </li>

      <li>
        <a onClick={() => handleNavigation('/contact')} className="nav-link">
          Contact
        </a>
      </li>
    </Ul>
  );
};

export default LeftNav;
