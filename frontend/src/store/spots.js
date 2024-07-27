import { csrfFetch } from "./csrf";

const MAKE_ONE = 'spots/makeOne';
const GET_ALL = 'spots/getAll';
const EDIT = 'spots/edit';
const REMOVE_ONE = 'spots/removeOne';
const GET_ONE = 'spots/getOne';
const GET_ONE_IMG = 'spots/getOneImg';
const ADD_IMAGE = 'spots/addImage';
const GET_USER_SPOTS = 'spots/get-user-spots';


const makeOne = (spot) => {
    return {
        type: MAKE_ONE,
        payload: spot
    };
};

const getAll = (spots) => {
    return {
        type: GET_ALL,
        payload: spots
    };
};

const edit = (spot) => {
    return {
        type: EDIT,
        payload: spot
    };
};

const removeOne = (spot) => {
    // maybe change to spot id later?
    return {
        type: REMOVE_ONE,
        payload: spot
    };
};


const getOne = (spot) => {
    return {
        type: GET_ONE,
        payload: spot
    }
}

const getOneImg = (img) => {
    return {
        type: GET_ONE_IMG,
        payload: img
    }
}

const addImg = (img) => {
    return {
        type: ADD_IMAGE,
        payload: img
    }
}

const userSpots = (spots) => {
    return {
        type: GET_USER_SPOTS,
        payload: spots
    }
}


export const getAllThunk = () => async dispatch => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
        const data = await res.json();
        dispatch(getAll(data.Spots)) //or just data?
        return data.Spots;
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const getOneSpot = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${+id}`);

    if (res.ok) {
        const data = await res.json();
        // console.log('this is one spot', data.spotInfo[0]);
        console.log('inside the get one spot thunk')
        dispatch(getOne(data.spotInfo[0]));
        return data.spotInfo[0];
    }
}

export const getOneImgThunk = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spot-images/${id}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getOneImg(data));
        return data
    }
}

export const editSpot = (spot) => async dispatch => {
    const spotId = spot.id
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify(spot),
    });

    if (res.ok) {
        const data = await res.json();
        console.log('did we edit propperly?', data)
        dispatch(edit(data));
        return data;
    }
}

export const deleteSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'delete',
    })

    if (res.ok) {
        const data = await res.json();
        console.log("🚀 ~ deleteSpot ~ data:", data)
        dispatch(removeOne(spotId));
        return data;
    }
}

export const addSpot = (spot) => async dispatch => {

    const res = await csrfFetch('/api/spots', {
        method: 'post',
        body: JSON.stringify(spot)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(makeOne(data));
        return data;
    }
}

export const addImgThunk = (id, url) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}/images`, {
        method: 'post',
        headaers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url })
    });

    if (res.ok) {
        const data = await res.json();
        // console.log("🚀 ~ addImgThunk ~ data:", data)
        dispatch(addImg(data));
        return data;
    }
}

export const getUserSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots/current');

    if (res.ok) {
        const data = await res.json();
        console.log('this is user spots', data)
        dispatch(userSpots(data));
        return data;
    }
}
const spotsReducer = (state = { spots: null }, action) => {
    switch (action.type) {
        case GET_ALL:{
            const newState = {...state, spots: action.payload}
            return newState;
        }
        case MAKE_ONE: {
            const newState = { ...state }
            newState.spots.push(action.payload);
            // console.log('this is new state checking for arr length',newState);
            return newState;
        }
        case REMOVE_ONE: {
            const newState = { ...state, spots: state.spots};
            const spotIndex = newState.spots.findIndex((el) => { return el.id === action.payload });
            const newSpots = newState.spots.filter((spot)=>spot.id !== newState.spots[spotIndex].id);
            return {...newState, spots: newSpots};
        }
        case EDIT: {
            const newState = { ...state }
            newState.oneSpot = action.payload
            return newState
        }
        case ADD_IMAGE: {
            const newState = { ...state };
            const spot = newState.spots.find((spot) => spot.id === +action.payload.spotId)
            const i = newState.spots.indexOf(spot)
            newState.spots[i] = { ...spot, SpotImages: action.payload }
            return { ...newState }
        }
        case GET_ONE: {
            const newState = { ...state };
            return { ...newState, oneSpot: action.payload };
        }
        case GET_ONE_IMG:
            return { ...state, oneImg: action.payload };
        case GET_USER_SPOTS: {
            console.log('this is state in get user spots reducer before changes',state)
            const newState = { ...state,spots: action.payload }
            console.log('this is new state after changes',newState)
            return newState;
        }
        default:
            return state;
    }
}
export default spotsReducer;
