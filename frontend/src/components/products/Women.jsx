import React from 'react';
import { useSelector } from 'react-redux';
import { selectFemale } from '../../features/selectors';
import style from '../../stylesheets/Products.module.css'
import Categories from '../essentials/Categories';
import Products from './Products';
import { filterFemale } from '../../features/clothing/clothingSlice';
import {useParams } from "react-router-dom";


const Women = ()=> {
    const female = useSelector(selectFemale);
    const {category} = useParams();
    const filteredFemale = category ? filterFemale(category, female) : Object.values(female)
    const femaleCategories = female ? [...new Set(female.map(item => item.category))] : [];

  return (
    <>
      <h2 className={style.h2}>Women's wear</h2>
      {female.length === 0 && <Products empty={true}/>}
      {female.length === 0 && <Categories empty={true}/>}
      {female && <Categories category={'women'} selectedCategory={femaleCategories}/>}
      {female && <Products subCategory={category} filteredCategory={filteredFemale} category='female'/>}    
    </>
  )
}

export default Women;