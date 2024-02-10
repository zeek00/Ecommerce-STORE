import React, { useState, useEffect } from 'react'
import {useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Loading from '../home/loading/Loading';
import { selectElectronics, selectFemale, selectMale } from '../../features/selectors';
import Item from './Item';


const Items = ()=> {
    const {itemName} = useParams();
    const male = useSelector(selectMale);
    const female = useSelector(selectFemale);
    const electronics = useSelector(selectElectronics);
    const [allItems, setAllItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const combinedItems = [...male, ...female, ...electronics];
            setAllItems(combinedItems);
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timeoutId);
    }, [male, female, electronics]);
    const filteredItem = allItems.find(item=> item.title === decodeURI(itemName));
    console.log(filteredItem)

  return (
    <div>
        {isLoading ? <Loading /> : filteredItem && <Item item={filteredItem} />}

    </div>
  )
}

export default Items