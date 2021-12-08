import React from 'react'

function Skeleton() {
    return (
        <div className="skeleton card">
            <div style={{ marginTop: "9.5em", marginLeft: '1em', marginRight: '1em' }}>
                <div className="skeleton-text"></div>
                <div className="skeleton-text" style={{ width: '3em' }}></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text" style={{ float: 'right', width: '3em', height: '1.5em' }}></div>
            </div>
        </div>
    )
}

export default Skeleton
