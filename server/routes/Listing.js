    const router = require("express").Router();
    const multer = require("multer");
    const Listing = require("../models/Listing");
    const User = require("../models/User");

    // Configuration Multer for file uploads
    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
    });

    const upload = multer({ storage });

    // Create listing
    router.post("/create", upload.array("listingPhotos"), async (req, res) => {
    try {
        // Take the information from the form
        const {
        creator,
        category,
        type,
        streetAddress,
        appSuite, // Changed to match frontend code
        city,
        province,
        country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        amenities,
        title,
        description,
        highlight,
        highlight_details,
        price,
        } = req.body;

        const listingPhotos = req.files;
        if (!listingPhotos) {
        return res.status(400).send("No file uploaded");
        }

        const listingPhotosPaths = listingPhotos.map((file) => file.path);

        const newListing = new Listing({
        creator,
        category,
        type,
        streetAddress,
        appSuite, // Changed to match frontend code
        city,
        province,
        country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        amenities,
        listingPhotos: listingPhotosPaths,
        title,
        description,
        highlight,
        highlight_details,
        price,
        });

        await newListing.save();
        res.status(200).json(newListing);
    } catch (err) {
        console.error("Failed to create listing:", err);
        res.status(500).json({ message: "Failed to create listing", error: err.message });
    }
    });

    // Get all listings By category
    router.get("/", async (req, res) => {
    const qCategory = req.query.category;
    try {
        let listings;
        if (qCategory) {
        listings = await Listing.find({ category: qCategory }).populate('creator');
        } else {
        listings = await Listing.find().populate('creator');
        }

        res.status(200).json(listings);
    } catch (err) {
        console.error("Failed to fetch listings:", err);
        res.status(500).json({ message: "Failed to fetch listings", error: err.message });
    }
    });

    // Get Listings By search

    router.get("/search/:search" , async (req,res)=>{
        const {search} = req.params

        try{
            let listings = []
            if(search == "all")
            {
                listings = await Listing.find().populate('creator')
            }
            else{
                listings = await Listing.find({
                    $or: [
                        {category: {$regex: search , $options: "i"}},
                        {title: {$regex: search , $options: "i"}},
                    ]
                }).populate("creator")
            }
            res.status(200).json(listings)
        }
        catch(err){
            console.log(err);
            res.status(404).json({message: "Fail to fetch Listings" , error: err.message})
        }
    })

    

    // Listing Detais
    router.get("/:listingId" , async (req,res) =>{
        try{
            const {listingId} = req.params
            const listing = await Listing.findById(listingId).populate("creator");
            res.status(202).json(listing);
        }
        catch (err){
            res.status(400).json({message:"Listing can not found" , error:err.message})
        }
    })


    module.exports = router;
