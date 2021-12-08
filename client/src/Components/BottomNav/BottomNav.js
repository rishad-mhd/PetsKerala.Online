import React from 'react'
import { useNavigate } from 'react-router'
import './BottomNav.css'

function BottomNav() {
    const navigte = useNavigate()
    
    return (
        <div className="Bottom-nav-parent">
            <div className="Bottom-nav-child">
                <div className="t" onClick={() => navigte('/')}>
                    <div className="image-div">
                        <img src="/images/apple.png" alt='' ></img>
                    </div>
                    <h3>Home</h3>
                </div>
                <div className="t" onClick={() => navigte('/search')}>
                    <div className="image-div">
                        <img src="/images/beats-pill.png" alt='' ></img>
                    </div>
                    <h3>Search</h3>
                </div>
                <div className="t" onClick={() => navigte('/create')}>
                    <div className="image-div">
                        <img src="/images/camera.png" alt=''></img>
                    </div>
                    <h3>AdPost</h3>
                </div>
                <div className="t" onClick={() => navigte('/gallery')}>
                    <div className="image-div">
                        <img src="/images/photos.png" alt='' ></img>
                    </div>
                    <h3>Gallery</h3>
                </div>
                <div className="t" onClick={() => navigte('/about')}>
                    <div className="image-div">
                        <img src="/images/app-store.png" alt='' ></img>
                    </div>
                    <h3>About</h3>
                </div>
            </div>
        </div>




    )

}

export default BottomNav
