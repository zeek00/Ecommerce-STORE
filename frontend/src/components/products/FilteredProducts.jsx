import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import style from '../../stylesheets/Products.module.css' 
import { selectCurrentUser } from '../../features/selectors';
import { IoHeartCircleSharp } from "react-icons/io5";
import { savedItemsAsync } from '../../features/session/sessionSlice';



const FilteredProduct = ({filterBy}) => {
  
    const user = useSelector(selectCurrentUser);
    const [savedItems, setSavedItems] = useState([]);

    const dispatch = useDispatch();

    useEffect(()=>{
        const intervalId = setInterval(() => {
            if (user && savedItems) {
                dispatch(savedItemsAsync(savedItems));
            }
        }, 20000);
      
        return () => clearInterval(intervalId);           
    }, [user, savedItems, dispatch])
    
   const handleClick = (item) => {
        const itemAlreadySaved = savedItems.find(savedItem => savedItem.id === item.id);
      
        if (!itemAlreadySaved && user) {
            const updatedSavedItems = [ ...savedItems, item];
            if(!updatedSavedItems.token && !updatedSavedItems.id){
                updatedSavedItems.token = user.token;
                updatedSavedItems.id = user._id;
            }
            setSavedItems(updatedSavedItems );
            console.log(updatedSavedItems)
        }
        
        
      
    }

  return ( 
        <>

            {filterBy ? (
                <div className={style.container}>
                    {filterBy.map(item=>(
                        <div className={style.items} key={item.id}>
                            
                            <div className={style.product}>
                                <img src={item.images[0]} alt="" />
                                <div>
                                    <Link className={style.title}>{item.title}</Link>
                                    <IoHeartCircleSharp onClick={()=>handleClick(item)} className={style.icon}/>
                                </div>
                            
                                <p>£{item.price}</p>
                            </div>

                        </div>
                    )) }

                </div>
            ) : <p> No category found with that title... </p>}
        </>
    );
}

export default FilteredProduct;