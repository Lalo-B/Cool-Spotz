import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { FaAirbnb } from "react-icons/fa";
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const navigate = useNavigate();

  return (
    <div className='header'>
      <div className='logo-box' onClick={() => { navigate('/')}} >
        <FaAirbnb className='logo' />
        <p className='logo airbnb'>airbnbnb</p>
      </div>
      <ul className='no-bullets profile-group' id='user-things-area'>
        {sessionUser && <NavLink to='/newSpot'>Create a New Spot</NavLink>}
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
