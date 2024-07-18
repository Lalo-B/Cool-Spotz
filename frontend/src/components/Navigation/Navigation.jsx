import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import LoginFormModal from '../LoginFormModal/LoginFormModal';
// import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { FaAirbnb } from "react-icons/fa";
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const navigate = useNavigate();

  return (
    <div className='header'>
      <div className='logo-box' onClick={() => { navigate('/')}} >
        <FaAirbnb className='logo' />
        <p className='logo airbnb'>airbnb</p>
      </div>
      <ul className='no-bullets profile-group'>
        <li className='nav-buttons'>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className='nav-buttons'>
          <NavLink to="/reviews">reviews</NavLink>
        </li>
        {isLoaded && (
          <li className='nav-buttons'>
            <ProfileButton user={sessionUser} className='profile-button' />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
