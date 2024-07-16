import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from '../../store/spots';
import { useEffect, useState } from "react";
import './Spots.css';
import { useNavigate } from "react-router-dom";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import AddSpotModal from "../AddSpotModal/AddSpotModal";
// import Spotsimgs from '../SpotsImgs/SpotsImgs';
// import { SiPortswigger } from "react-icons/si";

const Spots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function innerFunct() {
            const res = await dispatch(spotsActions.getAllThunk());
            const imgRes = await dispatch(spotsActions.getAllImg());
        }
        innerFunct();
    }, [dispatch])

    const spots = useSelector((state) => { return state.spots.spots })
    const spotImgs = useSelector((state) => { return state.spots.spotImgs });
    const user = useSelector((state)=>{ return state.session.user})
    // console.log("🚀 ~ Spots ~ user:", user)
    if (!spots) return;
    if (!spotImgs) return;
    const send = (id) => {
        navigate(`/spots/${id}`)
    }

    return (
        <>
        <div className="upper-text">
            <h1>Spots</h1>
            {user && <OpenModalButton
            buttonText={'Add Spot'}
            modalComponent={<AddSpotModal/>}/>}
        </div>
            <div className="card-container">
                {spots.map((spot) => {
                    let id = spot.id
                    return (
                        <div key={id} className='spot-card tooltip' onClick={() => { send(id) }}>
                            <span className="tooltiptext">{spot.name}</span>
                            <img className="spot-img" src={spotImgs[id - 1].url} />
                            <div className="card-text">
                                <p className="card-text">{spot.city}</p>
                                <p className="card-text">{spot.state}</p>
                                <p className="card-text">{spot.price} night</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default Spots;
