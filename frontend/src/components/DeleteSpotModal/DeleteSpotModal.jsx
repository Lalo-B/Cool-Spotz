import { useDispatch } from "react-redux";
import * as spotsActions from '../../store/spots.js';
import { useModal } from "../../context/Modal.jsx";
import './DeleteSpotModal.css';
import { useState } from "react";

const DeleteSpotModal = ({ spot }) => {
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const [didDelete,setDidDelete] = useState(false);


    const handleCLick = async () => {
        const res = await dispatch(spotsActions.deleteSpot(spot.id));
        if(res)setDidDelete(true)
    };

    return (
        <div className='delete-spot-modal-box'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot?</p>
            <button className='delete-spot-button red' value={didDelete} onClick={()=>{handleCLick()}}>Yes (Delete Spot)</button>
            <button className='delete-spot-button grey' onClick={()=>{closeModal()}}>No (Keep Spot)</button>
        </div>
    )
}
export default DeleteSpotModal;
