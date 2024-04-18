import React from 'react'
import style from '../../stylesheets/Products.module.css'
import { useSelector } from 'react-redux';
import { selectLoadingState, selectCurrentUser } from '../../features/selectors';
import Loading from '../essentials/Loading';
import { Link} from 'react-router-dom';
import { IoHeartCircleSharp } from "react-icons/io5";
import { CiWarning } from "react-icons/ci";
import FilteredProduct from './FilteredProducts';
import { useSavedItems } from './saveLikedHook';

const Products = ({empty, subCategory, filteredCategory}) => {
    const loading = useSelector(selectLoadingState);
    const user = useSelector(selectCurrentUser);

    const { handleClick } = useSavedItems(user);



    return (
        <>
            { loading ? (<Loading />) :
                (
                    subCategory ?(<FilteredProduct filterBy={filteredCategory}/>) : (
                        <div className={style.container}>
                             {empty && 
                                <div className={style.empty}>
                                    <CiWarning className={style.warn}/>
                                    <p>Try:</p>
                                    <ul>
                                        <li>Checking the connection</li>
                                        <li>Checking the proxy, firewall and DNS configuration</li>
                                        <li>Running Windows Network Diagnostics</li>
                                    </ul>
                                <p>ERR_RESOURCE_UNAVAILABLE</p>
                                </div>}
                            {!empty && filteredCategory.map(item=>(
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

                        
                        
                    )

                    
                )
                
            }
            
            
        </>
    );
}

export default Products