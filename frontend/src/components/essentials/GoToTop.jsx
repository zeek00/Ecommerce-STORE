import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleUp } from "react-icons/fa";
import styled from 'styled-components';


const Top = styled.div`
  .go-to-top-button{
    position: absolute;
    bottom: -230px;
    font-size: 2.1rem;
    color: #222;
    right: 1.7rem; 
    transition: bottom 0.7s ease-out;
    cursor: pointer;
  }
  .go-to-top-button.visible {
    bottom: -190px; /* Slide in when visible */
  }

  .go-to-top-button:hover {
    color: #dcd0a4;
    background-color: #333;
    border-radius: 50%;
    border-style: none;
    transition: 0.3s ease;

  }
  @media only screen and (max-width: 480px) {
    .go-to-top-button{
      bottom: -90px;
    }
    .go-to-top-button.visible {
      bottom: -40px; /* Slide in when visible */
    }
  }

  @media only screen and (min-width: 480px) and (max-width: 768px) {
    .go-to-top-button{
      bottom: -90px;
    }
    .go-to-top-button.visible {
      bottom: -40px; /* Slide in when visible */
    }
  }

`;




const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <Top>
        <FaArrowAltCircleUp
        className={`go-to-top-button ${isVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        />
    </Top>
  );
};


export default GoToTopButton;
