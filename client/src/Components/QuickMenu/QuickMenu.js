import React from 'react'
import './QuickMenu.css'
import Heart from '../../assets/Heart'

function QuickMenu() {
    return (
        <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Featured Products</span>
          {/* <span>View more</span> */}
        </div>
        <div className="cards">
          <div
              className="card"
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrZqTCInyg6RfYC7Ape20o-EWP1EN_A8fOA&usqp=CAU' alt='Pet Image' />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; 8000</p>
                <span className="kilometer">Dog</span>
                <p className="name">Lab</p>
              </div>
              <div className="date">
                <span>Well trained dog</span>
              </div>
            </div>
        </div>
      </div>
      
    </div>
    )
}

export default QuickMenu
