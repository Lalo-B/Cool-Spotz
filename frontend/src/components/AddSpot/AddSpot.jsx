import { useState } from "react";
import { useDispatch } from "react-redux";
import * as spotsActions from '../../store/spots.js';
import './AddSpot.css';
import { useNavigate } from "react-router-dom";

const AddSpot = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        const newSpot = {
            address, city, state, country,
            lat, lng, name, description, price
        };
        const res = await dispatch(spotsActions.addSpot(newSpot));
        await dispatch(spotsActions.addImgThunk(res.id,url))
        navigate(`/spots/${res.id}`);
    }

    const autoFill = (e) => {
        e.preventDefault();
        setAddress('123 s street st');
        setCity('coolCity');
        setState('midState');
        setCountry('murica');
        setLat(48.8584);
        setLng(2.2945);
        setName('new spot');
        setDescription('The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal.');
        setPrice('99');
        setUrl('https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
        //right now it breaks cuz it needs url in spots.jsx
    }
    return (
        <div className="biggest">
            <div className="big-box">
                <div className="head-box">
                    <h1 className="headers">Create a new Spot</h1>
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
                    <button type='submit'>Create Spot</button>
                    <button onClick={autoFill}>autofill spot</button>
                </form>
            </div>
        </div>
    )
}
export default AddSpot;
