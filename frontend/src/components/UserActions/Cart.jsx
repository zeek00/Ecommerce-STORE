import React, { useEffect, useState } from 'react'
import Button from '../essentials/Button'
import { GiHeartMinus } from 'react-icons/gi'
import { selectCurrentUser, selectCart } from '../../features/selectors';
import { fetchUserCartAsync } from '../../features/cart/dataThunks';
import PostsRoutes from '../../app/routes';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { MdRemoveShoppingCart } from "react-icons/md";
import CartItems from './CartItems';



const CartDiv = styled.div`
    display: flex;
    overflow: auto;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 1rem auto;
    height: 100vh;
    justify-content: ${(user)=> !user ? 'start' : 'center'};
    flex-direction: column;
    .noUserBox{
        display: flex;
        justify-content: center;
        gap: 1.4rem;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        text-align: center;
    }
    .icon{
        font-size: 2rem;
    }
    .userBox{
        display: flex;
        margin-left: 1rem;
        flex-direction: column;
    }.userBox img{
        object-fit: cover;
        width: 150px;
        height: 150px;
    }.userBox li{
        list-style-type: none;
        text-transform: uppercase;
        font-weight: 600;

    }.userBox p{
        color: #333;
        font-weight: 600;
    }
    ::-webkit-scrollbar{
        width: 0.2rem;
    }
    ::-webkit-scrollbar-track{
    background: rgba(234,227,201, 0.5);
    }
    ::-webkit-scrollbar-thumb{
    background: #dcd0a4;
    }
    ::-webkit-scrollbar-thumb:hover{
    background: #dcd0a4;
    }

    @media only screen and (max-width: 480px) {
       
        
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) and (orientation: landscape) {
        
    }    
    @media only screen and (min-width: 992px) and (max-width: 1024px)  {
        

    }
       
    @media only screen and (min-width: 1201px){        
        .items{
            width: 70%;
        }
        
    }

`;




const Cart = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const cart = useSelector(selectCart);
    let empty = cart.length === 0;
    
    const userId = user ? user._id : null;

    useEffect(()=>{
        const apiFetch = async () =>{
            try{
                if(userId){
                    let result = await dispatch(fetchUserCartAsync(userId));
                    if (fetchUserCartAsync.fulfilled.match(result)) {
                        console.log(cart)
                    }
    
                }
    
            }catch(err){
                console.log('it failed');
    
            }

        }
        apiFetch();
    }, [userId])

  return (
        <CartDiv user={user}>
            {!user && (
            <div className='noUserBox'>
                <GiHeartMinus className='icon'/>
                <h2>Logging to view</h2>  
                <Button
                    to={PostsRoutes.signAction.signin()}
                    borderRadius='0'
                    label='SIGN IN'
                    width='100%'
                />
            </div>)} 

            {user && empty && (
                <div className='noUserBox'>
                <MdRemoveShoppingCart className='icon'/>
                <h2>Your Cart is Empty</h2>  
                <Button
                    to={'../' + PostsRoutes.products.likedItems()}
                    borderRadius='0'
                    label='VIEW SAVED ITEMS'
                    width='100%'
                />
            </div>
            )}

            { user && !empty && <CartItems mainCart={cart} /> }
           
        </CartDiv> 
    );
}

export default Cart