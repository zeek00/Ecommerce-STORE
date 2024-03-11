import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Button from '../essentials/Button';
import PostsRoutes from '../../app/routes';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, selectCartError } from '../../features/selectors';
import { AddItemToUserCartAsync } from '../../features/cart/dataThunks';
import Warning from '../essentials/Warning';
import { v4 as uuidv4 } from 'uuid';

const Div = styled.div`
    position: relative; 
    height: 100vh;
    display: flex;
    width: 50%;
    margin: 0 auto;
    
    .sizes span{
        display: inline-flex;
        background-color: #333;
        cursor: pointer;
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
    .sizes span:active{
        background-color: rgb(234,227,201); 
    }
    .image{
        display: flex;
        height: fit-content;

    }
    .image img{
        width: auto;
        object-fit: cover;
    }
    
    .productInfo{
        display: flex;
        height: auto;
        flex-direction: column;

    }

    .productInfo h3{
        text-transform: capitalize;
        color: #333;
    }
     .productInfo p{
        color: #333;
    }
   
    .signin{
        text-decoration: underline;
        color: #dcd0a4;
    }
    @media only screen and (max-width: 480px) {
        top: 4rem;
        height: 95vh;
        width: 90%;

        flex-direction: column;
        gap: 0.9rem;
        .image{
            overflow: auto;
            justify-content: center;
        }
        .productInfo{
            gap: 1rem;
    
        }

      
        
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) and (orientation: landscape) {
        top: 5rem;
        height: 80vh;
        .container{
            display: flex;
        }
        .image{
            display: flex;
            justify-content: center;
            overflow: auto;
        }
        .image img{
            min-height: 50vh;
        }
        .productInfo{
            padding: 0 0.9rem;
            gap: 1.27rem;
            align-content: center;
            height: 100vh;
            overflow: scroll;
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
    
    @media only screen and (min-width: 992px) and (max-width: 1024px)  {
        top: 5rem;
        height: 80vh;
        .image{
            display: flex;
            justify-content: center;
            overflow: auto;
        }
        .image img{
            min-height: 60vh;
        }
        .productInfo{
            padding: 0 0.7rem;
            max-width: 40%;
            gap: 1.2rem;
            align-content: center;
        }

    }
       
    @media only screen and (min-width: 1201px){
        top: 5rem;
        height: 80vh;
        .image{
            display: flex;
            justify-content: center;
            // overflow: auto;
        }
        .image img{
            min-height: 60vh;
        }
        .productInfo{
            padding: 0 2rem;
            gap: 1.2rem;
            align-content: center;
        }
    }
    
        
       
       

`;

const Item = ({item}) => {
    const [size, setSize] = useState(null);
    const [clicked, setClicked] = useState(false);
    const user = useSelector(selectCurrentUser)
    const cartError = useSelector(selectCartError);
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [data, setData] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
             setError('Actions Requires a signed in user');
        }
            
        if(user){
            if(clicked){
                if(item.category !== 'smartphones' && !size){
                    setError('Select a size');
                }
                if(size){
                    const { id, ...newItem } = item;
                    const updatedItem = {id: uuidv4(), size: size, ...newItem}
                    setData(updatedItem)                    
                }
            }
        }
    }, [size, clicked, user, item]);

    useEffect(()=>{
        const apiCall = async () =>{
            try {
                if(data){
                    let result = await dispatch(AddItemToUserCartAsync({
                        id: user._id,
                        items: data
                    }));
                    if (AddItemToUserCartAsync.fulfilled.match(result)) {
                        setSuccess(result.payload.message);
                    }
                } 
            } catch (error) {
                setError(cartError.message);
            }
        }
        apiCall();
    }, [data, user])

    useEffect(() => {
        // Check for success or error messages
        const timeoutId = setTimeout(() => {
            
            if(error){
              setError(null);
            }
            if(success){
                setSuccess(null);
            }
      
          }, 5000);
      
          return () => {
            clearTimeout(timeoutId);
          };
    }, [error, success]);
    
    
    const handleSizeClick = (e)=>{
        e.preventDefault();    
        const value = e.target.getAttribute('data-value');
        setSize(value);
        setError(null);

    
    }
    
    const handleButonClick = ()=>{
        setClicked(true) 
    }

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
                ? (<span></span>) :  
                <div className='sizes'>
                    <span value='M' className='size' data-value="M" onClick={handleSizeClick}>M</span>
                    <span className='size' data-value="L" onClick={handleSizeClick}>L</span>
                    <span className='size' data-value="XL" onClick={handleSizeClick}>XL</span>
                    <span className='size' data-value="XXL" onClick={handleSizeClick}>XXL</span>
                </div>  
            }
            <p>£ {item.price}</p>
            <form action={PostsRoutes.coming()}>
                <Button type="submit" label="Buy" width="100%" borderRadius="0.2rem" backgroundColor="#d5d5d5" color="#333" />
            </form>
            <Button onClick={handleButonClick} label="Add to Cart" width="100%" borderRadius="0.2rem" backgroundColor="#dcd0a4" color="#333" />
            {error && <Warning bgColor={'rgba(255, 23, 55, 0.45)'} error={error}/>} 
            {success && <Warning bgColor={'rgb(110,185,117)'} success={success}/>}

        </div>
    </Div>
  )
}

export default Item;