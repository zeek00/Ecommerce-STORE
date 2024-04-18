import React, { useState, useEffect } from 'react'
import {useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Loading from '../essentials/Loading';
import { selectElectronics, selectFemale, selectMale } from '../../features/selectors';
import Item from './Item';
import styled from 'styled-components';
import {css} from '../../helpers/cssVariables'
import PostsRoutes from '../../app/routes';

const Div = styled.div`
  padding: 1rem;
  div{
    display: flex;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }
  button{
    color: #222;
    font-weight: 200;
    border: none;
    cursor: pointer;
  }
  button:hover{
    color: ${css.primarySharp};
    font-weight: 300;
    cursor: pointer;
  }




`;


const Items = ()=> {
    const {itemName} = useParams();
    const navigate = useNavigate();
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

  return (
    <Div>
      <div>
        <button onClick={()=>navigate(PostsRoutes.home.home())}> {'Home' }</button>

        <button onClick={()=>navigate(-1)}> {'< Go back' }</button>

      </div>
      {isLoading ? <Loading /> : filteredItem && <Item item={filteredItem} />}
    </Div>
  )
}

export default Items