import { useDispatch } from "react-redux";
import * as spotsActions from '../../store/spots.js';
import { useModal } from "../../context/Modal.jsx";

const DeleteSpotModal = ({ spot }) => {
    const {closeModal} = useModal();
    const dispatch = useDispatch();

    const handleCLick = () => {
        dispatch(spotsActions.deleteSpot(spot.id));
        closeModal();
    };

    return (
        <>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot?</p>
            <button onClick={()=>{handleCLick()}}>Yes (Delete Spot)</button>
            <button onClick={()=>{closeModal()}}>No (Keep Spot)</button>
        </>
    )
}
export default DeleteSpotModal;
