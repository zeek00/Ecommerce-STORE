import React from 'react';
import { CgSpinner } from 'react-icons/cg';
import styled from 'styled-components';

const Load = styled.div`
    height: 100vh;
  
    .logo {
        display: flex;
        justify-content: center;
        margin: 5rem auto;
        font-size: 5rem;
        color: #dcd0a4;
        border-radius: 50%;
        width: fit-content;
        pointer-events: none;
    }
    
    @media (prefers-reduced-motion: no-preference) {
        .logo {
        animation: logo-spin infinite 2s linear;
        }
    }

    
    @keyframes logo-spin {
        from {
        transform: rotate(0deg);
        }
        to {
        transform: rotate(360deg);
        }
    }
  
`;

const Loading = ()=> {

    return(
        <Load>
            <CgSpinner className="logo" alt="logo" />
        </Load>
    )
}

export default Loading;