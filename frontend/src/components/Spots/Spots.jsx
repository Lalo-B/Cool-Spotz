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
    const reviews = useSelector(state => state.reviews.allReviews);
    useSelector((state) => { return state.session.user });


    useEffect(() => {
        async function innerFunct() {
            await dispatch(spotsActions.getAllThunk());
            await dispatch(reviewsActions.getAllSpotsReviews());
        }
        innerFunct();
    }, [dispatch])

    const avgStars = (spots, reviews) => {
        let count = 0;
        // spots.forEach(el => {
        //     el.avgRating = reviews[el.spotId]
        // });
        
        // const num = action.payload.length;
        // action.payload.forEach(el => {
        //     count = count + (+el.stars)
        // });
        // count = count / num;
        // if (count.toString().length === 1) {
        //     newState.avgStars = `${count}.0`;
        //     return newState
        // } else if (count.toString().length > 2) {
        //     count = count.toString().slice(0, 3)
        //     newState.avgStars = count;
        //     return newState
        // }
        // newState.avgStars = count;
    };

    // get the avg review
    // useEffect(()=>{
    //     if(spots && reviews){
    //         const newAvg = reviews.forEach((el)=>{})
    //         spots.forEach(el => {
    //             el.avg = reviews[el.id]
    //         });
    //     }
    // },[reviews,spots])

    console.log(reviews)
    if (!spots) return;
    if (!reviews) return;
    const send = (id) => {
        navigate(`/spots/${id}`)
    }

    return (
        <>
            <div className="second-heading">
                <h1 style={{ margin: 'auto', color: '#5382f2' }}>Find Your Next Stay</h1>
                {/* put this in the middle of opening screen */}
            </div>
            <div className="card-container">
                {spots.map((spot) => {
                    let id = spot.id
                    let avg = spot.averageRating;
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
        </>
    )
}
export default Spots;
