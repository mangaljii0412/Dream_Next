import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import RegisterPage from './pages/RegisterPage';
import { store } from './redux/store';
import CreateListing from './pages/CreateListing';
import ListingDetails from './pages/ListingDetails';
import TripList from './pages/TripList';
import WishList from './pages/WishList';
import PropertyList from './pages/PropertyList';
import ReservationList from './pages/ReservationList';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/login" element={<Loginpage />}></Route>
            <Route path="/create-listing" element={<CreateListing />}></Route>
            <Route path="/properties/:listingId" element={<ListingDetails />}></Route>
            <Route path="/properties/category/:category" element={<CategoryPage/>}></Route>
            <Route path="/properties/search/:search" element={<SearchPage/>}></Route>
            <Route path="/:userId/trips" element={<TripList />}></Route>
            <Route path="/:userId/wishList" element={<WishList />}></Route>
            <Route path="/:userId/properties" element={<PropertyList/>}></Route>
            <Route path="/:userId/reservations" element={<ReservationList/>}></Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
