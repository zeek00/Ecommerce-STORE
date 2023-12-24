import React from 'react';
import { useSelector } from 'react-redux';
import { selectMale } from '../../features/selectors';
import style from '../../stylesheets/products/Products.module.css'
import Categories from '../essentials/Categories';
import Products from '../essentials/Products';
import GoToTopButton from '../essentials/GoToTop';

const Men = ()=> {
    const male = useSelector(selectMale);
    const maleCategories = male ? [...new Set(male.map(item => item.category))] : [];
    console.log(maleCategories)

  return (
    <>
        <h2 className={style.h2}>Men's wear</h2>
        <Categories type={'male'} category={'men'} selectedCategory={maleCategories}/>
        <Products category='male'/>
    </>
  )
}

export default Men;