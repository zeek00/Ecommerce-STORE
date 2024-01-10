import React, {useState} from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from '../../stylesheets/Products.module.css' 
import { selectCurrentUser } from '../../features/selectors';
import { IoHeartCircleSharp } from "react-icons/io5";
import LikedItems from '../useractions/LikedItems';
import PostsRoutes from '../../app/routes';



const FilteredProduct = ({filterBy}) => {
  
    console.log(filterBy);
    const [savedItems, setSavedItems] = useState([]);
    const user = useSelector(selectCurrentUser) !== null;

    const handleClick = (item) => {
        // Check if the item is already in the savedItems list
        if (!savedItems.some((savedItem) => savedItem.id === item.id)) {
            // If not, add it to the savedItems list
            setSavedItems((prevSavedItems) => [...prevSavedItems, item]);
            console.log(savedItems)
        }

};

  return ( 
        <>
            <Routes>
                <Route path={PostsRoutes.products.likedItems()} element={<LikedItems savedItems={savedItems} />} />
            </Routes>
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
                            <LikedItems savedItems={savedItems} />

                        </div>
                    )) }

                </div>
            ) : <p> No category found with that title... </p>}
        </>
    );
}

export default FilteredProduct;