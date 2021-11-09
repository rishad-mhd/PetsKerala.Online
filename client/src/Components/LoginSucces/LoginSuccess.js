import React, { useEffect } from 'react'
import "./LoginSuccess.css"

function LoginSuccess() {
    useEffect(()=>{
        setTimeout(()=>{
            window.close()
        },1000)
    },[])
    return (
        <div>
            <h1>Thank You for Login</h1>
        </div>
    )
}

export default LoginSuccess
