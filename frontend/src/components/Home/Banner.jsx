import React from 'react'
import style from '../../stylesheets/Banner.module.css'
import Button from '../essentials/Button'
// import bannerImg from '../../assets/hoodie-banner.jpg'

const btnProps = [
  {id:1, color:'#333',backgroundColor:'#dcd0a4',padding:'.5rem', label:'shop men', borderRadius:'0', textTransform:'uppercase', shadow:'.04rem .04rem .4rem #dcd0a4', fontWeight:'600'},
  {id:2, color:'#333',backgroundColor:'#dcd0a4',padding:'.5rem', label:'shop electronics', borderRadius:'0', textTransform:'uppercase', shadow:'.04rem .04rem .4rem #dcd0a4', fontWeight:'600'},
  {id:3, color:'#333',backgroundColor:'#dcd0a4',padding:'.5rem', label:'shop women', borderRadius:'0', textTransform:'uppercase', shadow:'.04rem .04rem .4rem #dcd0a4', fontWeight:'600'},


]


const Banner = ()=> {
  return (
    <div className={style.banner}>
      <div className={style.bannerText}>
        <h1>Your One-Stop Shop for<br/> Style, And Shine</h1>
          
        {/* <p>Explore a world of fashion that celebrates diversity and personal expression. Find clothing that resonates with your unique style, and uncover a world of possibilities in every garment.</p> */}
      </div>
      <div className={style.btn}>
        {
          btnProps.map(item=>(
            <Button 
              key={item.id}
              borderRadius={item.borderRadius}
              padding={item.padding}
              label={item.label}
              textTransform={item.textTransform}
              shadow={item.shadow}
              backgroundColor={item.backgroundColor}
              color={item.color}
              fontWeight={item.fontWeight}
            />
          ))
        }
      </div>
      
      {/* <img src={bannerImg} alt="women on grey hoodie" /> */}
    </div>
  )
}

export default Banner