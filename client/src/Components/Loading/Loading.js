import React from 'react'
import ReactLoading from 'react-loading';
import './Loading.css'

function Loading() {
    return (
        <div>
            <div className="loading"><ReactLoading type={"spin"} color={"#014743"} height={'15%'} width={'15%'} /></div>
        </div>
    )
}

export default Loading
