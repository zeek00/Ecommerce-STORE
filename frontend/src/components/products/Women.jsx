import React from 'react';
import { useSelector } from 'react-redux';
import { selectFemale } from '../../features/selectors';
import style from '../../stylesheets/products/Products.module.css'
import Categories from '../essentials/Categories';
import Products from '../essentials/Products';

const Women = ()=> {
    const female = useSelector(selectFemale);
    const femaleCategories = female ? [...new Set(female.map(item => item.category))] : [];
    console.log(femaleCategories)

  return (
    <>
        <h2 className={style.h2}>Women's wear</h2>
        <Categories type={'female'} category={'women'} selectedCategory={femaleCategories}/>
        <Products category='female'/>
    </>
  )
}

export default Women;