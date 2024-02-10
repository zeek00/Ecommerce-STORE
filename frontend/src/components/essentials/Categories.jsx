import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const Category = styled.div`
    div{
        border: 1.4px solid #dcd0a4;
        border-top: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .link{
        color: #333;
        border-radius: .2rem;
        font-size: .7rem;
        font-weight: 600;
        margin: 1rem 2rem 1rem 0;
        background-color: #d5d5d5;
        padding: .4rem;
    }
    @media only screen and (min-width: 768px) and (max-width: 991px) {
        margin-top: 1rem;
    }


`;



const Categories = ({selectedCategory}) => {

  return (
    <Category>
        {selectedCategory && (
            <div>
                {selectedCategory.map((item, index)=>(
                    <Link className='link' to={`${item}`} key={index}>{item}</Link>
                ))}
            </div>
        )}
    </Category>
  )
}

export default Categories;