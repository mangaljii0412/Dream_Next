import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../component/Footer'
import ListingCard from '../component/ListingCard'
import Loader from '../component/Loader'
import Navbar from "../component/Navbar"
import { setPropertyList } from '../redux/state'
import "../styles/List.scss"

const PropertyList = () => {
    const [loading,setLoading] = useState(true)
    const user = useSelector((state) => state.user)
    const propertyList = useSelector((state) => state.user.propertyList)
    const dispatch = useDispatch();

    const getPropertyList = async () => {
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${user._id}/properties`,{
                method :"GET"
            })
            const data = await response.json();
            dispatch(setPropertyList(data))
            setLoading(false);
        }
        catch(err){
            console.log("Fetch all properties failed")
        }
    }

    useEffect(()=>{
        getPropertyList()
    },[])
    return  loading ? <Loader/> : (
        <>
            <Navbar/>
            <h1 className='title-list'>Your Property List</h1>
            <div className='list'>
                {propertyList?.map(({_id , creator , listingPhotos , city , province , country , category , type , price , booking = false}) =>(
                    <ListingCard  listingId = {_id} creator={creator} listingPhotos={listingPhotos} city={city} country={country} category={category} type={type} price={price} booking={booking}/>
                ))}
            </div>
            <Footer/>
        </>
    )
}

export default PropertyList