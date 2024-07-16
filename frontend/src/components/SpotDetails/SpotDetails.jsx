import { useParams } from "react-router-dom";
import "./SpotDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as spotsActions from '../../store/spots';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditSpotModalItem from "../EditSpotModalItem/EditSpotModalItem";

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state)=>{ return state.session.user});


    useEffect(() => {
        async function innerFunction() {
            dispatch(spotsActions.getOneSpot(spotId))
            dispatch(spotsActions.getOneImgThunk(spotId))
        }
        innerFunction();
    }, [dispatch, spotId])
    const spot = useSelector((state) => { return state.spots.oneSpot });
    const img  = useSelector((state) => { return state.spots.oneImg });
    // console.log("🚀 ~ SpotDetails ~ img:", img)
    // console.log("🚀 ~ SpotDetails ~ spot:", spot)
    if (!spot) return;
    if(!img)return;

    const correctUser = (user,spot) => {
        if(user.id === spot.ownerId){
            return true
        } else {
            return false
        }
    }

    return (
        <div className="details-body">
            <div className="one-spot">
                <img src={img.img.url} className="spot-detail-img" />
                <div className="details-box">
                    <h1>{spot.name}</h1>
                    <p>Location: {spot.city} {spot.state} {spot.country}</p>
                    {/* <p>Hosted by: {spot.owner.firstName}{spot.owner.lastName}</p> */}
                    <p>description: {spot.description}</p>
                </div>
            </div>
            {correctUser(user,spot) && <OpenModalMenuItem
            itemText='edit spot'
            modalComponent={<EditSpotModalItem spot={spot}/>} />}
        </div>
    )
}
export default SpotDetails;