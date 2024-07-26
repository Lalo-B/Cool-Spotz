import { useEffect, useState } from "react";
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
    const [errors, setErrors] = useState('')
    const dispatch = useDispatch();
    const err = {};

    const isValidUrl = urlString => {
        if(urlString.includes('www') || urlString.includes('https://') || urlString.includes('.jpeg')){
            return true
        } else {
            return false
        }
    };


    //these need to be in onsubmit not before that
    useEffect(() => {
        if (lat > 180 || lat < -180) {
            err.lat = "latitude must be between -180 and 180"
        }
        if (lng > 180 || lng < -180) {
            err.lng = "longitude must be between -180 and 180"
        }
        if (name.length > 50) {
            err.name = 'name must be less than 50 characters'
        }
        if (price < 1) {
            err.price = 'Price per day must be a positive number'
        }
        const urValid = isValidUrl(url)
        if (!urValid) {
            err.url = 'must be a valid url'
        }
        setErrors(err)
    }, [lat, lng,name,url,price]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const newSpot = {
            address, city, state, country,
            lat, lng, name, description, price
        };
        const res = await dispatch(spotsActions.addSpot(newSpot))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    console.log(data.errors)
                    setErrors(data.errors);
                }
            })

        await dispatch(spotsActions.addImgThunk(res.id, url))
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
                                required
                                type='text'
                                value={country}
                                onChange={(e) => { setCountry(e.target.value) }}
                                placeholder='Country' />
                        </label>
                        {errors.country && <p className='errors'>{errors.country}</p>}
                        <label>
                            Street Address
                            <input
                                type='text'
                                required
                                value={address}
                                onChange={(e) => { setAddress(e.target.value) }}
                                placeholder='Address' />
                        </label>
                        {errors.address && <p className='errors'>{errors.address}</p>}
                        <label>
                            City
                            <input
                                type='text'
                                required
                                value={city}
                                onChange={(e) => { setCity(e.target.value) }}
                                placeholder='City' />
                        </label>
                        {errors.city && <p className='errors'>{errors.city}</p>}
                        <label>
                            State
                            <input
                                type='text'
                                required
                                value={state}
                                onChange={(e) => { setState(e.target.value) }}
                                placeholder='STATE' />
                        </label>
                        {errors.state && <p className='errors'>{errors.state}</p>}
                        <label>
                            Latitude
                            <input
                                type='number'
                                value={lat}
                                onChange={(e) => { setLat(e.target.value) }}
                                placeholder='Latitude' />
                        </label>
                        {errors.lat && <p className='errors'>{errors.lat}</p>}
                        <label>
                            Longitude
                            <input
                                type='number'
                                value={lng}
                                onChange={(e) => { setLng(e.target.value) }}
                                placeholder='Longitude' />
                        </label>
                        {errors.lng && <p className='errors'>{errors.lng}</p>}
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
                        {errors.description && <p>{errors.description}</p>}
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
                        {errors.name && <p className='errors'>{errors.name}</p>}
                    </div>
                    <div className="fourth-sect">
                        <h3>Set a base price for your spot</h3>
                        <p>Competitive pricing can help your listing stand out and rank higher
                            in search results.</p>
                        <label>
                            <input
                                type='number'
                                value={price}
                                onChange={(e) => { setPrice(e.target.value) }}
                                placeholder='Price per night (USD)' />
                        </label>
                        {errors.price && <p className='errors'>{errors.price}</p>}
                    </div>
                    <div className="fifth-sect">
                        <h3>Liven up your spot with photos</h3>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        {errors.url && <p className='errors'>{errors.url}</p>}
                        <input
                            type='url'
                            value={url}
                            onChange={(e) => { setUrl(e.target.value) }}
                            placeholder="Preview Image URL"
                            required />
                        <input type="text" placeholder="Image URL" />
                        <input type="text" placeholder="Image URL" />
                        <input type="text" placeholder="Image URL" />
                        <input type="text" placeholder="Image URL" />
                    </div>
                    <button type='submit' disabled={Object.values(errors).length ? true : false}>Create Spot</button>
                    <button onClick={autoFill}>autofill spot</button>
                </form>
            </div>
        </div>
    )
}
export default AddSpot;
