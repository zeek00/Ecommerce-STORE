import React from 'react'
import styled from 'styled-components';
import Button from '../essentials/Button';
import PostsRoutes from '../../app/routes';

const Div = styled.div`
    position: relative; 
    display: flex;
    height: 100vh;
    width: 90%;
    margin: 0 auto;
    .sizes span{
        display: inline-flex;
        background-color: #333;
        align-items: center;
        justify-content: center;
        width: 1.4rem;
        height: 1.4rem;
        padding: 0.3rem;
        border-radius: 50%;
        margin: 0 0.3rem 0 0;
        font-size: 0.6rem;
        color: #fff;
    }
    .image{
        display: flex;
        height: fit-content;
    }
    
    .productInfo{
        display: flex;
        height: fit-content;
        flex-direction: column;
        border-radius: 0.8rem;

    }

    .productInfo h3{
        text-transform: capitalize;
        color: #333;
    }
     .productInfo p{
        color: #333;
    }
    @media only screen and (max-width: 480px) {
        top: 4rem;
        height: 95vh;

        flex-direction: column;
        gap: 0.9rem;
        .image{
            justify-content: center;
        }
        .productInfo{
            gap: 1rem;
    
        }

      
        
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) and (orientation: landscape) {
        top: 5rem;
        height: 70vh;
        .image img{
            width: 400px;
            height: 320px;
            object-fit: contain;
        }
        .productInfo{
            padding: 0.9rem;
            gap: 1.27rem;
            align-content: center;
        }
        .productInfo h3{
            font-size: 1.2rem;
        }
        .productInfo p{
            font-size: 0.8rem;
        }
        .productInfo  button{
            border-style: none;
            padding: 0.3rem;
            background: rgb(234,227,201);
        }
    }
    
    @media only screen and (min-width: 992px) {
        top: 5rem;
        height: 80vh;
        .image img{
            width: 800px;
            height: 400px;
            object-fit: contain;
        }
        .productInfo{
            width: 60%;
            padding: 2rem;
            gap: 1.2rem;
            align-content: center;
        }

    }
        
    
        
       
       

`;

const Item = ({item}) => {
    console.log(item)
  return (
    <Div>
        <div className="image">
            <img src={item.images[0]} alt="" />
        </div>
        <div className="productInfo">
            <h3>{item.title}</h3>
            <p>Category: {item.category}</p>
            <p>{item.description}</p>
           { item.category ===  "laptops" || item.category ===  "smartphones"
            ? (<span></span>) :  <div className='sizes'>
                <span>M</span>
                <span>L</span>
                <span>XL</span>
                <span>XXL</span>
            </div>}
            <p>£ {item.price}</p>

            <Button href={PostsRoutes.coming()} label="Buy" width="100%" borderRadius="0.2rem" backgroundColor="#d5d5d5" color="#333" />
            <Button label="Add to Cart" width="100%" borderRadius="0.2rem" backgroundColor="#dcd0a4" color="#333" />

        </div>
    </Div>
  )
}

export default Item