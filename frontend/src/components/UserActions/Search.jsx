import React, { useRef } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

const Div = styled.div`
    background: rgba(34, 34, 34, 0.8);
    position: absolute;
    width: 100%;
    top:4rem;
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    padding: 0.4rem;

    div {
        display: flex;
        padding: 0.3rem;
        border-radius: 3rem;
        width: 40%;
        align-items: center;
        border: 1px solid rgba(223, 223, 223);
    }

    div input {
        width: 100%;
        padding-left: 0.7rem;
        background none;
        border: none;
        /* Add styling for focus to make it accessible */
        // border: 2px solid #007bff; /* Example border color for focus */
        // border-radius: 3px; /* Example border radius for focus */
    }

    div input::placeholder {
        color: gray;
        font-size: 1rem;
    }div input:focus {
        outline: none;
        color: gray;
        font-size: 1rem;
    }


    .search {
        font-size: 1.9rem;
        color: rgba(223, 223, 223);
    }

    @media only screen and (max-width: 480px) {
        /* Styles for small screens */
        div {
            width: 80%;
        }
    }
`;

const Search = ({ open }) => {
    
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    
    return (
        <Div isOpen={open} ref={searchRef}>
            <div>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for items"
                    name=""
                    id=""
                    aria-label="Search items"
                />
                <FiSearch className="search" />
            </div>
        </Div>
    );
};

export default Search;
