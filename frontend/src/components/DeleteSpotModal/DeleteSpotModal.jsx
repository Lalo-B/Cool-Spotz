import { useDispatch } from "react-redux";
import * as spotsActions from '../../store/spots.js';
// import { useNavigate } from 'react-router-dom';

const DeleteSpotModal = ({ spot }) => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const handleCLick = () => {
        dispatch(spotsActions.deleteSpot(spot.id));
        // navigate('/');
    }
    return (
        <>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot?</p>
            <button onClick={()=>{handleCLick}}>Yes (Delete Spot)</button>
            <button>No (Keep Spot)</button>
        </>
    )
}
export default DeleteSpotModal;
