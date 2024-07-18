import { useEffect, useState } from "react";
import * as reviewsActions from '../../store/reviews';
import { useDispatch } from "react-redux";
import { FiStar } from "react-icons/fi";
import './MakeReviewModal.css';

const MakeReviewModal = () => {
    const [review, setReview] = useState();
    const [star, setStar] = useState();
    const [rating, setRating] = useState(0);
    const [activeRating, setActiveRating] = useState(rating);
    const [errors,setErrors] = useState({});
    const dispatch = useDispatch();
    const disabled = false;
    let res;

    useEffect(() => {
        setActiveRating(rating);
        // console.log(rating)
        // console.log(activeRating)
    }, [rating]);

    const onSubmit = (e) => {
        e.preventDefault();
        const reviewObj = { review, star };
        res = dispatch(reviewsActions.makeReviewThunk(reviewObj))
        if(res.errors)setErrors(res.errors)
    };

    const onChange = (number) => {
        setRating(parseInt(number));
    };

    return (
        <div className="outer-box">
            <h2 id='heading'>How was your stay?</h2>
            {errors.errors ? <p>{errors.errors}</p> : null}
            <form onSubmit={onSubmit} id='form'>
                <textarea className='text-box' value={review} onChange={(e) => { setReview(e.target.value) }} placeholder="Just a quick review." />
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
                <button id='button' >Submit Your Review</button>
            </form>
        </div>
    )
}
export default MakeReviewModal;
