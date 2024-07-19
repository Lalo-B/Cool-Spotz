import { NavLink, useParams } from "react-router-dom";
import "./SpotDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as spotsActions from '../../store/spots';
import * as reviewsActions from '../../store/reviews.js';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import Reviews from "../Reviews/Reviews";
import { FiStar } from "react-icons/fi";

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => { return state.session.user });


    useEffect(() => {
        async function innerFunction() {
            dispatch(spotsActions.getOneSpot(spotId))
            dispatch(reviewsActions.getAvgStars(spotId))
        }
        innerFunction();
    }, [dispatch, spotId])
    const spot = useSelector((state) => { return state.spots.oneSpot });
    // console.log("🚀 ~ SpotDetails ~ spot:", spot)
    const avg = useSelector((state)=> { return state.reviews.avgStars})
    const numOfRev = useSelector((state)=>{ return state.reviews.numOfRev})
    if (!spot) return; // if i move this higher it breaks why?
    const correctUser = (user, spot) => {
        if (user.id === spot.ownerId) {
            return true
        } else {
            return false
        }
    }
    // console.log(spot)

    return (
        <div className="details-body">
            <div className="one-spot">
                <img src={spot.SpotImages[0].url} className="spot-detail-img" />
                <div className="middle-sect">
                    <div className="details-box">
                        <h1>{spot.name}</h1>
                        <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
                        <p>Hosted by: {spot.User.firstName} {spot.User.lastName}</p>
                        <p>description: {spot.description}</p>
                    </div>
                    <div className="reserve-box">
                        <div className="reserve-text">
                            <p>{spot.price} night</p>
                            <div className="right-side-reserve">
                                <FiStar />
                                <p style={{margin:'0px'}}>{avg ? `${avg} · ${numOfRev}` : 'New'}</p>

                            </div>
                        </div>
                        <button onClick={() => { alert('feature coming soon') }} className="reserve-button">reserve spot</button>
                    </div>
                </div>
            </div>
            {correctUser(user, spot) && <NavLink to='/edit-spot'> Update </NavLink>}
            {correctUser(user, spot) && <OpenModalButton
                buttonText='delete spot'
                modalComponent={<DeleteSpotModal spot={spot} />}
                />}

            <div className="reviews-box">
                <Reviews props={{ spot, user }} />
            </div>
        </div>
    )
}
export default SpotDetails;
