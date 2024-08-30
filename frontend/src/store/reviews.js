import { csrfFetch } from "./csrf";

const MAKE_REVIEW = 'reviews/make-review';
const DELETE_REVIEW = 'reviews/delete-review';
const GET_REVIEWS = 'reviews/get-reviews';
const AVERAGE_STAR = 'reviews/get-average-star';
const GET_ALL_REVIEWS = 'reviews/get-all-reviews';

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

const getAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        payload: reviews
    }
}

export const getReviewsofSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews/user`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getReviews(data));
        return data;
    }
}

export const makeReviewThunk = (review, spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'post',
        body: JSON.stringify(review)
    });

    if (res.ok) {
        const data = await res.json();
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

// this is for the average review number not actually used for the content of the reviews
export const getAllSpotsReviews = () => async dispatch => {
    const res = await csrfFetch('/api/reviews/allSpots');
    const spotsRes = await csrfFetch('/api/spots');

    if (res.ok) {
        const data = await res.json();
        const {Spots} = await spotsRes.json();
        const middleObj = {};
        for (const revId in data) {
            const { spotId } = data[revId];
            const temp = middleObj[spotId];
            middleObj[spotId] = { ...temp, [revId]: { ...data[revId] } };
        }
        let newObj = {};
        let total;
        Spots.forEach(spot => {
            if (middleObj[spot.id]) {
                const spotsRevs = middleObj[spot.id];
                const count = Object.values(spotsRevs).length;
                total = 0;
                for (const rev in spotsRevs) {
                    let star = +spotsRevs[rev].stars;
                    total += +star;
                }
                total = +total / +count;
                if (total.toString().length === 1) {
                    total = `${total}.0`;
                } else if (total.toString().length > 2) {
                    total = total.toString().slice(0, 3)
                }
                // spot.averageRating = +total;
            }
            newObj = {...newObj, [spot.id]: +total}
        });
        dispatch(getAllReviews(newObj));
        return newObj;
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
            const newrevs = newState.reviews.filter((el) => { return el.id !== action.payload });
            newState.reviews = newrevs;
            return newState;
        }
        case AVERAGE_STAR: {
            const newState = { ...state }
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
                count = count.toString().slice(0, 3)
                newState.avgStars = count;
                newState.numOfRev = num;
                return newState
            }
            newState.avgStars = count;
            newState.numOfRev = num;
            return newState
        }
        case GET_ALL_REVIEWS: {
            const newState = { ...state, allAvgReviews: action.payload }
            return newState;
        }
        default:
            return state;
    }
};
export default reviewsReducer;
