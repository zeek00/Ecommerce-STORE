import React, {useState, useEffect} from 'react'
import { selectCurrentUser } from '../../features/selectors'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Button from '../essentials/Button';
import { GiHeartMinus } from "react-icons/gi";
import styled from 'styled-components';
import PostsRoutes from '../../app/routes';
import DataManipulation from '../../helpers/dataManipulation';


const Liked = styled.div`
    display: flex;
    border: 1px solid green;
    overflow: auto;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    padding: 1rem auto;
    height: 100vh;
    justify-content: space-around;
    flex-direction: column;
    .noUserBox{
        display: flex;
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
        border-bottom: 1px solid #ccc;
    }.userBox img{
        object-fit: cover;
        width: 150px;
        height: 150px;
    }.userBox li{
        list-style-type: none;
        text-transform: uppercase;
        font-weight: 600;
    }

`;



const LikedItems = ()=> {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector(selectCurrentUser);

    useEffect(()=>{
        console.log('fetching')
        const fetchData = async () => {
            const d = new DataManipulation();
            if (user) {
              try {
                const savedItems = await d.getSavedItemsForUser(user._id, user.token);
                setData(savedItems);
              } catch (error) {
                console.error(`Error fetching saved items: ${error.message}`);
              } finally {
                setLoading(false);
              }
            }
        };
            fetchData();
           
    }, [user])
  
    console.log(data);
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(PostsRoutes.signAction.signin());
    };
  return (

        <Liked>
            {
                user ? 
                (<div className='main'>
                    {
                        data.length === 0 ? 
                            (<div className='noUserBox'>
                                <GiHeartMinus className='icon'/>
                                <h2>You have no Saved Items</h2>
                            </div>)

                        :
                        data.map(savedItem => (
                            <div className='userBox'>
                                <img src={savedItem.images[0]} alt="" />
                                <li key={savedItem.id}>{savedItem.title}</li>
                            </div>
                            )
                        )

                    }
                
                </div>)
                :
                (<div className='noUserBox'>
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
