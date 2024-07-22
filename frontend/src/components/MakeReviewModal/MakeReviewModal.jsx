import { useEffect, useState } from "react";
import * as reviewsActions from '../../store/reviews';
import { useDispatch, useSelector } from "react-redux";
import { FiStar } from "react-icons/fi";
import './MakeReviewModal.css';
import { useModal } from '../../context/Modal.jsx';


const MakeReviewModal = ({ spotId }) => {
    const { closeModal } = useModal()

    const [review, setReview] = useState();
    const [star, setStar] = useState();
    const [rating, setRating] = useState(0);
    const [activeRating, setActiveRating] = useState(rating);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const err = {};
    const disabled = false;
    let res;
    useSelector((state) => { return state.session.user })

    useEffect(() => {
        setActiveRating(rating);
        setStar(rating);
    }, [rating]);

    useEffect(() => {
        if (review) {
            if (review.length < 10) {
                err.buttonDisabled = true;
            }

            // console.log('this is review', review)
            if (review.length >= 10 && star) {
                err.buttonDisabled = false;
            }
        }
        if (!review) {
            err.buttonDisabled = true;
        }
        // console.log('this is star', star)
        if (!star) {
            err.buttonDisabled = true;
        }

        setErrors(err)
    }, [star, review])

    const onSubmit = (e) => {
        e.preventDefault();
        // setStar(rating);
        const reviewObj = { review, stars: star };
        res = dispatch(reviewsActions.makeReviewThunk(reviewObj, spotId))
        // dispatch(reviewsActions.getAvgStars(spot.id))
        if (res.errors) setErrors(res.errors);
        closeModal();
    };

    const onChange = (number) => {
        setRating(parseInt(number));
    };

    return (
        <div className="outer-box-rev">
            <h2 id='heading'>How was your stay?</h2>
            {errors.errors ? <p>{errors.errors}</p> : null}
            <form onSubmit={onSubmit} className="review-form">
                <textarea className='text-box' value={review} onChange={(e) => { setReview(e.target.value) }} placeholder="Leave your review here..." />
                <div className="rating-input">
                    <div
                        className={activeRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => { if (!disabled) setActiveRating(1) }}
                        onMouseLeave={() => { if (!disabled) setActiveRating(rating) }}
                        onClick={() => { if (!disabled) onChange(1) }}
                    >
                        <FiStar />
                    </div>
                    <div
                        className={activeRating >= 2 ? "filled" : "empty"}
                        onMouseEnter={() => { if (!disabled) setActiveRating(2) }}
                        onMouseLeave={() => { if (!disabled) setActiveRating(rating) }}
                        onClick={() => { if (!disabled) onChange(2) }}
                    >
                        <FiStar />
                    </div>
                    <div
                        className={activeRating >= 3 ? "filled" : "empty"}
                        onMouseEnter={() => { if (!disabled) setActiveRating(3) }}
                        onMouseLeave={() => { if (!disabled) setActiveRating(rating) }}
                        onClick={() => { if (!disabled) onChange(3) }}
                    >
                        <FiStar />
                    </div>
                    <div
                        className={activeRating >= 4 ? "filled" : "empty"}
                        onMouseEnter={() => { if (!disabled) setActiveRating(4) }}
                        onMouseLeave={() => { if (!disabled) setActiveRating(rating) }}
                        onClick={() => { if (!disabled) onChange(4) }}
                    >
                        <FiStar />
                    </div>
                    <div
                        className={activeRating >= 5 ? "filled" : "empty"}
                        onMouseEnter={() => { if (!disabled) setActiveRating(5) }}
                        onMouseLeave={() => { if (!disabled) setActiveRating(rating) }}
                        onClick={() => { if (!disabled) onChange(5) }}
                    >
                        <FiStar />
                    </div>
                    <p>Stars</p>
                </div>
                <button className={'review-button ' +(errors.buttonDisabled ? 'isdisabled' : 'notdisabled')}
                    disabled={!review || review.length < 10 ? true : false}>Submit Your Review</button>
            </form>
        </div>
    )
}
export default MakeReviewModal;
