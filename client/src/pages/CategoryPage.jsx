import React, { useState , useEffect} from 'react'
import "../styles/List.scss"
import Loader from '../component/Loader';
import Navbar from '../component/Navbar';
import { useParams } from 'react-router-dom';
import { useSelector  , useDispatch} from 'react-redux';
import { setListings } from '../redux/state';
import ListingCard from '../component/ListingCard';
import Footer from '../component/Footer';


const CategoryPage = () => {
    const [loading,setLoading] = useState(true);
    const {category} = useParams()
    console.log(category);
    const dispatch = useDispatch()

    const listings = useSelector((state) => state.listings)

    const getFeedListings = async () => {
        try {
            const response = await fetch(`http://localhost:3001/properties?category=${category}` ,
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
    }, [category])

    return loading ? <Loader/> : (
        <>
            <Navbar/>
            <h1 className='title-list'>{category} listings</h1>
            <div className='list'>
                {listings?.map(({_id , creator , listingPhotos , city , province , country , category , type , price , booking = false}) =>(
                    <ListingCard  listingId = {_id} creator={creator} listingPhotos={listingPhotos} city={city} country={country} category={category} type={type} price={price} booking={booking}/>
                ))}
            </div>
            <Footer/>
        </>
    )
}

export default CategoryPage