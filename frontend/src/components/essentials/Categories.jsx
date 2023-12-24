import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const Category = styled.div`
    div{
        border: 1px solid #ccc;
        border-top: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .link{
        color: #333;
        border-radius: .7rem;
        font-size: .7rem;
        font-weight: 600;
        margin: 1rem 2rem 1rem 0;
        background-color: #d5d5d5;
        padding: .4rem;
    }

`;



const Categories = (props) => {

  const selectedCategory = props.selectedCategory 
  console.log(selectedCategory);
  return (
    <Category>
        {selectedCategory && (
            <div>
                {selectedCategory.map((item, index)=>(
                    <Link className='link' to={`/products/${props.category}/${item}`} key={index}>{item}</Link>
                ))}
            </div>
        )}
    </Category>
  )
}

export default Categories;