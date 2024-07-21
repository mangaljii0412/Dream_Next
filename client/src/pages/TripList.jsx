import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../component/Footer';
import ListingCard from '../component/ListingCard';
import Loader from '../component/Loader';
import Navbar from '../component/Navbar';
import { setTripList } from '../redux/state';
import "../styles/List.scss";

const TripList = () => {
    const [loading,setLoading] = useState(true);
    const userId = useSelector((state) => state.user._id)
    const tripList = useSelector((state) => state.user.tripList)
    const dispatch = useDispatch();
    const getTripList = async () =>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${userId}/trips`,{
                method: "GET",
            })
            const data = await response.json();
            dispatch(setTripList(data));
            setLoading(false)
        }catch(err){
            console.log("Fetch Trip list Failed" , err.message);
        }
    }

    useEffect(() =>{
        getTripList()
    },[])
        return loading ? <Loader/> : (
            <>
                <Navbar/>
                <h1 className='title-list'>Your Trip List</h1>
                <div className='list'>
                {tripList.map(({listingId , hostId , startDate , endDate , totalPrice , booking=true}) => (
                    <ListingCard  listingId={listingId._id} creator={hostId._id} listingPhotos={listingId.listingPhotos} city={listingId.city} province={listingId.province} country={listingId.country} category={listingId.category} startDate={startDate} endDate={endDate} totalPrice={totalPrice} booking={booking}/>
                ))}
                </div>
                <Footer/>
            </>
    )
}

export default TripList