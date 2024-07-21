import { ArrowBackIosNew, ArrowForwardIos , Favorite} from "@mui/icons-material";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/ListingCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { setWishList } from "../redux/state";

const ListingCard = ({
    listingId, creator , listingPhotos, city, province, country, category, type, price,startDate,endDate,totalPrice,booking
}) => {

    // Slider For Images
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const goToPrevSlide = (e) =>{
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + listingPhotos.length) % listingPhotos.length)
    }
    const goToNextSlide = (e) =>{
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotos.length)
    }
    
    // Add to Wishlist

    const user = useSelector((state) => state.user)
    const wishList = user?.wishList || []

    console.log(wishList);

    const isLiked = wishList?.find((item) => item._id === listingId)
    // console.log(isLiked)
    
    // const patchWishList = async (e) =>{
    //     e.stopPropagation()
        
    //     const response = await fetch(`http://localhost:3001/users/${user._id}/${listingId}`,{
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //     const data = await response.json();
    //     dispatch(setWishList(data.wishList))
    // }

    const patchWishList = async (e) => {
        e.stopPropagation();
        if(user?._id !== creator._id){
        // console.log('patchWishList called');
    
        const response = await fetch(`http://localhost:3001/users/${user._id}/${listingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
    
        const data = await response.json();
        // console.log('Response:', data);
    
        dispatch(setWishList(data.wishList));
    }
    else {return};
    };

    
    return (
        <div className='listing-card'
        onClick={() => {
            navigate(`/properties/${listingId}`);}}>
            <div className='slider-container'>
                <div className='slider' style={{transform: `translateX(-${currentIndex*100}%)`}}>
                    { listingPhotos?.map((photo,index) =>(
                        <div key={index} className="slide" >
                            <img src={`http://localhost:3001/${photo}`} alt = {`photo ${index+1}`}/>
                            <div className='prev-button' onClick={(e) => {goToPrevSlide(e)}}>
                                <ArrowBackIosNew sx={{fontSize: "15px"}}/>
                            </div>
                            <div className='next-button' onClick={(e) => {goToNextSlide(e)}}>
                                <ArrowForwardIos sx={{fontSize: "15px"}}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <h3>{city}, {province}, {country}</h3>
            <p>{category}</p>

            {!booking ? (<>
                <p>{type}</p>
                <p><span>${price}</span> per night</p>
            </>) :(<>
                <p>{startDate} - {endDate}</p>
                <p>
                    <span>${totalPrice}</span> total
                </p>
            </>)}

            <button className="favorite" onClick={patchWishList} disabled={!user}>
                {isLiked ? (
                    <Favorite style={{color: 'red'}} />
                )
                : (
                    <Favorite style={{color: "white"}} />
                )}
            </button>
            
        </div>
    )
}


export default ListingCard
