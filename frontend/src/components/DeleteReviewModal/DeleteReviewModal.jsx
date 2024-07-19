import { useDispatch } from 'react-redux';
import './DeleteReviewModal.css';
import { useModal } from '../../context/Modal';
import * as reviewsActions from '../../store/reviews';


const DeleteReviewModal = ({revId}) => {
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  const click = () => {
    dispatch(reviewsActions.deleteReviewThunk(revId));
    closeModal();
  };

    return (
        <>
          <h1>delete review</h1>
          <button onClick={()=>{click()}}>delete</button>
        </>
    )
}
export default DeleteReviewModal;
