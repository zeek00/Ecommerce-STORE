import React from 'react';
import { useSelector } from 'react-redux';
import { selectElectronics } from '../../features/selectors';
import style from '../../stylesheets/products/Products.module.css'
import Categories from '../essentials/Categories';
import Products from '../essentials/Products';

const Electronics = ()=> {
    const electronics = useSelector(selectElectronics);
    const electronicsCategories = electronics ? [...new Set(electronics.map(item => item.category))] : [];
    console.log(electronicsCategories)

  return (
    <>
        <h2 className={style.h2}>Electronics</h2>
        <Categories category={'electronics'} selectedCategory={electronicsCategories}/>
        <Products category='electronics'/>
    </>
  )
}

export default Electronics;