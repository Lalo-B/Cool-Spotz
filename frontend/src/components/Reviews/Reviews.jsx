import { useDispatch, useSelector } from 'react-redux';
import './Reviews.css';
import { useEffect, useState } from 'react';
import * as reviewsActions from '../../store/reviews.js';

const Reviews = ({props}) => {
    const spot = props.spot;
    const user = props.user;
    const dispatch = useDispatch();
    const [isOwner,setIsOwner] = useState(false);

    useEffect(()=>{
        dispatch(reviewsActions.getReviewsofSpot(spot.id))
        if(user.id === spot.ownerId){setIsOwner(true)};
    },[dispatch,spot]);

    const {reviews} = useSelector((state)=>{ return state.reviews});

    if(!reviews)return;
    console.log("🚀 ~ Reviews ~ reviews:", reviews)

    return (
        <>
            <h2>reviews</h2>
            {reviews.map((rev)=>{
                return (
                    <div key={rev.id}>
                        <p>review: {rev.review}</p>
                    </div>
                )
            })}
            {isOwner ? null : <button>write a review</button>}
        </>
    )
}
export default Reviews;
