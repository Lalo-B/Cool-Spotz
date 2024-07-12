import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { useNavigate } from "react-router-dom";
import './LoginForm.css';


function LoginFormPage() {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [validations, setValidations] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const err = {}
        if (!credential) {
            err.credential = 'must provide a username or email'
        }
        if (!password) {
            err.password = 'must provide a password'
        }
        setValidations(err)
    }, [credential, password]);


    const sessionUser = useSelector((state) => state.session.user);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            credential,
            password
        }
        const res = await dispatch(login(user));
        if (res.ok) {
            navigate('/');
        } else {
            // throw res.errors
        }
        // console.log('here is the res of the dispatch',res.body);
        // why does this log readable stream?
    }

    const loginDemo = () => {
        setCredential('Demo-lition');
        setPassword('password');
    }
    return (
        <div className="login-form">
            <h1>ඞ login to your account</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="credential"> Credential:
                    <input type="text"
                        name='credential'
                        value={credential}
                        required
                        onChange={(e) => setCredential(e.target.value)}
                    ></input>
                </label>
                {validations.credential && <p className="errors">{validations.credential}</p>}
                <br />
                <label htmlFor="password"> Password:
                    <input type="text"
                        name='password'
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </label>
                {validations.password && <p className="errors">{validations.password}</p>}
                <button type='submit'>Submit</button>
            </form>
            {/* side note any button in a form will default submit */}
            <button onClick={loginDemo}>default user</button>
        </div>
    )
}
export default LoginFormPage;
