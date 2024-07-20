import { useDispatch } from 'react-redux';
import './DeleteReviewModal.css';
import { useModal } from '../../context/Modal';
import * as reviewsActions from '../../store/reviews';


const DeleteReviewModal = ({ revId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const click = () => {
    dispatch(reviewsActions.deleteReviewThunk(revId));
    closeModal();
  };

  return (
    <div className='delete-spot-modal-box'>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <button className='delete-spot-button red' onClick={() => { click() }}>Yes (Delete Review)</button>
      <button className='delete-spot-button grey' onClick={() => { closeModal() }}>No (Keep Review)</button>
    </div>
  )
}
export default DeleteReviewModal;
