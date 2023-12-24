import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { selectElectronics, selectFemale, selectMale, selectLoadingState } from '../../features/selectors';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { GiHeartPlus } from "react-icons/gi";
import { IoHeartCircleSharp } from "react-icons/io5";
import LikedItems from '../UserActions/LikedItems';



const Product = styled.div`
    margin: 1rem auto;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem .3rem ;
    width: 80%;
    justify-content: space-around;
    align-items: center;
    img{
        display: inline-flex;

        width: 300px;
        height: 450px;
    }
    p{
        text-transform: capitalize;
        color: #333;
    }
    p:nth-child(3){
        color: crimson;
    }
    
    .icon{
        color: #333;
        font-size: 2.4rem;
        right: 3rem;
        bottom: 1rem;
        border-radius: 50%;
        position: relative;
    }
    .icon:hover{
        color: #dcd0a4;
       
    }

`;

const Products = ({category}) => {
    const loading = useSelector(selectLoadingState);
    const [savedItems, setSavedItems] = useState([]);
    const male = useSelector(selectMale);
    const female = useSelector(selectFemale);
    const electronics = useSelector(selectElectronics);

    const handleClick = (item) => {
        // Check if the item is already in the savedItems list
        if (!savedItems.some((savedItem) => savedItem.id === item.id)) {
          // If not, add it to the savedItems list
          setSavedItems((prevSavedItems) => [...prevSavedItems, item]);
          console.log(savedItems)
        }

      };

    let displayedCategory;
    let categoryName;

    switch (category) {
        case 'male':
            displayedCategory = male;
            categoryName = 'Male Products';
        break;
        case 'female':
            displayedCategory = female;
            categoryName = 'Female Products';
        break;
        case 'electronics':
            displayedCategory = electronics;
            categoryName = 'Electronics';
        break;
        default:
            displayedCategory = null;
            categoryName = 'Unknown Category';
        break;
    }

    return (
        <>
            { loading ? (<Loading />) :
                (
                    displayedCategory && (
                        <Product>
                            {displayedCategory.map(item=>(
                                <div className="items" key={item.id}>
                                    
                                    <Link>
                                        <img src={item.images[0]} alt="" />
                                        <IoHeartCircleSharp onClick={()=>handleClick(item)} className='icon'/>
                                        <p>{item.title}</p>
                                        <p>£{item.price}</p>
                                    </Link>
                                    <LikedItems savedItems={savedItems} />

                                </div>
                            )) }

                        </Product>
                        
                        
                    )

                    
                )
                
            }
            
            
        </>
    );
}

export default Products