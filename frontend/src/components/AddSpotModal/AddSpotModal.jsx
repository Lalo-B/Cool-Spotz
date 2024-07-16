import { useState } from "react";
import { useDispatch } from "react-redux";
import * as spotsActions from '../../store/spots.js';

const AddSpotModal = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    // const [url,setUrl] = useState('');
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        const newSpot = {
            address,city,state,country,
            lat,lng,name,description,price,
            ownerId: ''//user.id
        };
        dispatch(spotsActions.addSpot(newSpot))
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
        setPrice('999');
        // setUrl('https://media.istockphoto.com/id/1272163106/photo/…20&c=WEwH-MlAqCy2kSbnaWf1ZQLHhQJHUT3avWrSacFo3Ls=')
        //right now it breaks cuz it needs url in spots.jsx
    }
    return (
        <>
            <h1>Add a Spot</h1>
            <form onSubmit={onSubmit}>
                <label>
                    Address:
                    <input
                        type='text'
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }} />
                </label>
                <label>
                    City:
                    <input
                        type='text'
                        value={city}
                        onChange={(e) => { setCity(e.target.value) }} />
                </label>
                <label>
                    State:
                    <input
                        type='text'
                        value={state}
                        onChange={(e) => { setState(e.target.value) }} />
                </label>
                <label>
                    Country:
                    <input
                        type='text'
                        value={country}
                        onChange={(e) => { setCountry(e.target.value) }} />
                </label>
                <label>
                    Latitude:
                    <input
                        type='text'
                        value={lat}
                        onChange={(e) => { setLat(e.target.value) }} />
                </label>
                <label>
                    Longitude:
                    <input
                        type='text'
                        value={lng}
                        onChange={(e) => { setLng(e.target.value) }} />
                </label>
                <label>
                    Name:
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }} />
                </label>
                <label>
                    Description:
                    <input
                        type='text'
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }} />
                </label>
                <label>
                    Price:
                    <input
                        type='text'
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }} />
                </label>
                <label>
                    Img Url:
                    <input
                        type='text'
                        value={url}
                        onChange={(e) => { setUrl(e.target.value) }} />
                </label>
                <button type='submit'>submit</button>
                <button onClick={autoFill}>autofill spot</button>
            </form>
        </>
    )
}
export default AddSpotModal;
