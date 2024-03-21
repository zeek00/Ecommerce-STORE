import React from 'react';
import { useSelector } from 'react-redux';
import { selectElectronics } from '../../features/selectors';
import style from '../../stylesheets/Products.module.css'
import Categories from '../essentials/Categories';
import Products from './Products';
import { filterElectronics } from '../../features/electronics/electronicsSlice';
import {useParams } from "react-router-dom";

const Electronics = ()=> {
    const electronics = useSelector(selectElectronics);
    const {category} = useParams();
    const filteredElectronics = category ? filterElectronics(category, electronics) : Object.values(electronics)

    const electronicsCategories = filteredElectronics ? [...new Set(electronics.map(item => item.category))] : [];

  return (
    <>
      <h2 className={style.h2}>Electronics</h2>
      {electronics.length === 0 && <Products empty={true}/>}
      {electronics.length === 0 && <Categories empty={true}/>}
      {electronics && <Categories category={'electronics'} selectedCategory={electronicsCategories}/>}
      {electronics && <Products subCategory={category} filteredCategory={filteredElectronics} category={'electronics'}/>}    
    </>
  )
}

export default Electronics;