import React, { useRef, useState } from 'react';
import Navbar from "../component/Navbar";
import "../styles/CreateListing.scss";
import { categories, types , facilities } from '../data';
import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material';
import variables from '../styles/variables.scss';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Footer from '../component/Footer';

const CreateListing = () => {
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");

    const [formLocation, setFormLocation] = useState({
        streetAddress: "",
        appSuite: "",
        city: "",
        province: "",
        country: "",
    });

    const [guestCount, setGuestCount] = useState(1);
    const [bedroomCount, setBedroomCount] = useState(1);
    const [bedCount, setBedCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);

    const [amenities, setAmenities] = useState([]);
    const handleSelectAmenities = (facility) => {
        if (amenities.includes(facility)) {
            setAmenities((prevAmenities) => prevAmenities.filter((option) => option !== facility));
        } else {
            setAmenities((prev) => [...prev, facility]);
        }
    };

    const handleChangeLocation = (event) => {
        const { name, value } = event.target;
        setFormLocation((prevLocation) => ({ ...prevLocation, [name]: value }));
    };

    const [photos, setPhotos] = useState([]);
    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleUploadPhotos = (event) => {
        const files = Array.from(event.target.files);
        setPhotos((prevPhotos) => [...prevPhotos, ...files]);
    };

    const handleDragPhoto = (result) => {
        if (!result.destination) return;
        const items = Array.from(photos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setPhotos(items);
    };

    const handleRemovePhoto = (indexToRemove) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove));
    };

    const [formDescription, setFormDescription] = useState({
        title: "",
        description: "",
        highlight: "",
        highlight_details: "",
        price: 0,
    });

    const handleChangeDescription = (e) => {
        const { name, value } = e.target;
        setFormDescription({
            ...formDescription,
            [name]: value
        });
    };

    const creatorId = useSelector((state) => state.user._id);
    const navigate = useNavigate();

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const listingForm = new FormData();
            listingForm.append("creator", creatorId);
            listingForm.append("category", category);
            listingForm.append("type", type);
            listingForm.append("streetAddress", formLocation.streetAddress);
            listingForm.append("appSuite", formLocation.appSuite);
            listingForm.append("city", formLocation.city);
            listingForm.append("province", formLocation.province);
            listingForm.append("country", formLocation.country);
            listingForm.append("guestCount", guestCount);
            listingForm.append("bedroomCount", bedroomCount);
            listingForm.append("bedCount", bedCount);
            listingForm.append("bathroomCount", bathroomCount);
            listingForm.append("amenities", amenities);
            listingForm.append("title", formDescription.title);
            listingForm.append("description", formDescription.description);
            listingForm.append("highlight", formDescription.highlight);
            listingForm.append("highlight_details", formDescription.highlight_details);
            listingForm.append("price", formDescription.price);

            photos.forEach((photo) => {
                listingForm.append("listingPhotos", photo);
            });

            const response = await fetch("http://localhost:3001/properties/create", {
                method: "POST",
                body: listingForm,
            });

            if (response.ok) {
                navigate("/");
            }
        } catch (err) {
            console.log("Publish Listing Failed", err.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className='create-listing'>
                <h1>Publish Your Place</h1>
                <form onSubmit={handlePost}>
                    <div className='create-listing_step1'>
                        <h2>Step 1: Tell me about your place</h2>
                        <hr />
                        <h3>Which of these categories best describes your place?</h3>
                        <div className='category-list'>
                            {categories?.map((item, index) => (
                                <div className={`category ${category === item.label ? "selected" : ""}`} key={index} onClick={() => setCategory(item.label)}>
                                    <div className='category_icon'>{item.icon}</div>
                                    <p>{item.label}</p>
                                </div>
                            ))}
                        </div>

                        <h3>What types of place will guests have?</h3>
                        <div className='type-list'>
                            {types?.map((item, index) => (
                                <div className={`type ${type === item.name ? "selected" : ""}`} key={index} onClick={() => setType(item.name)}>
                                    <div className='type_text'>
                                        <h4>{item.name}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="type_icon">{item.icon}</div>
                                </div>
                            ))}
                        </div>

                        <h3>Where's your place located?</h3>
                        <div className='full'>
                            <div className='location'>
                                <p>Street Address</p>
                                <input type='text' placeholder='Street Address' value={formLocation.streetAddress} name='streetAddress' onChange={handleChangeLocation} required />
                            </div>
                        </div>

                        <div className='half'>
                            <div className='location'>
                                <p>Apartment, suite, etc. (if applicable)</p>
                                <input type='text' placeholder='Apt, Suite, etc. (if applicable)' value={formLocation.appSuite} name='appSuite' onChange={handleChangeLocation} required></input>
                            </div>

                            <div className='location'>
                                <p>City</p>
                                <input type='text' placeholder='City' value={formLocation.city} name='city' onChange={handleChangeLocation} required></input>
                            </div>
                        </div>

                        <div className='half'>
                            <div className='location'>
                                <p>Province</p>
                                <input type='text' placeholder='Province' value={formLocation.province} name='province' onChange={handleChangeLocation} required></input>
                            </div>

                            <div className='location'>
                                <p>Country</p>
                                <input type='text' placeholder='Country' value={formLocation.country} name='country' onChange={handleChangeLocation} required></input>
                            </div>
                        </div>

                        <h3>Share some basics about your place</h3>
                        <div className='basics'>
                            <div className='basic'>
                                <p>Guests</p>
                                <div className='basic_count'>
                                    <RemoveCircleOutline onClick={() => { guestCount > 1 && setGuestCount(guestCount - 1) }} sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: variables.pinkred }, }} />
                                    <p>{guestCount}</p>
                                    <AddCircleOutline onClick={() => { setGuestCount(guestCount + 1) }} sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: variables.pinkred }, }} />
                                </div>
                            </div>

                            <div className='basic'>
                                <p>Bedrooms</p>
                                <div className='basic_count'>
                                    <RemoveCircleOutline onClick={() => { bedroomCount > 1 && setBedroomCount(bedroomCount - 1) }} sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: variables.pinkred }, }} />
                                    <p>{bedroomCount}</p>
                                    <AddCircleOutline onClick={() => { setBedroomCount(bedroomCount + 1) }} sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: variables.pinkred }, }} />
                                </div>
                            </div>

                            <div className='basic'>
                                <p>Beds</p>
                                <div className='basic_count'>
                                    <RemoveCircleOutline onClick={() => { bedCount > 1 && setBedCount(bedCount - 1) }} sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: variables.pinkred }, }} />
                                    <p>{bedCount}</p>
                                    <AddCircleOutline onClick={() => { setBedCount(bedCount + 1) }} sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: variables.pinkred }, }} />
                                </div>
                            </div>

                            <div className='basic'>
                                <p>Bathrooms</p>
                                <div className='basic_count'>
                                    <RemoveCircleOutline onClick={() => { bathroomCount > 1 && setBathroomCount(bathroomCount - 1) }} sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: variables.pinkred }, }} />
                                    <p>{bathroomCount}</p>
                                    <AddCircleOutline onClick={() => { setBathroomCount(bathroomCount + 1) }} sx={{ fontSize: '25px', cursor: 'pointer', "&:hover": { color: variables.pinkred }, }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='create-listing_step2'>
                        <h2>Step 2: Make your place stand out</h2>
                        <hr />

                        <h3>Tell guests what place has to offer</h3>
                        <div className='amenities'>
                            {facilities?.map((item, index) => (
                                <div className={`facility ${amenities.includes(item.name) ? "selected" : ""}`} key={index} onClick={() => handleSelectAmenities(item.name)}>
                                    <div className='facility_icon'>{item.icon}</div>
                                    <p>{item.name}</p>
                                </div>
                            ))}
                        </div>

                        <h3>Add some photos of your place</h3>
                        <DragDropContext onDragEnd={handleDragPhoto}>
                            <Droppable droppableId='photos' direction="horizontal" >
                                {(provided) => (
                                    <div className='photos' {...provided.droppableProps} ref={provided.innerRef}>
                                        {photos.length < 1 && (
                                            <>
                                                <input
                                                    id="image"
                                                    type="file"
                                                    style={{ display: "none" }}
                                                    accept="image/*"
                                                    onChange={handleUploadPhotos}
                                                    multiple
                                                    ref={fileInputRef}
                                                />
                                                <label htmlFor="image" className="alone">
                                                    <div className="icon" onClick={handleIconClick}>
                                                        <IoIosImages />
                                                    </div>
                                                    <p>Upload from your device</p>
                                                </label>
                                            </>
                                        )}

                                        {photos.length >= 1 && (
                                            <>
                                                {photos.map((photo, index) => (
                                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                                        {(provided) => (
                                                            <div className='photo' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <img src={URL.createObjectURL(photo)} alt="place" />
                                                                <button type='button' onClick={() => handleRemovePhoto(index)}>
                                                                    <BiTrash />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                <input type='file' id='image' style={{ display: "none" }} accept="image/*" onChange={handleUploadPhotos} multiple ref={fileInputRef} />
                                                <label htmlFor='image' className='together'>
                                                    <div className='icon'><IoIosImages /></div>
                                                    <p>Upload from your Device</p>
                                                </label>
                                            </>
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>

                        <h3>What make your place attractive and exciting</h3>
                        <div className="description">
                            <p>Title</p>
                            <input type="text" placeholder='Title' name='title' value={formDescription.title} onChange={handleChangeDescription} required />
                            <p>Description</p>
                            <input type="text" placeholder='Description' name='description' value={formDescription.description} onChange={handleChangeDescription} required />
                            <p>Highlight</p>
                            <input type="text" placeholder='Highlight' name='highlight' value={formDescription.highlight} onChange={handleChangeDescription} required />
                            <p>Highlight details</p>
                            <textarea type="text" placeholder='Highlight details' name='highlight_details' value={formDescription.highlight_details} onChange={handleChangeDescription} required />
                            <p>Now, set Your PRICE</p>
                            <span>$</span>
                            <input className="price" type="number" placeholder='100' name='price' value={formDescription.price} onChange={handleChangeDescription} required />
                        </div>
                    </div>
                    <button className='submit_btn' type="submit">CREATE YOUR LISTING</button>
                </form>
            </div>
            <Footer/>
        </>
    )
}

export default CreateListing;
