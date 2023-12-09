import React from "react";
import { Outlet } from "react-router-dom";
import styled from 'styled-components';
import HeaderWithConditionalRender from "./HeaderWithConditionalRender";
import FooterWithConditionalRender from "./FooterWithConditionalRender";

const Main = styled.main`
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
    &::-webkit-scrollbar {
        width: 0; /* Adjust as needed */
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
        </>
    )
}