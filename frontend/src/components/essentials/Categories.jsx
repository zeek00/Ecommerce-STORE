import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const Category = styled.div`
    width: 100%;
    div{
        border:  ${({lnav})=> lnav ? 'none': '1.4px solid #ccc'};
        border-top: none;
        display: flex;
        gap: 0.2rem;
        flex-direction: ${({lnav})=> lnav ? 'column': 'row'};
        justify-content: center;

    }
    .link{
        display: flex;
        width: ${({lnav})=> lnav ? '100%': 'auto'};
        color: #333;
        border-radius: ${({lnav})=> lnav ? '0': '.2rem'};
        font-size: .7rem;
        font-weight: 600;
        margin: ${({lnav})=> lnav ? '0': '1rem auto'};
        background-color: ${({lnav})=> lnav ? 'rgb(242,242,242)': '#d5d5d5'};
        padding: ${({lnav})=> lnav ? '1rem 0': '.4rem'};
        padding-left: ${({lnav})=> lnav ? '1rem': 'none'};

    }
    @media only screen and (min-width: 768px) and (max-width: 991px) {
        margin-top: 1rem;
    }
    @media only screen and (min-width: 1200px) {
        .link{
            margin: 1rem 2rem 1rem 0;

        }
    }
      


`;


const Categories = ({empty, lnav, link, selectedCategory}) => {
  return (
    <Category lnav={lnav}>
        {!empty && selectedCategory && (
            <div>
                {selectedCategory.map((item, index)=>(
                    <Link className='link' to={`${link ? link+''+item :item}`} key={index}>{item}</Link>
                ))}
            </div>
        )}
    </Category>
  )
}

export default Categories;