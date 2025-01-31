import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { categories } from "../data.js"
import { setListings } from "../redux/state"
import "../styles/Listings.scss"
import ListingCard from './ListingCard'
import Loader from "./Loader"
const Listings = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    const [selectedCategory, setSelectedCategory] = useState("All")
    const listings = useSelector((state) => state.listings)

    const getFeedListings = async () => {
        try {
            console.log(process.env.REACT_APP_SERVER_URL);
            const response = await fetch(
                selectedCategory !== "All" ?
                    `${process.env.REACT_APP_SERVER_URL}/properties?category=${selectedCategory}` : `${process.env.REACT_APP_SERVER_URL}/properties`,
                {
                    method: "GET",
                }
            );

            const data = await response.json();
            dispatch(setListings({ listings: data }))
            setLoading(false)
        }
        catch (err) {
            console.log("Fetch Listings Failed")
        }
    };

    useEffect(() => {
        getFeedListings()
    }, [selectedCategory])

    // console.log(listings)
    return (
        <>
            <div className='category-list'>
                {categories?.map((category, index) => (
                    <div className={`category ${category.label === selectedCategory ? "selected" : ""}`} key={index} onClick={() => setSelectedCategory(category.label)}>
                        <div className='category_icon'>{category.icon}</div>
                        <p>{category.label}</p>
                    </div>
                ))}
            </div>

            

            {loading ? <Loader /> : (
                
                <div className="listings">
                    {listings?.map(({_id, creator, listingPhotos, city, province, country, category, type, price,booking=false}) => (
                        <ListingCard listingId={_id} creator={creator} listingPhotos={listingPhotos} city={city} province={province} country={country} category={category} type={type} price={price} booking={booking}/>
                        ))}
                </div>
            )}
        </>
    )
}

export default Listings