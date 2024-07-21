    import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
    import {
    GiBarn,
    GiBoatFishing,
    GiCactus,
    GiCastle,
    GiCaveEntrance,
    GiForestCamp,
    GiIsland,
    GiWindmill,
    } from "react-icons/gi";
    import {
    FaSkiing,
    FaPumpSoap,
    FaShower,
    FaFireExtinguisher,
    FaUmbrellaBeach,
    FaKey,
    } from "react-icons/fa";
    import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
    import {
    BiSolidWasher,
    BiSolidDryer,
    BiSolidFirstAid,
    BiWifi,
    BiSolidFridge,
    BiWorld,
    } from "react-icons/bi";
    import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
    import { IoDiamond } from "react-icons/io5";
    import { MdOutlineVilla, MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
    import {
    PiBathtubFill,
    PiCoatHangerFill,
    PiTelevisionFill,
    } from "react-icons/pi";
    import { TbIroning3 } from "react-icons/tb";
    import {
    GiHeatHaze,
    GiCctvCamera,
    GiBarbecue,
    GiToaster,
    GiCampfire,
    } from "react-icons/gi";
    import { AiFillCar } from "react-icons/ai";

    export const categories = [
    {
        label: "All",
        icon: <BiWorld />,
    },
    {
        img: "https://www.travelandleisure.com/thmb/v6p42p6GOtHWMY0mq1cXAH_FsKg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/santa-rosa-beachfront-home-terrace-VRBOSUMFL0522-4ddb2e3a33044938be3bd4d04428cf9b.jpg",
        label: "Beachfront",
        icon: <TbBeach />,
        description: "This property is close to the beach!",
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQizSSig_AzlDDQQbwGPJzEULYiIRWc4w8g&s",
        label: "Windmills",
        icon: <GiWindmill />,
        description: "This property is has windmills!",
    },
    {
        img: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/da4c47b2-f471-41e5-bb50-2cb819afe09c-Love-2-House-exterior.jpg",
        label: "Iconic cities",
        icon: <MdOutlineVilla />,
        description: "This property is modern!",
    },
    {
        img: "https://thumbs.dreamstime.com/b/new-england-countryside-farm-autumn-landscape-fall-foliage-woodstock-vermont-old-wooden-barn-surrounded-colorful-trees-46669476.jpg",
        label: "Countryside",
        icon: <TbMountain />,
        description: "This property is in the countryside!",
    },
    {
        img: "https://www.thespruce.com/thmb/_FZqg8AROnHRzD1FLXGvd1eyHFw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/KeyResidentialFtns-5a9470d218ba010037643a30.jpg",
        label: "Amazing Pools",
        icon: <TbPool />,
        description: "This is property has a beautiful pool!",
    },
    {
        img: "https://img.freepik.com/free-photo/3d-house-model-with-modern-architecture_23-2151004041.jpg",
        label: "Islands",
        icon: <GiIsland />,
        description: "This property is on an island!",
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQljYpzMmoDQhwg-I2DQq5KFM6fOFpjxYinhA&s",
        label: "Lakefront",
        icon: <GiBoatFishing />,
        description: "This property is near a lake!",
    },
    {
        img: "https://media.istockphoto.com/id/1348050883/photo/3d-rendering-of-modern-cozy-chalet-in-winter-night.jpg?s=612x612&w=0&k=20&c=XxViZbzhZlXuyQi1hvA_KvDtow1xcRjE-cty2jvIDaI=",
        label: "Ski-in/out",
        icon: <FaSkiing />,
        description: "This property has skiing activies!",
    },
    {
        img: "https://hips.hearstapps.com/hmg-prod/images/bojnice-castle-1603142898.jpg",
        label: "Castles",
        icon: <GiCastle />,
        description: "This property is an ancient castle!",
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC7efLDiIKx__V7gg0S_GmwIb21BzJyJDhGw&s",
        label: "Caves",
        icon: <GiCaveEntrance />,
        description: "This property is in a spooky cave!",
    },
    {
        img: "https://img.freepik.com/free-photo/couple-tourists-enjoying-camping-by-lake_335224-1342.jpg",
        label: "Camping",
        icon: <GiForestCamp />,
        description: "This property offers camping activities!",
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKAm_XAvMpXxZCFL3Bi5IwL53q_chwnkYg-g&s",
        label: "Arctic",
        icon: <BsSnow />,
        description: "This property is in arctic environment!",
    },
    {
        img: "https://images.dwell.com/photos-6063391372700811264/6133452257581948928-large/after-months-of-arduous-design-and-construction-marmol-and-becket-are-thrilled-to-escape-los-angeles-for-their-idyllic-desert-retreat.jpg",
        label: "Desert",
        icon: <GiCactus />,
        description: "This property is in the desert!",
    },
    {
        img: "https://i.pinimg.com/736x/af/a7/55/afa755942d1465e89b25c49d2d47a968.jpg",
        label: "Barns",
        icon: <GiBarn />,
        description: "This property is in a barn!",
    },
    {
        img: "https://www.shutterstock.com/image-photo/modern-luxury-villa-swimming-pool-260nw-676661200.jpg",
        label: "Luxury",
        icon: <IoDiamond />,
        description: "This property is brand new and luxurious!",
    },
    ];

    export const types = [
    {
        name: "An entire place",
        description: "Guests have the whole place to themselves",
        icon: <FaHouseUser />,
    },
    {
        name: "Room(s)",
        description:
        "Guests have their own room in a house, plus access to shared places",
        icon: <BsFillDoorOpenFill />,
    },
    {
        name: "A Shared Room",
        description:
        "Guests sleep in a room or common area that maybe shared with you or others",
        icon: <FaPeopleRoof />,
    },
    ];
    
    export const facilities = [
    {
        name: "Bath tub",
        icon: <PiBathtubFill />,
    },
    {
        name: "Personal care products",
        icon: <FaPumpSoap />,
    },
    {
        name: "Outdoor shower",
        icon: <FaShower />,
    },
    {
        name: "Washer",
        icon: <BiSolidWasher />,
    },
    {
        name: "Dryer",
        icon: <BiSolidDryer />,
    },
    {
        name: "Hangers",
        icon: <PiCoatHangerFill />,
    },
    {
        name: "Iron",
        icon: <TbIroning3 />,
    },
    {
        name: "TV",
        icon: <PiTelevisionFill />,
    },
    {
        name: "Dedicated workspace",
        icon: <BsPersonWorkspace />
    },
    {
        name: "Air Conditioning",
        icon: <BsSnow />,
    },
    {
        name: "Heating",
        icon: <GiHeatHaze />,
    },
    {
        name: "Security cameras",
        icon: <GiCctvCamera />,
    },
    {
        name: "Fire extinguisher",
        icon: <FaFireExtinguisher />,
    },
    {
        name: "First Aid",
        icon: <BiSolidFirstAid />,
    },
    {
        name: "Wifi",
        icon: <BiWifi />,
    },
    {
        name: "Cooking set",
        icon: <FaKitchenSet />,
    },
    {
        name: "Refrigerator",
        icon: <BiSolidFridge />,
    },
    {
        name: "Microwave",
        icon: <MdMicrowave />,
    },
    {
        name: "Stove",
        icon: <GiToaster />,
    },
    {
        name: "Barbecue grill",
        icon: <GiBarbecue />,
    },
    {
        name: "Outdoor dining area",
        icon: <FaUmbrellaBeach />,
    },
    {
        name: "Private patio or Balcony",
        icon: <MdBalcony />,
    },
    {
        name: "Camp fire",
        icon: <GiCampfire />,
    },
    {
        name: "Garden",
        icon: <MdYard />,
    },
    {
        name: "Free parking",
        icon: <AiFillCar />,
    },
    {
        name: "Self check-in",
        icon: <FaKey />
    },
    {
        name: " Pet allowed",
        icon: <MdPets />
    }
    ];