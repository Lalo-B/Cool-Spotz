import { useEffect } from "react";
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";

const SpotsImgs = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(spotsActions.getAllImg());
    },[dispatch]);

    const spotImgs = useSelector((state) => {return state.spots.spotImgs});
    if(!spotImgs)return;

    return (
        <>
          <p>imgs</p>
          <img />
        </>
    )
}
export default SpotsImgs;
