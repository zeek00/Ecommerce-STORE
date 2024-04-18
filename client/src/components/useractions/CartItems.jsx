import React, {useCallback, useEffect, useState} from 'react'
import { IoTrashBin } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import Button from '../essentials/Button'
import styled from 'styled-components';
import { selectCurrentUser } from '../../features/selectors';

import { DeleteItemFromUserCartAsync } from '../../features/cart/dataThunks';


const Container = styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;
    padding: 1rem 0;

    .item{        
        height: 20vh;
        background:rgb(242,242,242);
        box-shadow: 0px 0px 1.7px 0px #dcd0a4;
        border-radius: 0.4rem;
        padding: 1rem 1rem;
        margin-bottom: 1.7rem;
        display: flex;
        gap: 2rem;
    }
    .summary{
        width: 28%;
        height: 25vh;
        background: rgb(242,242,242);
        box-shadow: 0px 0px 1.7px 0px #dcd0a4;
        border-radius: 0.4rem;
        padding: 1rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    
    .itemImage{
        outline: 1px solid rgba(0,0,0,0.2);
        width: 20%;
        border-radius: 0.4rem;
    }
    .itemImage img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .desc{
        display: flex;
        flex-direction: column;
        width: 70%
        
    }
    .desc p{
        color: #222;
    }
    .size{
        margin-top: auto;
    }
    .desc button{
        display: flex;
        width: 50%;
        padding: 0.4rem;
        background: #222;
        border-style: none;
        color: #fff;
        border-radius: 0.2rem;
        margin-top: auto;
        width: fit-content;
        cursor: pointer;
        
    }

    .total{
        display: flex;
        width: 12%;
        flex-direction: column;

    }
    .total p{
        align-self: flex-end;
        color: #222;
        font-size: 1rem;
    }
    .total .count{
        display: flex;
        justify-content: flex-end;
        margin-top: auto;
        height: 2vh;
        width: 100%;
        align-self: flex-end;

    }


    .count span{
        font-size: 0.9rem;
        padding: 0 0.3rem;
        font-weight: bolder;
    }

    .count button{
        background: #333;
        color: #fff;
        width: 35%;
        border-style: none;
        font-weight: bolder;
        cursor: pointer;
        border-radius: 0.2rem;

    }

    @media only screen and (max-width: 480px) {
        width: 95%;
        top: 3rem;
        height: 95vh;
        flex-direction: column;
        .summary{
            width: 100%;
        }
        
        
        
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) and (orientation: landscape) {
        height: 80vh;
        justify-content: space-between;

        .items{
            width: 70%;
        }
        

        
    }

    @media only screen and (min-width: 992px) and (max-width: 1024px)  {
        height: 80vh;
        justify-content: space-between;

        .items{
            width: 70%;        
        }
        .total .count{
            width: 80%;

        }
        .count button{
            width: 35%;

        }
        

    }
    
    @media only screen and (min-width: 1201px){
        height: 80vh;
        height: inherit;
        justify-content: space-between;
        
        .itemImage{
            width: 20%;
        }
        .desc button{
            width: fit-content;
            
        }
        .total p{
            font-size: 1.4rem;
        }
        .total .count{
            width: 70%;

        }  
        .count button{
            width: 35%;

        }


        
    }

`;



const CartItems = ({mainCart}) => {
    const [accumulated, setAccumulated] = useState({});
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const [total, setTotal] = useState(null);
    const [clicked, setClicked] = useState(false)
    const cart = mainCart;

    const handleRemoval = async (itemId) =>{
        try{
            dispatch(DeleteItemFromUserCartAsync({
                itemId: itemId,
                userId: user._id
            }))
        }catch(err){
            console.log(err);
        }
    }
    
    const handleIncrement = (itemId) => {
        setClicked(true);
        setAccumulated((prevCounts) => {
            const newCount = (prevCounts[itemId] || 1) + 1;
            return { ...prevCounts, [itemId]: newCount };
        });
    };
    

    const handleDecrement = (itemId) => {
        setClicked(true);
        setAccumulated((prevCounts) => {
            const newCount = Math.max(0, (prevCounts[itemId] || 1) - 1);
            if (newCount === 0) {
                try {
                    dispatch(DeleteItemFromUserCartAsync({
                        itemId: itemId,
                        userId: user._id
                    }));
                } catch (err) {
                    console.log(err);
                }
            }
            return { ...prevCounts, [itemId]: newCount };
        });
    };
    useEffect(() => {
        const initialAccumulated = {};
  
        cart.forEach((item) => {
          initialAccumulated[item.id] = 1;
        });
      
        setAccumulated(initialAccumulated);
      
        const initialTotal = cart.reduce((accumulator, currentItem) => {
          const itemPrice = currentItem.price ?? 0;
          return accumulator + itemPrice;
        }, 0);
      
        setTotal(initialTotal);
        
    }, [cart]);

    const calculateTotal = useCallback(() => {
        let updateTotal = 0;
        Object.keys(accumulated).forEach((itemId) => {
            const count = accumulated[itemId] || 0;
            const item = cart.find((item) => item.id === itemId);
            const price = item ? item.price : 0;
            updateTotal += count === 1 ? price : Math.max(0, count * price);
        });
        setTotal(updateTotal);
    }, [accumulated, cart, setTotal]);


    useEffect(() => {
    if (clicked) {
        calculateTotal();
        setClicked(false);
    }
    }, [clicked, calculateTotal]);

   

    const handleSubmit = () => {
    console.log('this is submit');
    };
    
  return (
    <Container>
            <div className="items">
                {mainCart.map(item=> (
                <div className="item" key={item.id}>
                    <span className="itemImage">
                        <img src={item.images[0]} alt="product item" />
                    </span>
                    <span className="desc">
                        <p>{item.title}</p>
                        {item.size && <p className='size'>{item.size}</p>}
                        <button onClick={()=>handleRemoval(item.id)}> <IoTrashBin/> Remove </button>
                    </span>
                    <span className="total">
                        <p>£{accumulated[item.id] ? accumulated[item.id] * item.price : item.price}</p>
                        <div className="count">
                            <button onClick={()=>handleDecrement(item.id)}>-</button>
                            <span>{accumulated[item.id] ? accumulated[item.id] : 1}</span>
                            <button onClick={()=>handleIncrement(item.id)}>+</button>
                        </div>   
                    </span>
                </div>
            )) }
            </div>
            
        
        <div className="summary">
            <h3>Cart Summary</h3>
            <h5>Subtotal: £{total}</h5>

            <Button
                width={'100%'}
                onClick={handleSubmit}
                label='Checkout'
            />
        </div>
    </Container>
           
  )
}

export default CartItems;