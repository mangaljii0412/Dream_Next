import React from 'react'
import "../styles/Footer.scss"
import {LocationOn , LocalPhone , Email} from "@mui/icons-material"


const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer_left'>
                <a href="/"><img src="/logo.png" alt="logo"/></a>
            </div>
            <div className='footer_center'>
                <h3>Useful Links</h3>
                <ul>
                    <li>About us</li>
                    <li>Terms and Conditions</li>
                    <li>Return and Refund policy</li>
                </ul>
            </div>
            <div className='footer_right'>
                <h3>Contact</h3>
                <div className='footer_right_info'>
                    <LocalPhone/>
                    <p>+1 123 456 7890</p>
                </div>
                <div className='footer_right_info'>
                    <Email/>
                    <p>dreamnext@support.com</p>
                </div>
                <img src="/payment.png" alt="payment" />
            </div>
        </div>
    )
}

export default Footer