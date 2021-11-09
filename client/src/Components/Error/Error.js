import React from 'react'
import './Error.css'

function Error(props) {
    return (
        <div>
            <p className='error'>{props.value}</p>
        </div>
    )
}

export default Error
