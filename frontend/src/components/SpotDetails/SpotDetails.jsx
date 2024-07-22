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
        dispatch(spotsActions.getOneSpot(spotId))
        dispatch(reviewsActions.getAvgStars(spotId))
    }, [dispatch, spotId])
    const spot = useSelector((state) => { return state.spots.oneSpot });
    const avg = useSelector((state) => { return state.reviews.avgStars })
    // state.reviews.reviews? i dont want it to be too broad but it might need to be
    const numOfRev = useSelector((state) => { return state.reviews.numOfRev }) //instead state.reviews.length?
    if (!spot) return; // if i move this higher it breaks why?
    const correctUser = (user, spot) => {
        if (!user) { return false }
        if (user.id === spot.ownerId) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className="details-body">
            <div className="header-container-spotd">
                <h1 className="spotname-header">{spot.name}</h1>
                <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
            </div>
            <div className="one-spot">
                <div className="image-container">
                    {/* {console.log(spot)} */}
                    {spot.SpotImages.length >= 1 && <img src={spot.SpotImages[0].url} className="spot-detail-img one" />}
                    {spot.SpotImages.length >= 2 && <img src={spot.SpotImages[1].url} className="spot-detail-img two" />}
                    {spot.SpotImages.length >= 3 && <img src={spot.SpotImages[2].url} className="spot-detail-img three" />}
                    {spot.SpotImages.length >= 4 && <img src={spot.SpotImages[3].url} className="spot-detail-img four" />}
                    {spot.SpotImages.length === 5 && <img src={spot.SpotImages[4].url} className="spot-detail-img five" />}
                </div>
                <div className="middle-sect">
                    <div className="details-box">
                        <p>Hosted by: {spot.User.firstName}, {spot.User.lastName}</p>
                        <p>description: {spot.description}</p>
                    </div>
                    <div className="reserve-box">
                        <div className="reserve-text">
                            <p>{spot.price} night</p>
                            <div className="right-side-reserve">
                                <FiStar />
                                <p style={{ margin: '0px' }}>{isNaN(avg) ? 'New' : `${avg} · ${numOfRev}`}</p>
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
