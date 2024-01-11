import React from 'react'
import { selectCurrentUser } from '../../features/selectors'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Button from '../essentials/Button';
import { GiHeartMinus } from "react-icons/gi";
import styled from 'styled-components';
import PostsRoutes from '../../app/routes';


const Liked = styled.div`

    display: flex;
    height: 80vh;
    justify-content: space-around;
    flex-direction: column;

    div{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        margin: 0 auto;
        padding: .7rem;
        text-align: center;
    }
    .icon{
        font-size: 2rem;
    }

`;



const LikedItems = ({savedItems})=> {
    console.log(savedItems);
    const user = useSelector(selectCurrentUser) !== null;
    console.log(user);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(PostsRoutes.signAction.signin());
    };
    // console.log(user)
  return (

        <Liked>
            {
                user ? 
                (<>
                    {
                        savedItems ? 
                            savedItems.map((savedItem) => (
                                <li key={savedItem.id}>{savedItem.title}</li>)
                            )
                        :
                        (<div>
                            <GiHeartMinus className='icon'/>
                            <h2>You have no Saved Items</h2>
                        </div>)

                    }
                
                </>)
                :
                (<div>
                    <GiHeartMinus className='icon'/>
                    <h2>Logging to view</h2>
                         
                    <Button
                        onClick={handleClick}
                        borderRadius='0'
                        label='SIGN IN'
                        width='100%'
                    />
                </div>)
            }

        </Liked>
    );
};

export default LikedItems;
