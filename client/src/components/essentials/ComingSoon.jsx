import React from 'react'
import  Loading from './Loading'
import styled from 'styled-components'

const Div = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
h3{
    text-align: center;
    font-weight: 700;
    color: #333;
    margin-top: 0.5rem;
    text-transform: uppercase;
}
`;


function ComingSoon() {
  return (
    <Div>
        <Loading height="fit-content"/>
        <h3>Coming Soon</h3>    
    </Div>
  )
}

export default ComingSoon