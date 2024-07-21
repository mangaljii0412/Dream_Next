import React, { useState } from 'react'
import { IconButton, Link } from "@mui/material"
import { Search, Person, Menu } from "@mui/icons-material"
import variables from "../styles/variables.scss"
import { useSelector , useDispatch} from 'react-redux'
import { setLogout } from '../redux/state'
import "../styles/Navbar.scss";
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [dropDownMenu, setDropDownMenu] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [search , setSearch] = useState("");
    const navigate = useNavigate()

    return (
        <div className='navbar'>
            <a href="/">
                <img src="/logo.png" alt="logo"></img>
            </a>
            <div className='navbar_search'>
                <input type="text" placeholder='Search ...' value={search} onChange={(e) => setSearch(e.target.value)}/>
                <IconButton disabled={search === ""}>
                    <Search sx={{ color: variables.pinkred }} onClick={() => {navigate(`/properties/search/${search}`)}}/>
                </IconButton>
            </div>

            <div className="navbar_right">
                {user ? (<a href="/create-listing" className='host'>Become A Host</a>) : (<a href="/login"  className='host'>Become A Host</a>)}
                <button className='navbar_right_account' onClick={() => setDropDownMenu(!dropDownMenu)}>
                    <Menu sx={{ color: variables.darkgrey }} />
                    {/* {!user ? 
                    <Person sx={{color:variables.darkgrey}}/>
                    :(
                        <img src=''></img>
                        )
                    } */}
                </button>
                {dropDownMenu && !user && (
                    <div className='navbar_right_accountmenu'>
                        <a href="/login">Log In</a>
                        <a href="/register">Sign Up</a>
                    </div>
                )}
                {dropDownMenu && user && (
                    <div className='navbar_right_accountmenu'>
                        <a href= {`/${user._id}/trips`}>Trip List</a>
                        <a href={`/${user._id}/wishList`}>Wish List</a>
                        <a href={`/${user._id}/properties`}>Property List</a>
                        <a href={`/${user._id}/reservations`}>Reservation List</a>
                        <a href="/create-listing">Become a Host</a>
                        <a href="/" onClick={() =>{
                            dispatch(setLogout())
                        }}>Log Out</a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar;