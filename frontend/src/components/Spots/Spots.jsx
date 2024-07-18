import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from '../../store/spots';
import { useEffect } from "react";
import './Spots.css';
import { useNavigate } from "react-router-dom";
import { FiStar } from "react-icons/fi";

const Spots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function innerFunct() {
            await dispatch(spotsActions.getAllThunk());
            await dispatch(spotsActions.getAllImg());
        }
        innerFunct();
    }, [dispatch])

    const spots = useSelector((state) => { return state.spots.spots })
    const spotImgs = useSelector((state) => { return state.spots.spotImgs });
    const user = useSelector((state) => { return state.session.user })
    if (!spots) return;
    if (!spotImgs) return;
    const send = (id) => {
        navigate(`/spots/${id}`)
    }

    return (
        <>
            <div className="second-heading">
                <h1>Spots</h1>
            </div>
            <div className="card-container">
                {spots.map((spot) => {
                    let id = spot.id
                    let avg = spot.averageRating;
                    if(avg.toString().length === 1){avg = `${avg}.0`}
                    return (
                        <div key={id} className='spot-card tooltip' onClick={() => { send(id) }}>
                            <span className="tooltiptext">{spot.name}</span>
                            <img className="spot-img" src={spotImgs[id - 1].url} />
                            <div className="card-text-box">
                                <div className="left-text">
                                    <p className="card-text">{spot.city}, {spot.state}</p>
                                    <p className="card-text">{spot.price} night</p>
                                </div>
                                <div className="right-text">
                                    <FiStar/>
                                    <p id='rating'>{avg ? avg : 'New'}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default Spots;
