import { useState } from "react";
import * as reviewsActions from '../../store/reviews';
import { useDispatch } from "react-redux";

const MakeReviewModal = () => {
    const [review,setReview] = useState();
    const [star,setStar] = useState();
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        const reviewObj = {review,star};
        dispatch(reviewsActions.makeReviewThunk(reviewObj))
    }
    return (
        <>
          <h1>make a review</h1>
          <form onSubmit={onSubmit}>
            <label>
                review:
                <input value={review} onChange={(e)=>{setReview(e.target.value)}}/>
            </label>
            <label>
                stars:
                <input />
            </label>
          </form>
        </>
    )
}
export default MakeReviewModal;
