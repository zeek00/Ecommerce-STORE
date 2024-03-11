import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from '../../stylesheets/Products.module.css' 
import { selectCurrentUser } from '../../features/selectors';
import { IoHeartCircleSharp } from "react-icons/io5";
import { useSavedItems } from './saveLikedHook';



const FilteredProduct = ({filterBy}) => {
  
    const user = useSelector(selectCurrentUser);
    const { handleClick } = useSavedItems(user);

  return ( 
        <>

            {filterBy ? (
                <div className={style.container}>
                    {filterBy.map(item=>(
                        <div className={style.items} key={item.id}>
                            
                            <div className={style.product}>
                                <img src={item.images[0]} alt="" />
                                <div>
                                    <Link to={`/${item.title}`} className={style.title}>{item.title}</Link>
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