import { useEffect } from "react";
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";

const SpotsImgs = ({spot}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        async function innerFunct(){
            const imgRes = await dispatch(spotsActions.getAllImg());
        }
        innerFunct()
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
