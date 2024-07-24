import { csrfFetch } from "./csrf";

const MAKE_REVIEW = 'reviews/make-review';
const DELETE_REVIEW = 'reviews/delete-review';
const GET_REVIEWS = 'reviews/get-reviews';
const AVERAGE_STAR = 'reviews/get-average-star';

const makeReview = (review) => {
    return {
        type: MAKE_REVIEW,
        payload: review
    }
}
const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        payload: review
    }
}
const getReviews = (review) => {
    return {
        type: GET_REVIEWS,
        payload: review
    }
}

const averageStar = (reviews) => {
    return {
        type: AVERAGE_STAR,
        payload: reviews
    }
}

export const getReviewsofSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews/user`);

    if (res.ok) {
        const data = await res.json();
        // console.log("🚀 ~ getReviewsofSpot ~ data:", data)
        dispatch(getReviews(data));
        return data;
    }
}

export const makeReviewThunk = (review, spotId) => async dispatch => {
    // console.log('this is review at very begining of make review thunk: ', review) this looks good
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'post',
        body: JSON.stringify(review)
    });

    if (res.ok) {
        const data = await res.json();
        console.log("🚀 ~ makeReviewThunk ~ data:", data)
        dispatch(makeReview(data));
        return data;
    }
}

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'delete',
    });
    if (res.ok) {
        dispatch(deleteReview(reviewId));
        return reviewId;
    }
}

export const getAvgStars = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews/user`);

    if (res.ok) {
        const data = await res.json();
        dispatch(averageStar(data));
        return data;
    }
}

const reviewsReducer = (state = { reviews: null }, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            return { ...state, reviews: action.payload };
        case MAKE_REVIEW:
            return { ...state, reviews: [...state.reviews, action.payload] };
        case DELETE_REVIEW: {
            const newState = { ...state };
            const newrevs = newState.reviews.filter((el)=>{return el.id !== action.payload});
            newState.reviews = newrevs;
            return newState;
        }
        case AVERAGE_STAR: {
            const newState = { ...state }
            console.log('this is payload in avg star reducer',action.payload)
            let count = 0;
            const num = action.payload.length;
            action.payload.forEach(el => {
                count = count + (+el.stars)
            });
            count = count / num;
            if (count.toString().length === 1) {
                newState.avgStars = `${count}.0`;
                newState.numOfRev = num;
                return newState
            } else if (count.toString().length > 2) {
                count = count.toString().slice(0,3)
                newState.avgStars = count;
                newState.numOfRev = num;
                return newState
            }

            newState.avgStars = count;
            newState.numOfRev = num;
            return newState
        }
        default:
            return state;
    }
};
export default reviewsReducer;
