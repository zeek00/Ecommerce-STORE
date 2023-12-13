import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  color: ${({ color }) => color ? color : '#fff'};
  width: ${({ width }) => width};
  background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : '#222'};
  border-style: none;
  cursor: pointer;
  border-radius: ${({ borderRadius }) => borderRadius ? borderRadius : '.7rem'};
  padding: .7rem;
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
    <StyledButton type={type} {...props}>
      {label}
    </StyledButton>
  );
};

export default Button;
