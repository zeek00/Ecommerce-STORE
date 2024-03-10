import React from 'react'
import styled from 'styled-components'
import { CiWarning } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";


const Warn = styled.h5`
    display: flex;
    justify-content: center;
    color: #000;
    font-size: 0.7rem;
    font-weight: 500;
    background-color: ${({bgColor})=> bgColor ? bgColor : 'transparent'};
    padding: 1rem;
    .font{
        margin-right: 0.2rem;
        font-size: 0.7rem;
        font-weight: bolder;
    }
    


`;
const Warning = ({error, success, bgColor}) => {
  return (
    <Warn bgColor={bgColor} >
      {
        error 
        && ( 
          <>
            <CiWarning className='font'/>
            {error}

          </>
        )
      }
      {
        success 
        && (
          <>
            <FaCheck className='font'/>
            {success}
          
          </>
        )
      }
    </Warn>
  )
}

export default Warning