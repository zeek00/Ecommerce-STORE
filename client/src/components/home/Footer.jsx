import React, { useState } from 'react'
import style from '../../stylesheets/Footer.module.css'
import { MdOutlineAlternateEmail } from "react-icons/md";
import Button from '../essentials/Button';
import { FaInstagramSquare, FaFacebook, FaWhatsapp, FaPhone } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer= ()=> {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };
    return (
        <div className={style.footer}>
            <div className={style.subscribe}>
                <h2>Subscribe to get offers</h2> 
                <p>for our curated finds</p>
                <form action="">
                    <div className={style.form}>
                        <MdOutlineAlternateEmail className={isFocused && style.focusedicon}/>
                        <input 
                            type="email" 
                            id="email" 
                            onFocus={handleFocus} 
                            onBlur={() => setIsFocused(false)} 
                            placeholder='someone@emailprovider.com' 
                            autoComplete="email" 
                        />
                    </div>
                    <Button smPadding={'.4rem'} label='Subscribe' margin={'0'} color='#fff' backgroundColor='#222' borderRadius='0' width={'25%'}/>
                </form>
                <hr className={style.hr}/>
                <span>Unsubscribe or change preference</span>
            </div>

            <div className={style.container}>
                <div className={style.categories}>
                    <h3>Categories</h3> 
                    <ul>
                        <li>men</li>
                        <li>women</li>
                        <li>electronics</li>
                    </ul>
                </div>
                    
                <div className={style.accessories}>
                    <h3>accessories</h3> 
                    <ul>
                        <li>bags</li>
                        <li>watches</li> 
                        <li>shoes</li>
                    </ul>
                </div>

                <div className={style.company}>
                    <h3>company</h3> 
                    <ul>
                        <li>about us</li>
                        <li>store location</li>
                        <li>terms</li>
                    </ul>
                </div>

                <div className={style.support}>
                    <h3>support</h3>
                    <ul>
                        <li>Help centre</li>
                        <li>returns & refunds</li>
                        <li>Recalls</li>
                    </ul>
                </div>
                
                <div className={style.socials}>
                    <h3>connect</h3>
                    <ul>
                        <li><FaFacebook className={style.socialIcon} /><Link className={style.socialLink} >shoop_fb</Link></li>
                        <li><FaSquareXTwitter className={style.socialIcon} /><Link className={style.socialLink} >shoopp_x</Link></li>
                        <li><FaInstagramSquare className={style.socialIcon} /><Link className={style.socialLink} >shop_insta</Link></li>
                    </ul>
                </div>
                
                <div className={style.contact}>
                    <h3>contact</h3>
                    <ul>
                        <li><FaWhatsapp className={style.socialIcon} /><Link className={style.socialLink} >+234 809 368 3423</Link></li>
                        <li><FaPhone className={style.socialIcon} /><Link className={style.socialLink} >+44 798 389 79390</Link></li>
                        <li><FaWhatsapp className={style.socialIcon} /><Link className={style.socialLink} >+234 815 566 7469</Link></li>
                    </ul>
                </div>
            </div>
            
            <div className={style.footerFinal}>
                <p>&copy;2023 SHOOP </p>
                <p>
                <span>Private policy</span> | {' '}
                <span>Terms and conditions</span> 
                </p>
            </div>
        </div>
    );
}

export default Footer