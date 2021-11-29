import React from 'react'
import './QuickMenu.css'
import Heart from '../../assets/Heart'
import { useNavigate } from 'react-router-dom'

function QuickMenu() {
  const navigate = useNavigate()
  return (
    <div className="menuBar">
      <div className="categoryMenu">
        <div className="name" onClick={() => navigate('/category/Dog')}>
          <span>Dog</span>
        </div>

        <div className="name" onClick={() => navigate('/category/Pegion')}>
          <span>Pegion</span>
        </div>

        <div className="name" onClick={() => navigate('/category/Cat')}>
          <span>Cat</span>
        </div>

        <div className="name" onClick={() => navigate('/category/Birds')}>
          <span>Birds</span>
        </div>

        <div className="name" onClick={() => navigate('/category/Parrot')}>
          <span>Parrot</span>
        </div>

        <div className="name" onClick={() => navigate('/category/Fish')}>
          <span>Fish</span>
        </div>

        <div className="name" onClick={() => navigate('/category/Goat')}>
          <span>Goat</span>
        </div>

        <div className="name" onClick={() => navigate('/category/Bufallo')}>
          <span>Bufallo</span>
        </div>

        <div className="name" onClick={() => navigate('/category/Other')}>
          <span>Other</span>
        </div>
      </div>
    </div>
  )
}

export default QuickMenu
