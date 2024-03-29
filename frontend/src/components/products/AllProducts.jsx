import React from 'react';
import { useSelector } from 'react-redux';
import style from '../../stylesheets/Products.module.css'
import Products from './Products';
import { selectFilteredProducts } from '../../features/selectors';
import {useParams } from "react-router-dom";
import styled from 'styled-components';

const StyledProducts = styled.div`
    height: 100vh;

    h2{
        text-transform: capitalize;
        text-align: center;
        margin: 1rem auto;

    }
    .error{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: inherit;
        
    }

    .error h2{
        text-transform: none;
    }
    ul{
        list-style-type: circle;
    }
    .error p{
        font-size: 1rem;
        font-weight: 500;
        text-align: center;
        color: crimson;
    }
    
`;

const AllProducts = ()=> {
    const products = useSelector(selectFilteredProducts);
    const {category} = useParams();
    const present = products.filter(item=>item.category === category);
  return (
    <StyledProducts>
        <h2>{present.length !== 0 && category}</h2>
        {present.length === 0 && 
        <div className='error'>
            <h2>Available categories are:</h2>
            <ul>
                <p>
                    Shirts
                    ,Dresses
                    ,Shoes
                    ,Watches
                    ,Tops
                    ,Smartphones
                    ,Laptops
                    ,Jewelries
                    ,Bags
                </p>
            </ul>
        </div>
        }
        {present && <Products subCategory={category} filteredCategory={products} category='male'/> }
    </StyledProducts>
  )
}

export default AllProducts;