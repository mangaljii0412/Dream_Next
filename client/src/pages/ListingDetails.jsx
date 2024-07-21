import React, { useEffect, useState } from 'react';
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import 'react-date-range/dist/theme/default.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import Footer from '../component/Footer';
import Loader from "../component/Loader";
import Navbar from "../component/Navbar";
import { facilities } from "../data";
import "../styles/ListingDetails.scss";

const ListingDetails = () => {
    const [loading, setLoading] = useState(true);
    const { listingId } = useParams();
    const [listing, setListing] = useState(null);

    const getListingDetails = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/properties/${listingId}`, {
                method: "GET",
            });
            const data = await response.json();
            setListing(data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch listing details:", err.message);
        }
    };

    useEffect(() => {
        getListingDetails();
    }, [listingId]);

    const [dateRange, setDateRange] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    }]);

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]);
    };

    const start = new Date(dateRange[0].startDate);
    const end = new Date(dateRange[0].endDate);
    const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24)); 

    const customerId = useSelector((state) => state?.user?._id);

    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (!customerId) {
            alert("You need to be logged in to make a booking.");
            return;
        }
        try {
            const bookingForm = {
                customerId,
                listingId,
                hostId: listing.creator._id,
                startDate: dateRange[0].startDate.toDateString(),
                endDate: dateRange[0].endDate.toDateString(),
                totalPrice: listing.price * dayCount,
            };
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/bookings/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingForm)
            });

            if (response.ok) {
                navigate(`/${customerId}/trips`);
            } else {
                console.error("Failed to submit booking, status:", response.status);
            }
        } catch (err) {
            console.error("Failed to submit booking:", err.message);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />
            <div className='listing-details'>
                <div className="title">
                    <h1>{listing.title}</h1>
                    <div></div>
                </div>
                <div className='photos'>
                    {listing.listingPhotos.map((item, index) => (
                        <img key={index} src={`${process.env.REACT_APP_SERVER_URL}/${item.replaceAll("\\", "/")}`} alt="listing photo" />
                    ))}
                </div>

                <h2>{listing.type} in {listing.city}, {listing.province}, {listing.country}</h2>
                <p>{listing.guestCount} guests - {listing.bedroomCount} bedroom(s) - {listing.bedCount} bed(s) - {listing.bathroomCount} bath(s)</p>
                <hr />

                <div className='profile'>
                    <h3>Hosted By {listing.creator.firstName} {listing.creator.lastName}</h3>
                </div>

                <hr />
                <h3>Description</h3>
                <p>{listing.description}</p>
                <hr />

                <h3>{listing.highlight}</h3>
                <p>{listing.highlight_details}</p>
                <hr />

                <div className='booking'>
                    <div>
                        <h2>What this place offers?</h2>
                        <div className='amenities'>
                            {listing.amenities[0].split(",").map((item, index) => (
                                <div className='facility' key={index}>
                                    <div className='facility_icon'>
                                        {facilities.find((facility) => facility.name === item)?.icon}
                                    </div>
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2>How long do you want to stay</h2>
                        <div className='date-range-calendar'>
                            <DateRange ranges={dateRange} onChange={handleSelect} />
                            {dayCount > 1 ? (
                                <h2>${listing.price} x {dayCount} nights</h2>
                            ) : (
                                <h2>${listing.price} x {dayCount} night</h2>
                            )}
                            <h2>Total Price: ${listing.price * dayCount}</h2>
                            <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
                            <p>End Date: {dateRange[0].endDate.toDateString()}</p>

                            <button className='button' type='submit' onClick={handleSubmit}>Booking</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ListingDetails;
