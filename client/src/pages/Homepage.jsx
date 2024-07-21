import React from 'react'
import Navbar from "../component/Navbar"
import Slide from "../component/Slide"
import Categories from "../component/Categories"
import Listings from "../component/Listings"
import Footer from '../component/Footer';

const Homepage = () => {
    return (
        <>
            <Navbar />
            <Slide />
            <Categories/>
            <Listings/>
            <Footer/>
        </>
    )
}

export default Homepage;