import { useParams } from "react-router-dom";
import "./SpotDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as spotsActions from '../../store/spots';

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        async function innerFunction() {
            dispatch(spotsActions.getOneSpot(spotId))
        }
        innerFunction();
    })
    const spot = useSelector((state) => { state.spots });
    console.log("🚀 ~ SpotDetails ~ spot:", spot)
    if (!spot) return;

    return (
        <>
            <h1>spot details</h1>
        </>
    )
}
export default SpotDetails
