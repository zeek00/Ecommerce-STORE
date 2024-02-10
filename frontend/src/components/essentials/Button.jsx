import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.a`
  
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
  padding: ${({ padding }) => padding ? padding : '.7rem'};
  font-size: ${({ fontSize }) => fontSize ? fontSize : '.9rem'};
  /* Add more styles as needed */
  &:hover {
    background-color: #dcd0a4;
    font-weight: 800;
    transition: 0.3s ease;


  }
`;

const Button = (props) => {
  const { type, label } = props;

  return (
    <StyledButton href={props.href} type={type} {...props}>
      {label}
    </StyledButton>
  );
};

export default Button;
