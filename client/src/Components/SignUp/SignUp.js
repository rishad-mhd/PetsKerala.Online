import axios from 'axios'
import React, { useState } from 'react'
import GoogleButton from 'react-google-button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { navTologin, setUser } from '../../Redux/Actions/PetsAction'
import Error from '../Error/Error'
import Loading from '../Loading/Loading'
import './SignUp.css'

function SignUp() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const [viewPassword, setViewPassword] = useState()
    const userDetails = {
        name,
        email,
        phone,
        password
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password === password1) {
            console.log('hi');
            axios.post('users/auth/signup', userDetails)
                .then((response) => {
                    console.log(response.data);
                    dispatch(setUser(response.data))
                    navigate('/')
                })
                .catch((err) => {
                    setError(err.response.data);
                })
        } else {
            setError("Password don't match")
            console.log('password dont match');
        }
    }


    const googleLogin = () => {
        setLoading(true)
        let timer = null;
        const googleLoginUrl = "http://localhost:3001/users/auth/google"
        const newWindow = window.open(
            googleLoginUrl,
            "blank",
            "width=500,height=600"
        )
        if (newWindow) {
            timer = setInterval(() => {
                if (newWindow.closed) {
                    fetchAuthUser()
                    if (timer) clearInterval(timer)
                }
            }, 500)
        }

    }

    const fetchAuthUser = async () => {
        const response = await axios.get('users/auth/user', { withCredentials: true })
            .catch((err) => {
                console.log("not authenticated", err);
                setError("Authentication failed")
                setLoading(false)
            })
        if (response && response.data) {
            console.log("user", response.data);
            dispatch(setUser(response.data))
            navigate('/')


        }
    }
    return (
        <div> 
            <div className="div">
                
                <div className="signupParentDiv">
                    <div className="div1">
                    <br/>
                        <h2>Sign up</h2>
                        {error && <Error value={error} />}
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="fname">Username</label>
                            <br />
                            <input
                                className="input"
                                type="text"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                id="fname"
                                name="name"
                                placeholder="John"
                                required
                            />
                            <br />
                            <label htmlFor="fname">Email</label>
                            <br />
                            <input
                                className="input"
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                id="fname"
                                name="email"
                                placeholder="John@gmail.com"
                                required
                            />
                            <br />
                            <label htmlFor="lname">Phone</label>
                            <br />
                            <input
                                className="input"
                                type="phone"
                                id="lname"
                                value={phone}
                                onChange={(e) => { setPhone(e.target.value) }}
                                name="phone"
                                defaultValue="Doe"
                                required
                            />
                            <br />
                            <label htmlFor="lname">Password</label>
                            <br />
                            <div className="confirm" style={{ border: '2px' }}>
                                <input
                                    className="input"
                                    type={viewPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    id="lname"
                                    name="password"
                                    defaultValue="Doe"
                                    minLength="8"
                                    required
                                />
                                {/* <div className="eye"> */}
                                <i class="far fa-eye" onClick={() => {
                                    setViewPassword(viewPassword ? false : true)
                                }}></i>
                                {/* </div> */}
                            </div>
                            <br />
                            <label htmlFor="lname">Confirm Password</label>
                            <br />
                            <input
                                className="input"
                                type="password"
                                value={password1}
                                onChange={(e) => { setPassword1(e.target.value) }}
                                id="lname"
                                name="password"
                                defaultValue="Doe"
                                required
                            />
                            <br />
                            <br />
                            <div  className="button">
                            <button>Signup</button>
                            </div>
                            <div className="Login"><a onClick={(e) => {
                            e.preventDefault()
                            dispatch(navTologin(true))
                        }}>Login !</a>
                            {/* {loading && <Loading />} */}
                        </div>
                        </form>
                        <div className="google-auth ">
                            <GoogleButton onClick={googleLogin} type="light" />
                        </div>
                      
                    </div>
                    <div className="banner2">
                        <img
                            src="/images/5207222-C.jpg"
                            alt="image"

                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
