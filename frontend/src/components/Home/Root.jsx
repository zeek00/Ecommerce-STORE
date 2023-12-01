import React from "react";
import { Outlet } from "react-router-dom";
import HeaderWithConditionalRender from "./HeaderWithConditionalRender";
import FooterWithConditionalRender from "./FooterWithConditionalRender";

const out = {
}

export default function Root() {
    return (
        <>
            <HeaderWithConditionalRender/>
            <main style={out}>
                <Outlet />
            </main>
            <FooterWithConditionalRender/>
        </>
    )
}