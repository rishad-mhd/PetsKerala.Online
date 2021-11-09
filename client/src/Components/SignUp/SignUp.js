import axios from 'axios'
import React, { useState } from 'react'
import GoogleButton from 'react-google-button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../Redux/Actions/PetsAction'
import Error from '../Error/Error'
import Loading from '../Loading/Loading'
import './SignUp.css'

function SignUp() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = () => { }


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
        const response = await axios.get('users/auth/user',{withCredentials:true})
        .catch((err)=>{
            console.log("not authenticated",err);
            setError("Authentication failed")
        })
        if (response && response.data){
            console.log("user",response.data);
            dispatch(setUser(response.data))
            navigate('/')


        }
    }
    return (
        <div>
            <div>
                <div className="signupParentDiv">
                    <h2>Sign up</h2>
                    {error && <Error value={error} />}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="fname">Username</label>
                        <br />
                        <input
                            className="input"
                            type="text"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
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
                        <input
                            className="input"
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            id="lname"
                            name="password"
                            defaultValue="Doe"
                        />
                        <br />
                        <br />
                        <button>Signup</button>
                    </form>
                    <div className="google-auth ">
                        <GoogleButton onClick={googleLogin} type="light" />
                    </div>
                    <div className="Login"><a onClick={(e) => {
                        e.preventDefault()
                        navigate('/login')
                    }}>Login !</a>
                        {loading && <Loading />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
