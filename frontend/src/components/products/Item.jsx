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
    margin: 0 auto;
    
    .select{
        width: 100%;
        padding: 0.9rem;
    }
    .image{
        object-fit: cover;
    }
    .image img{
        width: 280px;
        height: 400px;
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
        height: 95vh;
        width: 90%;
        flex-direction: column;
        gap: 0.9rem;
        .image{
            justify-content: center;
        }
        .image img{
            width: 300px;
            height: 300px;
        }
        .productInfo{
            gap: 1rem;
    
        }

      
        
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) and (orientation: landscape) {
        height: 80vh;
        width: 80%;
        .image img{
            width: 300px;
            height: 400px;
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
        height: 80vh;
        width: 80%;
        .image img{
            width: 500px;
            height: 600px;
        }
        .productInfo{
            padding: 0 0.7rem;
            max-width: 40%;
            gap: 1.2rem;
            align-content: center;
        }

    }
       
    @media only screen and (min-width: 1201px){
        height: 80vh;
        width: 70%;
        .image img{
            width: 500px;
            height: 600px;
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
                if(item.category === 'shirts' || item.category === 'dresses' || item.category === 'tops' ){
                    if(!size){
                        setError('Select a size');
                    }
                }else{
                    const { id, ...newItem } = item;
                    const updatedItem = {id: uuidv4(), ...newItem}
                    setData(updatedItem) 
                }
                if(size){
                    const { id, ...newItem } = item;
                    const updatedItem = {id: uuidv4(), size: size, ...newItem}
                    console.log(updatedItem)
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
    
    
    const handleSizeChange = (e)=>{
        e.preventDefault();
        console.log(e.target.value)
        setSize(e.target.value);
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
            {item.category === "shirts" || item.category === "dresses" || item.category === "tops" ? 
                <select id="size" className='select' onChange={handleSizeChange} name="size">
                    <option  defaultValue>Select Size</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select> 
                : 
                <span></span>
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