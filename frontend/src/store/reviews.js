import { csrfFetch } from "./csrf";

const MAKE_REVIEW = 'reviews/make-review';
const DELETE_REVIEW = 'reviews/delete-review';
const GET_REVIEWS = 'reviews/get-reviews';

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

export const getReviewsofSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews/user`);

    if(res.ok){
        const data = await res.json();
        // console.log("🚀 ~ getReviewsofSpot ~ data:", data)
        dispatch(getReviews(data));
        return data;
    }
}

export const makeReviewThunk = (review,spotId) => async dispatch => {
    const res = csrfFetch(`/api/${spotId}/reviews`,{
        method: 'post',
        body: JSON.stringify(review)
    });
    if(res.ok){
        const data = await res.data();
        dispatch(makeReview(data));
        return data;
    }
}

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`,{
        method: 'delete',
    });
    if(res.ok){
        dispatch(deleteReview(reviewId));
        return reviewId;
    }
}

const reviewsReducer = (state={reviews: null},action) => {
    switch (action.type){
        case GET_REVIEWS:
            return {...state, reviews: action.payload};
        case MAKE_REVIEW:
            return {...state, oneReview: action.payload};
        case DELETE_REVIEW:{
            const newState = {...state};
            delete newState.oneReview;
            return newState;
        }
        default:
            return state;
    }
};
export default reviewsReducer;
