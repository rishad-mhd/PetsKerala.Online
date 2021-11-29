import React from 'react'
import { useNavigate } from 'react-router'
import './BottomNav.css'

function BottomNav() {
    const navigte = useNavigate()
    return (
        <div className="Bottom-nav-parent">
            <div className="Bottom-nav-child">
                <i class="fas fa-home fa-2x" onClick={() => navigte('/')}></i>
                <i class="far fa-plus-square fa-2x" onClick={() => navigte('/create')}></i>
                <i class="far fa-clone fa-2x"></i>
            </div>
        </div>
    )
}

export default BottomNav
