import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const StyledButton = styled.button`
  
  color: ${({ color }) => color ? color : '#fff'};
  width: ${({ width }) => width ?  width: 'fit-content'};
  background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : '#222'};
  font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : '500'};
  border-style: none;
  text-align: center;
  text-transform: ${({ textTransform }) => textTransform ? textTransform : 'capitalize'}; 
  cursor: pointer;
  margin: ${({ margin }) => margin ? margin : '0 auto'};
  box-shadow: ${({ shadow }) => shadow ? shadow : 'none'};
  border-radius: ${({ borderRadius }) => borderRadius ? borderRadius : '.7rem'};
  padding: ${({ padding }) => padding ? padding : '.5rem'};
  font-size: ${({ fontSize }) => fontSize ? fontSize : '.9rem'};
  /* Add more styles as needed */
  &:hover {
    background-color: #222;
    color: #dcd0a4;
    font-weight: 100;
    transition: 0.5s ease-in;


  }
  @media only screen and (min-width:480px) and (max-width: 700px) {
    padding: ${({ smPadding }) => smPadding ? smPadding : '.4rem'};

  }
`;



const Button = (props) => {
  const { type, label, to } = props;
  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate(to);
  }

  return (
    <StyledButton onClick={handleClick} href={props.href} type={type} {...props}>
      {label}
    </StyledButton>
  );
};

export default Button;
