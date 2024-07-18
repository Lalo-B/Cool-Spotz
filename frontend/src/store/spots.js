import { csrfFetch } from "./csrf";

const MAKE_ONE = 'spots/makeOne';
const GET_ALL = 'spots/getAll';
const EDIT = 'spots/edit';
const REMOVE_ONE = 'spots/removeOne';
const GET_ALL_IMGS = 'spots/spot-images/getAllImgs';
const GET_ONE = 'spots/getOne';
const GET_ONE_IMG = 'spots/getOneImg';

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

const getAllImages = (imgs) => {
    return {
        type: GET_ALL_IMGS,
        payload: imgs
    }
}

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

export const getAllThunk = () => async dispatch => {
    const res = await csrfFetch('/api/spots');

    if(res.ok){
        const data = await res.json();
        // console.log('this is data in thunk',data.Spots)
        dispatch(getAll(data.Spots)) //or just data?
        return data;
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const getAllImg = () => async dispatch => {
    const res = await csrfFetch('/api/spot-images');

    if(res.ok){
        const data = await res.json();
        // console.log('this is data for spot imgs',data.spotImgs)
        dispatch(getAllImages(data.spotImgs));
        return data.spotImgs;
    }
}

export const getOneSpot = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${+id}`);

    if(res.ok){
        const data = await res.json();
        // console.log('this is data',data)
        dispatch(getOne(data.spotInfo[0]));
        return data.spotInfo[0];
    }
}

export const getOneImgThunk = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spot-images/${id}`);

    if(res.ok){
        const data = await res.json();
        dispatch(getOneImg(data));
        return data
    }
}

export const editSpot = (spot,user) => async dispatch => {
    const spotId = spot.id
    const res = await csrfFetch(`/api/spots/${spotId}`,{
        method: 'PUT',
        body: JSON.stringify(spot),
    });

    if(res.ok){
        const data = await res.json();
        dispatch(edit(data));
        return data;
    }
}

export const deleteSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`,{
        method: 'delete',
    })

    if(res.ok){
        const data = await res.json();
        console.log("🚀 ~ deleteSpot ~ data:", data)
        dispatch(removeOne(data));
        return data;
    }
}

export const addSpot = (spot) => async dispatch => {
    const res = csrfFetch('/api/spots',{
        method: 'post',
        body: JSON.stringify(spot)
    });

    if(res.ok){
        const data = await res.json();
        dispatch(makeOne(data));
        return data;
    }
}

const spotsReducer = (state = {spots: null, spotImgs: null}, action) => {
    switch (action.type) {
        case GET_ALL:
            return {...state, spots: action.payload};
        case MAKE_ONE:{
            const newState = {...state, spots: [...state.spots]}
            console.log(newState)
            return {...state, spots: action.payload};
        }
        case REMOVE_ONE:{
            const newState = {...state}
            delete newState.oneSpot
            return {newState}
        }
        case EDIT: {
            const newState = {...state}
            newState.oneSpot = action.payload
            return newState
        }
        case GET_ALL_IMGS:
            return {...state, spotImgs: action.payload};
        case GET_ONE:
            return {...state, oneSpot: action.payload};
        case GET_ONE_IMG:
            return {...state, oneImg: action.payload}
        default:
            return state;
    }
}
export default spotsReducer;
