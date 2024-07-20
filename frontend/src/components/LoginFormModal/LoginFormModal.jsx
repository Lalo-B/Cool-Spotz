import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const err = {}

  useEffect(() => {
    if (credential.length < 4) {
      err.buttonDisabled = true
    }
    if (password.length < 6) {
      err.buttonDisabled = true
    }
    setErrors(err);
  }, [credential, password]) //linter says needs err in the array


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };
  const setDefault = () => {
    setCredential('Demo-lition');
    setPassword('password');
  }

  return (
    <div id='login-box'>
      <h1 id='log-in-h'>Log In</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          className='login-inputs'
          placeholder='Username or Email'
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='login-inputs'
          placeholder='Password'
        />
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit" disabled={errors.buttonDisabled ? true : false}
        id='login-button'
        className={errors.buttonDisabled ? 'isdisabled' : 'notdisabled'}
        >Log In</button>
        <button id='demouser-button' onClick={setDefault} >Log in as Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
