import { useDispatch } from "react-redux";
import * as spotsActions from '../../store/spots.js';

const DeleteSpotModal = ({ spot }) => {
    const dispatch = useDispatch();
    const handleCLick = () => {
        dispatch(spotsActions.deleteSpot(spot.id))
    }
    return (
        <>
            <h1>Delete Spot</h1>
            <p>are you sure you want to delete {spot.name}?</p>
            <button onClick={handleCLick}>yes Im sure</button>
        </>
    )
}
export default DeleteSpotModal;
