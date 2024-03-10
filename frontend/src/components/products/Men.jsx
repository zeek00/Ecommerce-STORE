import React from 'react';
import { useSelector } from 'react-redux';
import { selectMale } from '../../features/selectors';
import style from '../../stylesheets/Products.module.css'
import Categories from '../essentials/Categories';
import Products from './Products';
import { filterMale } from '../../features/clothing/clothingSlice';
import {useParams } from "react-router-dom";


const Men = ()=> {
    const male = useSelector(selectMale);
    const {category} = useParams();
    const filteredMale = category ? filterMale(category, male) : Object.values(male)
    const maleCategories = male ? [...new Set(male.map(item => item.category))] : [];

  return (
    <>
        <h2 className={style.h2}>Men's wear</h2>
        <Categories category={'men'} selectedCategory={maleCategories}/>
        <Products subCategory={category} filteredCategory={filteredMale} category='male'/>
    </>
  )
}

export default Men;