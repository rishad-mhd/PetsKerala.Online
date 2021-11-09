import React, { useState } from 'react'
import './Login.css'
import Error from '../Error/Error'
import Loading from '../Loading/Loading'
import GoogleButton from 'react-google-button'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../../Redux/Actions/PetsAction'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
            <div className="loginParentDiv">
                <h2>Login</h2>
                <form>
                    {error && <Error value={error} />}
                    <label htmlFor="fname">Email</label>
                    <br />
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        id="fname"
                        name="email"
                        defaultValue="John"
                    />
                    <br />
                    <label htmlFor="lname">Password</label>
                    <br />
                    <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        id="lname"
                        name="password"
                        defaultValue="Doe"
                    />
                    <br />
                    <label htmlFor="lname">Forget Password ?</label>
                    <br />
                    <div className="g-signin2" data-width="300" data-height="200" data-longtitle="true" />
                    <button>Login</button>
                </form>
                <div className="google-auth ">
                    <GoogleButton onClick={googleLogin} type="light" />
                </div>
                <div className="signup">
                    <a onClick={(e) => {
                        navigate('/signup')
                    }}>Signup !</a>
                    {loading && <Loading />}
                </div>
            </div>
        </div>
    )
}

export default Login
