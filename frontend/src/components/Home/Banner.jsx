import React from 'react'
import style from '../../stylesheets/Banner.module.css'
// import bannerImg from '../../assets/hoodie-banner.jpg'

const Banner = ()=> {
  return (
    <div className={style.banner}>
        <div className={style.bannerText}>
            <h1>Your One-Stop Shop for<br/> Style, And Shine</h1>
            <p>Explore a world of fashion that celebrates diversity and personal expression. Find clothing that resonates with your unique style, and uncover a world of possibilities in every garment.</p>
        </div>
        {/* <img src={bannerImg} alt="women on grey hoodie" /> */}
    </div>
  )
}

export default Banner