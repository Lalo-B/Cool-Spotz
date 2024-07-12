import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { signUp } from "../../store/session"

const SignUpPage = () => {
    const [username, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validations, setValidations] = useState({});
    const dispatch = useDispatch();
    const errors = {}
    const sessionUser = useSelector(state=>state.session.user)

    if(sessionUser){return <Navigate to='/' replace={true}/>}

    useEffect(() => {
        if (password !== confirmPassword) {
            errors.password = "your passwords do not match";
            setValidations(errors);
        } else {
            setValidations(errors)
        }
    }, [password, confirmPassword])

    const onSubmit = async (e) => {
        e.preventDefault();
        const user = { username, firstName, lastName, email, password }
        if (confirmPassword === password) {
            setValidations({})
            return dispatch(signUp(user)).catch(async (res) => {
                const data = await res.json()
                if (data?.errors) {
                    setValidations(data.errors)
                }
            })
        }
        return setValidations({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        })
    }

    return (
        <>
            <h1>ඞ sign up page</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="username"> UserName:
                    <input
                        name='username'
                        type='text'
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    ></input>
                </label>
                {validations.username && <p className="errors">{validations.username}</p>}
                <label htmlFor="firstName"> FirstName:
                    <input
                        name='firstName'
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    ></input>
                </label>
                {validations.firstName && <p className="errors">{validations.firstName}</p>}
                <label htmlFor="lastName"> LastName:
                    <input
                        name='lastName'
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    ></input>
                </label>
                {validations.lastName && <p className="errors">{validations.lastName}</p>}
                <label htmlFor="email"> Email:
                    <input
                        name='email'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    ></input>
                </label>
                {validations.email && <p className="errors">{validations.email}</p>}
                <label htmlFor="password"> Password:
                    <input
                        name='password'
                        type='text'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    ></input>
                </label>
                {validations.password && <p className="errors">{validations.password}</p>}
                <label htmlFor="confirm-password"> Confirm Password:
                    <input
                        name='confirm-password'
                        type='text'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    ></input>
                </label>
                {validations.confirmPassword && <p className="errors">{validations.confirmPassword}</p>}
                <button type='submit'>submit</button>
            </form>
        </>
    )
}
export default SignUpPage
