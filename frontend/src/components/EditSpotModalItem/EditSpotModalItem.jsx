import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from '../../store/spots'

const EditSpotModalItem = ({spot}) => {
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const dispatch = useDispatch();
    const user = useSelector((state)=>{ return state.session.user})
    // console.log("🚀 ~ EditSpotModalItem ~ user:", user)

    // console.log('this is the spot',spot)

    const onSubmit = async (e) => {
        e.preventDefault();
        const update = {
            id: spot.id,
            averageRating: spot.averageRating,
            address,city,state,country,
            lat,lng,name,description,price,
            ownerId: spot.ownerId
        };
        // console.log(update.id)
        const data = await dispatch(spotsActions.editSpot(update, user))
        // return data;
    }
    return (
        <>
            <h1>Edit your spot</h1>
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
                <button type='submit'>submit</button>
            </form>
        </>
    )
}
export default EditSpotModalItem;
