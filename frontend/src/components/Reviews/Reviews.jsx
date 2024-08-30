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
    const canDelete = (rev, user) => {
        if (user && user.id === rev.User.id) {
            return true
        } else {
            return false
        }
    };

    useEffect(() => {
        dispatch(reviewsActions.getReviewsofSpot(spot.id))
        dispatch(reviewsActions.getAvgStars(spot.id))
        if (user && user.id === spot.ownerId) { setIsOwner(true) }
    }, [dispatch, spot, user]);

    const reviews = useSelector((state) => { return state.reviews.reviews });
    const reviewsFlip = (reviews) => {
        const flip = reviews.toReversed();
        return flip;
    };
    let flipped;
    if (reviews) {
        flipped = reviewsFlip(reviews);
        // console.log("🚀 ~ Reviews ~ flipped:", flipped)

    }
    const canreview = (reviews, isOwner) => {
        if (user) {
            let rev = reviews.find((review) => { return user.id === review.userId })
            if (rev && isOwner) {
                return false;
            } else if (rev) {
                return false;
            } else if (isOwner) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }

    }

useEffect(()=>{
    dispatch(reviewsActions.getAvgStars(spot.id))
},[dispatch,flipped,spot.id])

    // reviews structure: [{id,spotId,userId,review,stars,User:{id,firstName,lastName,username}},...]




    const avgStars = useSelector((state) => { return state.reviews.avgStars });
    // shouldnt these cause a rerender when we update the state with a new review?
    if (!reviews) return;


    return (
        <>
            <div className='reviews-header'>
                <div className={'review-header-box ' + (isNaN(avgStars) ? 'shouldb-skinny' : '')}>
                    <FiStar />
                    <p>{isNaN(avgStars) ? 'New' : `${avgStars} · ${reviews.length}`}</p>
                    <p className={reviews.length === 0 ? 'hidden-h' : ''}>{reviews.length > 1 ? 'reviews' : 'review'}</p>
                </div>
            </div>
            {canreview(reviews, isOwner) ? <OpenModalButton
                buttonText='Post Your Review'
                modalComponent={<MakeReviewModal className='modal-comp' spotId={spot.id} />} />
                : null}
            {reviews.length === 0 ? <p>Be the first to post a review!</p> : null}
            {flipped && flipped.map((rev) => {
                const monthNum = rev.createdAt.slice(5, 7);
                const month = monthObj[monthNum];
                return (
                    <div key={rev.id} className='review'>
                        <h4 className='review-items'>{rev.User.firstName}</h4>
                        <p className='review-items'>{month} 20{rev.createdAt.slice(2, 4)}</p>
                        <p className='review-items'>{rev.review}</p>
                        {canDelete(rev, user) ? <OpenModalButton
                            buttonText='Delete'
                            modalComponent={<DeleteReviewModal revId={rev.id} />} /> : null}
                    </div>
                )
            })}
            {!flipped && !isOwner && <p>Be the first to post a review!</p>}
        </>
    )
}
export default Reviews;
