import React, { useEffect } from 'react'
import Button from '../essentials/Button'
import { GiHeartMinus } from 'react-icons/gi'
import { selectCurrentUser, selectCart } from '../../features/selectors';
import { fetchUserCartAsync } from '../../features/cart/dataThunks';
import PostsRoutes from '../../app/routes';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { MdRemoveShoppingCart } from "react-icons/md";
import CartItems from './CartItems';
import { css } from '../../helpers/cssVariables';
import { useNavigate } from 'react-router-dom';



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
    .sitenav{
        padding: 0.8rem;
        display: flex;
        gap: 0.4rem;
    }
    .sitenav button{
        color: #222;
        font-weight: 200;
        border: none;
        cursor: pointer;
    }
    .sitenav button:hover{
        color: ${css.primarySharp};
        font-weight: 300;
        cursor: pointer;
    }
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
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const cart = useSelector(selectCart);
    let empty = cart.length === 0;
    
    const userId = user ? user._id : null;

    useEffect(()=>{
        const apiFetch = async () =>{
            try{
                if(userId){
                    await dispatch(fetchUserCartAsync(userId));
                }
    
            }catch(err){
                console.error('Failure');
    
            }

        }
        apiFetch();
    }, [userId, dispatch,  cart])

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
            {!user && !empty && <div className='sitenav'>
                <button onClick={()=>navigate(PostsRoutes.home.home())}> {'Home' }</button>

                <button onClick={()=>navigate(-1)}> {'< Go back' }</button>
             </div>}
            { user && !empty && <CartItems mainCart={cart} /> }
           
        </CartDiv> 
    );
}

export default Cart