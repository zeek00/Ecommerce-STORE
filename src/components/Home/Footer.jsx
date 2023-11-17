import React from 'react'
import style from '../../stylesheets/Footer.module.css'
import { MdOutlineAlternateEmail } from "react-icons/md";
import Button from '../essentials/Button';
import { FaInstagram, FaTwitter, FaFacebook, FaWhatsapp, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer= ()=> {
    
  
  return (
    <div className={style.footer}>
        <div className={style.container}>
        <div className={style.categories}>
            <h4>Categories</h4>
            <ul>
                <li>jewelries</li>
                <li>clothing</li>
                <li>electronics</li>
            </ul>
        </div>
        
        <div className={style.accessories}>
            <h4>accessories</h4>
            <ul>
                <li>bags</li>
                <li>wathches</li>
                <li>shoes</li>
            </ul>
        </div>

        <div className={style.company}>
            <h4>company</h4>
            <ul>
                <li>about us</li>
                <li>store location</li>
                <li>terms</li>
            </ul>
        </div>

        <div className={style.support}>
            <h4>support</h4>
            <ul>
                <li>about us</li>
                <li>store location</li>
                <li>terms</li>
            </ul>
        </div>
        
        <div className={style.socials}>
            <h4>connect </h4>
            <ul>
                <li><FaFacebook className={style.socialIcon} /><Link className={style.socialLink} >shop_brand</Link></li>
                <li><FaTwitter className={style.socialIcon} /><Link className={style.socialLink} >shop_brand</Link></li>
                <li><FaInstagram className={style.socialIcon} /><Link className={style.socialLink} >shop_brand</Link></li>
            </ul>
        </div>
        
        <div className={style.contact}>
            <h4>contact</h4>
            <ul>
                <li><FaWhatsapp className={style.socialIcon} /><Link className={style.socialLink} >+234 809 368 3423</Link></li>
                <li><FaPhone className={style.socialIcon} /><Link className={style.socialLink} >+44 798 389 79390</Link></li>
            </ul>
        </div>

        <div className={style.subscribe}>
            <h4>Subscribe to get offers</h4>
            <p><span>Unsubscribe or change preference</span></p>
            <form action="">
                <div className={style.form}>
                    <MdOutlineAlternateEmail className={style.icon}/>
                    <input type="email" placeholder='Email Address' />
                </div>
                <Button label={'Subscribe'} color={'#fff'} backgroundColor={'rgba(34, 34, 34, 0.6)'} borderRadius={'1.7rem'}/>
            </form>
            <p>For details of how we use your information, please see
                our <span>private policy</span>
            </p>

        </div>

        </div>
        <h3>SHOP</h3>
        <hr />
        <div >
            2023 &copy; All rights reserved by zeekdevs

        </div>
    </div>
    


    
  )
}

export default Footer