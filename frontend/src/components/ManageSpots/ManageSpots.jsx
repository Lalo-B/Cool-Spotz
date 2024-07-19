import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from '../../store/spots';
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import './ManageSpots.css';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => { return state.session.user });

    useEffect(() => {
        dispatch(spotsActions.getUserSpots(user.id))
    }, [dispatch, user.id]);

    const spots = useSelector((state => { return state.spots.spots }))
    if (!spots) return;

    const send = (id) => {
        navigate(`/spots/${id}`)
    };

    const correctUser = (user, spot) => {
        if (user.id === spot.ownerId) {
            return true
        } else {
            return false
        }
    };

    return (
        <div className="super-big-box">
            <h1>Manage Spots</h1>
            {!spots && <NavLink to='/newSpot'>Create a New Spot</NavLink>}
            {spots.map((spot) => {
                let id = spot.id
                let avg = spot.averageRating;
                let imgs = spot.SpotImages;
                if (avg && avg.toString().length === 1) { avg = `${avg}.0` }
                return (
                    <>
                        <div key={id} className='spot-card tooltip' onClick={() => { send(id) }}>
                            <span className="tooltiptext">{spot.name}</span>
                            <img className="spot-img" src={imgs ? imgs[0].url : null} alt='' />
                            <div className="card-text-box">
                                <div className="left-text">
                                    <p className="card-text">{spot.city}, {spot.state}</p>
                                    <p className="card-text">{spot.price} night</p>
                                </div>
                                <div className="right-text">
                                    <FiStar />
                                    <p id='rating'>{avg ? avg : 'New'}</p>
                                </div>
                            </div>
                        </div>
                        {correctUser(user, spot) && <NavLink to='/edit-spot'> Update </NavLink>}
                        {correctUser(user, spot) && <OpenModalButton
                            buttonText='delete spot'
                            modalComponent={<DeleteSpotModal spot={spot} />}
                        />}
                    </>
                )
            })}
        </div>
    )
}
export default ManageSpots;
