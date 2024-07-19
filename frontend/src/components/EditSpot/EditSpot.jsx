import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from '../../store/spots.js';
import './EditSpot.css';
import { useNavigate } from "react-router-dom";

const EditSpot = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const spot = useSelector((state) => { return state.spots.oneSpot });
    // console.log("🚀 ~ EditSpot ~ spot:", spot)
    const user = useSelector((state) => { return state.session.user });
    // if (!spot) {return};
    // console.log(spot)
    // const [address, setAddress] = useState('');
    // const [city, setCity] = useState('');
    // const [state, setState] = useState('');
    // const [country, setCountry] = useState('');
    // const [lat, setLat] = useState('');
    // const [lng, setLng] = useState('');
    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    // const [price, setPrice] = useState('');
    // const [url, setUrl] = useState('');

    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [url, setUrl] = useState(spot.SpotImages[0].url);



    // if (spot) {
    //     setAddress(spot.address);
    //     setCity(spot.city);
    //     setState(spot.state);
    //     setCountry(spot.country);
    //     setLat(spot.lat);
    //     setLng(spot.lng);
    //     setName(spot.name);
    //     setDescription(spot.description);
    //     setPrice(spot.price);
    //     setUrl(spot.SpotImages[0].url);
    // }

    const onSubmit = async (e) => {
        e.preventDefault();
        const update = {
            id: spot.id,
            // averageRating: spot.averageRating,
            address, city, state, country,
            lat, lng, name, description, price,
            ownerId: spot.ownerId
        };
        // console.log(update.id)
        dispatch(spotsActions.editSpot(update, user))
        navigate(`/spots/${spot.id}`);
    };
    // console.log(name)

    return (
        <div className="biggest">
            <div className="big-box">
                <div className="head-box">
                    <h1 className="headers">Update your Spot</h1>
                    <h3 className="headers">Where&apos;s your place located?</h3>
                    <p className="headers">Guests will only get your exact address once they booked a
                        reservation.</p>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="first-section">
                        <label>
                            Country
                            <input
                                type='text'
                                value={country}
                                onChange={(e) => { setCountry(e.target.value) }}
                                placeholder='Country' />
                        </label>
                        <label>
                            Street Address
                            <input
                                type='text'
                                value={address}
                                onChange={(e) => { setAddress(e.target.value) }}
                                placeholder='Address' />
                        </label>
                        <label>
                            City
                            <input
                                type='text'
                                value={city}
                                onChange={(e) => { setCity(e.target.value) }}
                                placeholder='City' />
                        </label>
                        <label>
                            State
                            <input
                                type='text'
                                value={state}
                                onChange={(e) => { setState(e.target.value) }}
                                placeholder='STATE' />
                        </label>

                        <label>
                            Latitude
                            <input
                                type='text'
                                value={lat}
                                onChange={(e) => { setLat(e.target.value) }}
                                placeholder='Latitude' />
                        </label>
                        <label>
                            Longitude
                            <input
                                type='text'
                                value={lng}
                                onChange={(e) => { setLng(e.target.value) }}
                                placeholder='Longitude' />
                        </label>
                    </div>
                    <div className="second-sect">
                        <h3>Describe your place to guests</h3>
                        <p>Mention the best features of your space, any special amentities like
                            fast wif or parking, and what you love about the neighborhood.</p>
                        <label>
                            <textarea
                                type='text'
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                                placeholder='Please write at least 30 characters' />
                        </label>
                    </div>
                    <div className="third-sect">
                        <h3>Create a title for your spot</h3>
                        <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.
                        </p>
                        <label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                placeholder='Name of your spot' />
                        </label>
                    </div>
                    <div className="fourth-sect">
                        <h3>Set a base price for your spot</h3>
                        <p>Competitive pricing can help your listing stand out and rank higher
                            in search results.</p>
                        <label>
                            <input
                                type='text'
                                value={price}
                                onChange={(e) => { setPrice(e.target.value) }}
                                placeholder='Price per night (USD)' />
                        </label>
                    </div>
                    <div className="fifth-sect">
                        <h3>Liven up your spot with photos</h3>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <input
                            type='text'
                            value={url}
                            onChange={(e) => { setUrl(e.target.value) }}
                            placeholder="Preview Image URL" />
                        <input type="text" placeholder="Image URL" />
                        <input type="text" placeholder="Image URL" />
                        <input type="text" placeholder="Image URL" />
                        <input type="text" placeholder="Image URL" />
                    </div>
                    <button type='submit'>Update your Spot</button>
                </form>
            </div>
        </div>
    )
}


export default EditSpot;
