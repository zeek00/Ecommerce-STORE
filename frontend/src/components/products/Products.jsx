import React from 'react'
import style from '../../stylesheets/Products.module.css'
import { useSelector } from 'react-redux';
import { selectLoadingState, selectCurrentUser } from '../../features/selectors';
import Loading from '../home/loading/Loading';
import { Link} from 'react-router-dom';
import { IoHeartCircleSharp } from "react-icons/io5";
import FilteredProduct from './FilteredProducts';
import { useSavedItems } from './saveLikedHook';

const Products = ({subCategory, category, filteredCategory}) => {
    const loading = useSelector(selectLoadingState);
    const user = useSelector(selectCurrentUser);

    const { handleClick } = useSavedItems(user);


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