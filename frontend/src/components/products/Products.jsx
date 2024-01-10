import React, { useState } from 'react'
import style from '../../stylesheets/Products.module.css'
import { useSelector } from 'react-redux';
import { selectLoadingState, selectCurrentUser } from '../../features/selectors';
import Loading from '../loading/Loading';
import { Link, Routes, Route } from 'react-router-dom';
import { IoHeartCircleSharp } from "react-icons/io5";
import LikedItems from '../useractions/LikedItems';
import FilteredProduct from './FilteredProducts';
import PostsRoutes from '../../app/routes';


const Products = ({subCategory, category, filteredCategory}) => {
    const loading = useSelector(selectLoadingState);
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

    let categoryName;

    switch (category) {
        case 'male':
            categoryName = 'Male Products';
        break;
        case 'female':
            categoryName = 'Female Products';
        break;
        case 'electronics':
            categoryName = 'Electronics';
        break;
        default:
            categoryName = 'Unknown Category';
        break;
    }

    return (
        <>
            <Routes>
                <Route path={PostsRoutes.products.likedItems()} element={<LikedItems savedItems={savedItems} />} />
            </Routes>
            { loading ? (<Loading />) :
                (
                    subCategory ?(<FilteredProduct filterBy={filteredCategory}/>): (
                        <div className={style.container}>
                            {filteredCategory.map(item=>(
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

                        
                        
                    )

                    
                )
                
            }
            
            
        </>
    );
}

export default Products