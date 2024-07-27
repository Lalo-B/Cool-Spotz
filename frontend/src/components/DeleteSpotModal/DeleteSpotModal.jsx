import { useDispatch } from "react-redux";
import * as spotsActions from '../../store/spots.js';
import { useModal } from "../../context/Modal.jsx";
import './DeleteSpotModal.css';

const DeleteSpotModal = ({ spot }) => {
    const {closeModal} = useModal();
    const dispatch = useDispatch();


    const handleCLick = async () => {
        await dispatch(spotsActions.deleteSpot(spot.id));
        closeModal();
    };

    return (
        <div className='delete-spot-modal-box'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot?</p>
            <button className='delete-spot-button red' onClick={()=>{handleCLick()}}>Yes (Delete Spot)</button>
            <button className='delete-spot-button grey' onClick={()=>{closeModal()}}>No (Keep Spot)</button>
        </div>
    )
}
export default DeleteSpotModal;
