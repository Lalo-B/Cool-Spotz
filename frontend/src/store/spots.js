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
        // console.log('this is data',data.spotInfo[0])
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
    console.log('this is spot in the thunk for submit',user)
    const res = await csrfFetch(`/api/spots/${spotId}`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({spot}),
        // user: JSON.stringify({...user})
    });
    // no
    console.log('are we here',)


    if(res.ok){
        const data = await res.json();
        dispatch(edit(data.spot));
        return data;
    }
}

const spotsReducer = (state = {spots: null, spotImgs: null}, action) => {
    switch (action.type) {
        case GET_ALL:
            return {...state, spots: action.payload};
        case MAKE_ONE:
            return {...state, spots: action.payload};
        case REMOVE_ONE:{
            const newState = {...state}
            delete newState.spots[action.payload.id]
            return {newState}
        }
        case EDIT: {
            const newState = {...state}
            newState.spots[action.payload.id] = action.payload
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
