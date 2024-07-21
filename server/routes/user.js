const router = require("express").Router();

const Booking = require("../models/Booking");
const User = require("../models/User")
const Listing = require("../models/Listing")

// Get Trip list

router.get("/:userId/trips", async(req,res)=>{
    try{
        const { userId } = req.params;
        const bookings = await Booking.find({customerId: userId}).populate([
            "customerId","hostId","listingId"
        ])

        // console.log(bookings);
        res.status(202).json(bookings)
    }catch(err){
        // console.log(err);
        res.status(404).json({message: "Can not find trip!"})
    }
})

// Add Listing to wishlist
router.patch("/:userId/:listingId" , async (req,res)=>{
    try{
        const {userId , listingId} = req.params;
        const user = await User.findById(userId);
        const listing = await Listing.findById(listingId).populate("creator");

        const favouriteListing = user.wishList.find((item) => item._id.toString() === listingId)

        if(favouriteListing){
            user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId)
            await user.save();
            res.status(200).json({message : "Listing is removed from wishList",wishList: user.wishList})
        }
        else{
            user.wishList.push(listing);
            await user.save();
            res.status(200).json({message : "Listing is added to wishList",wishList: user.wishList})
        }
    }catch (err){
        console.log(err);
        res.status(404).json({message : err.message})
    }
})

// Get Property Lists
router.get("/:userId/properties", async(req,res)=>{
    try{
        const { userId } = req.params;
        const properties = await Listing.find({creator: userId}).populate("creator")

        // console.log(properties);
        res.status(202).json(properties)
    }catch(err){
        // console.log(err);
        res.status(404).json({message: "Can not find properties!"})
    }
})

// Get reservation List
router.get("/:userId/reservations", async(req,res)=>{
    try{
        const { userId } = req.params;
        const reservations = await Booking.find({hostId: userId}).populate([
            "customerId","hostId","listingId"
        ])

        // console.log(reservation);
        res.status(202).json(reservations)
    }catch(err){
        // console.log(err);
        res.status(404).json({message: "Can not find reservations!"})
    }
})

module.exports = router;