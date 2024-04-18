import React, {useState, useEffect} from 'react'
import { selectCurrentUser} from '../../features/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Button from '../essentials/Button';
import { GiHeartMinus } from "react-icons/gi";
import styled from 'styled-components';
import PostsRoutes from '../../app/routes';
import { PiTrash } from "react-icons/pi";
import { css } from '../../helpers/cssVariables';
import { DeleteItemFromUserLikesAsync, fetchUserLikesAsync } from '../../features/likes/dataThunks';



const Liked = styled.div`
    display: flex;
    justify-content: center;
    overflow: auto;
    gap: 0.9rem;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 1rem auto;
    height: 100vh;
    flex-direction: column;
    .container{
        display: flex;
        height: 100vh;
        flex-direction: column;
        align-items: center;
    }
    .strike{
        text-decoration: line-through;
    }
    .container h2 {
        color: #222;
        padding: 0.9rem 0;
    }
    .noUserBox{
        display: flex;
        gap: 1.4rem;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        text-align: center;
    }

    .img button{
        position: absolute;
        bottom: 0.7rem;
        right: 0.7rem;
        background: rgb(255,255,255, 0.6);
        display: flex;
        border-radius: 50%;
        padding: 0.4rem;
        cursor: pointer;
    }
    .img button:hover{
        background ${css.primary};
        transition: 0.3s ease;
    }
    .icon{
        font-size: 2rem;
        color: #222;
    }
    .userBox{
        display: flex;
        flex-flow: row wrap;
        width: auto;
        justify-content: center;
        gap: 1rem;
    }
    .item{
        display: flex;
        flex-direction: column;
        gap: 0.8rem;

    }
    .item .img{
        position: relative;
        object-fit: cover;
        
    }
    .img img{
        width: 240px;
        height: 240px;
    }
    .item p{
        color: #333;
        width: fit-content;
        text-transform: capitalize;
        font-weight: 600;
    }
    .select{
        width: 100%;
        padding: 0.9rem;
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
   

   
   

`;



const LikedItems = ()=> {
    const [, setClicked] = useState(false);
    const [data, setData] = useState([]);
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const userId = user ? user._id : null;

  
    useEffect(()=>{
        const apiFetch = async () =>{
            try{
                if(userId){
                    const savedItems =  await dispatch(fetchUserLikesAsync(userId));
                    setData(savedItems.payload);
                }
    
            }catch(err){
                console.error('Failure');
    
            }

        }
        apiFetch();
    }, [userId, dispatch])

    const handleButonClick = (e)=>{
        e.preventDefault();
        navigate('/' + e.target.value)
        setClicked(true) 
   }
    
    const handleClick = () => {
        navigate(PostsRoutes.signAction.signin());
    };
    
    const handleRemoval = async (itemId) =>{
        try {
            await dispatch(DeleteItemFromUserLikesAsync({
                itemId: itemId,
                userId: user._id
            }));
            // After successful deletion, re-fetch the liked items
            const updatedLikedItems = await dispatch(fetchUserLikesAsync(userId));
            setData(updatedLikedItems.payload);
        } catch (err) {
            console.error(err);
        }
    }


  return (

        <Liked>

            <div className='main'>
                {
                    user &&  data.length === 0 && 
                    (
                        <div className='noUserBox'>
                            <GiHeartMinus className='icon'/>
                            <h2>You have no Saved Items</h2>
                        </div>
                    )

                }

                {
                    user && data.length !== 0 &&
                    ( 
                        <div className="container">
                            <h2>Favourites</h2>   
                            <div className='userBox'>
                                {data.map(savedItem => (
                                    <div key ={savedItem.price} className='item'>
                                        <div className="img">
                                            <img src={savedItem.images[0]} alt="" />
                                            <button onClick={()=>handleRemoval(savedItem.id)}><PiTrash className='icon'/></button>
                                        </div>
                                        <p>{savedItem.title}</p>
                                        <p>£{savedItem.price}</p>
                                        <Button color='#fff' value={savedItem.title} onClick={handleButonClick}  padding='0.8rem' label='Buy' width='100%' borderRadius='0'/>
                                    </div>)
                                )}
                            </div>
                                
                        </div>
                    )
                    
                }
            
            </div>
        { 
            !user &&
            (
                <div className='noUserBox'>
                    <GiHeartMinus className='icon'/>
                    <h2>Logging to view</h2>  
                    <Button
                        onClick={handleClick}
                        borderRadius='0'
                        label='SIGN IN'
                        width='100%'
                    />
                </div>
            )
        }
    

        </Liked>
    );
};

export default LikedItems;
