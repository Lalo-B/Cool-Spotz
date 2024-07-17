import { useDispatch, useSelector } from 'react-redux';
import './Reviews.css';
import { useEffect, useState } from 'react';
import * as reviewsActions from '../../store/reviews.js';
import { FiStar } from "react-icons/fi";
import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
import MakeReviewModal from '../MakeReviewModal/MakeReviewModal.jsx';


const Reviews = ({ props }) => {
    const spot = props.spot;
    const user = props.user;
    const dispatch = useDispatch();
    const [isOwner, setIsOwner] = useState(false);
    const monthObj = { '01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': "december" };
    let hasRev;

    useEffect(() => {
        dispatch(reviewsActions.getReviewsofSpot(spot.id))
        if (user.id === spot.ownerId) { setIsOwner(true) };
        // hasRev = reviews.find((r)=>{
        //     return r.User.id === user.id
        // });
    }, [dispatch, spot]);

    const { reviews } = useSelector((state) => { return state.reviews });
    if (!reviews) return;

    console.log(hasRev);

    return (
        <>
            <div className='reviews-header'>
                <div className='review-header-box'>
                    <FiStar />
                    <p>{spot.averageRating ? spot.averageRating : '#.#'}  {reviews.length}</p>
                    <h2>reviews</h2>
                </div>
            </div>
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
            {isOwner ? null : <OpenModalButton
            buttonText='Post Your Review'
            modalComponent={<MakeReviewModal className='rev-button'/>}/>}
            {/* how to get styles onto the modal for cursor pointer */}
            {/* {isOwner || hasRev ? <p>yes owner or has reviewed</p> : <p>you get to review here</p>} */}
        </>
    )
}
export default Reviews;
