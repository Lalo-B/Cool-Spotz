import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from '../../store/spots';
import * as reviewsActions from '../../store/reviews';
import { useEffect } from "react";
import './Spots.css';
import { useNavigate } from "react-router-dom";
import { FiStar } from "react-icons/fi";

const Spots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spots = useSelector((state) => { return state.spots.spots });
    const reviews = useSelector(state => state.reviews.allAvgReviews);
    useSelector((state) => { return state.session.user });


    useEffect(() => {
        async function innerFunct() {
            await dispatch(spotsActions.getAllThunk());
            await dispatch(reviewsActions.getAllSpotsReviews());
        }
        innerFunct();
    }, [dispatch])


    if (!spots) return;
    if (!reviews) return;
    const send = (id) => {
        navigate(`/spots/${id}`)
    }

    return (
        <div >
            <div className="second-heading">
                <h1 style={{ margin: '0px', color: '#5382f2' }}>Find Your Next Stay</h1>
                {/* put this in the middle of opening screen */}
            </div>
            <div className='main-body'>
                <div className="card-container">
                    <div className="inner-card-container">
                    {spots.map((spot) => {
                        let id = spot.id
                        let avg = reviews[id];
                        // console.log('this is avg star for each spot in spot component',avg);
                        let imgs = spot.SpotImages;
                        // console.log("🚀 ~ {spots.map ~ imgs:", imgs)
                        if (avg && avg.toString().length === 1) { avg = `${avg}.0` }
                        return (
                            <div key={id} className='spot-card tooltip' onClick={() => { send(id) }}>
                                <span className="tooltiptext">{spot.name}</span>
                                {imgs.length !== 0 && <img className="spot-img" src={imgs.length > 0 ? imgs[0].url : null} alt='' />}
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
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Spots;
