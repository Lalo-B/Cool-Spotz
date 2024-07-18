import { useDispatch, useSelector } from 'react-redux';
import './Reviews.css';
import { useEffect, useState } from 'react';
import * as reviewsActions from '../../store/reviews.js';
import { FiStar } from "react-icons/fi";
import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
import MakeReviewModal from '../MakeReviewModal/MakeReviewModal.jsx';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal.jsx'


const Reviews = ({ props }) => {
    const spot = props.spot;
    const user = props.user;
    const dispatch = useDispatch();
    const [isOwner, setIsOwner] = useState(false);
    const monthObj = { '01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': "december" };
    const canDelete = () => {

    }

    useEffect(() => {
        dispatch(reviewsActions.getReviewsofSpot(spot.id))
        dispatch(reviewsActions.getAvgStars(spot.id))
        if (user.id === spot.ownerId) { setIsOwner(true) }
    }, [dispatch, spot, user.id]);

    const { reviews } = useSelector((state) => { return state.reviews });
    const avgStars = useSelector((state)=>{ return state.reviews.avgStars});
    if (!reviews) return;


    return (
        <>
            <div className='reviews-header'>
                <div className='review-header-box'>
                    <FiStar />
                    <p>{avgStars ? `${avgStars} · ${reviews.length}` : 'New'}</p>
                    <h2>{reviews.length > 1 ? 'reviews' : 'review'}</h2>
                </div>
            </div>
            {isOwner ? null : <OpenModalButton
                className='rev-button'
                buttonText='Post Your Review'
                modalComponent={<MakeReviewModal className='modal-comp' spotId={spot.id}/>} />}
            {reviews.map((rev) => {
                const monthNum = rev.createdAt.slice(5, 7);
                const month = monthObj[monthNum];
                return (
                    <div key={rev.id} className='review'>
                        <h4 className='review-items'>{rev.User.firstName}</h4>
                        <p className='review-items'>{month} 20{rev.createdAt.slice(2, 4)}</p>
                        <p className='review-items'>review: {rev.review}</p>
                    </div>
                )
            })}
            <OpenModalButton
                buttonText='delete review'
                modalComponent={<DeleteReviewModal spotId={spot.id}/>} />
        </>
    )
}
export default Reviews;
