import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from '../component/Footer'
import ListingCard from '../component/ListingCard'
import Loader from '../component/Loader'
import Navbar from '../component/Navbar'
import { setListings } from '../redux/state'
import "../styles/List.scss"


const SearchPage = () => {
    const [loading,setLoading] = useState(true);
    const {search} = useParams()
    const listings = useSelector((state) => state.listings)
    const dispatch = useDispatch();
    const getSearchListings = async ()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/properties/search/${search}`,{
                method: "GET"
            })
            const data = await response.json()
            dispatch(setListings({listings: data}));
            setLoading(false)
        }catch(err){
            console.error("Failed to fetch search listings:", err.message);
        }
    }
    useEffect(()=>{
        getSearchListings()
    },[])
    return loading ? <Loader/> :  (
        <>
            <Navbar/>
            <h1 className='title-list'>{search}</h1>
            <div className='list'>
                {listings?.map(({_id , creator , listingPhotos , city , province , country , category , type , price , booking = false}) =>(
                    <ListingCard  listingId = {_id} creator={creator} listingPhotos={listingPhotos} city={city} country={country} category={category} type={type} price={price} booking={booking}/>
                ))}
            </div>
            <Footer/>
        </>
    )
}

export default SearchPage