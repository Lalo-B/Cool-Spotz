import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from '../../store/spots';
import { useEffect, useState } from "react";
import './Spots.css';
import { useNavigate } from "react-router-dom";
// import Spotsimgs from '../SpotsImgs/SpotsImgs';
// import { SiPortswigger } from "react-icons/si";

const Spots = () => {
    //dispatch to get all spots
    // render them
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
    if (!spots) return;
    if (!spotImgs) return;
    const send = (id) => {
        navigate(`/spots/${id}`)
    }

    return (
        <>
            <h1>Spots</h1>
            <div className="card-container">
                {spots.map((spot) => {
                    let id = spot.id
                    return (
                        <div key={id} className='spot-card' onClick={() => { send(id) }}>
                            <img className="spot-img" src={spotImgs[id - 1].url} />
                            <div className="card-text">
                                <p className="card-text">{spot.city}</p>
                                <p className="card-text">{spot.state}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default Spots;
