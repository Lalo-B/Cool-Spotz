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
        }
        innerFunct();
    }, [dispatch])

    const spots = useSelector((state) => { return state.spots.spots })
    // console.log('this is spots', spots)
    useSelector((state) => { return state.session.user })
    if (!spots) return;
    const send = (id) => {
        navigate(`/spots/${id}`)
    }

    // console.log('this is spot',spots[19].SpotImages)
    return (
        <>
            <div className="second-heading">
                <h1>Spots</h1>
            </div>
            <div className="card-container">
                {spots.map((spot) => {
                    let id = spot.id
                    let avg = spot.averageRating;
                    let imgs = spot.SpotImages;
                    if(avg && avg.toString().length === 1){avg = `${avg}.0`}
                    return (
                        <div key={id} className='spot-card tooltip' onClick={() => { send(id) }}>
                            <span className="tooltiptext">{spot.name}</span>
                            <img className="spot-img" src={imgs.length > 0 ? imgs[0].url : null} alt=''/>
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
