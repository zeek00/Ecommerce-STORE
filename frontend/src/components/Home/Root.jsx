import React from "react";
import { Outlet } from "react-router-dom";
import styled from 'styled-components';
import HeaderWithConditionalRender from "./HeaderWithConditionalRender";
import FooterWithConditionalRender from "./FooterWithConditionalRender";
import GoToTopButton from "../essentials/GoToTop";

const Main = styled.main`
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
   
    @media only screen and (max-width: 480px) {
        margin-top: 3rem;
        
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) and (orientation: landscape) {
        margin-top: 4rem;
        
        
    }
    
    @media only screen and (min-width: 992px) and (max-width: 1024px)  {
        margin-top: 5rem;
        
        

    }
    @media only screen and (min-width: 1200px) {
        margin-top: 4rem;
    }
      
`;

export default function Root() {
    return (
        <>
            <HeaderWithConditionalRender/>
            <Main>
                <Outlet />
            </Main>
            <FooterWithConditionalRender/>
            <GoToTopButton />

        </>
    )
}