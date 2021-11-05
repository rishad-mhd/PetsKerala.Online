import React from 'react'
import './FreshRecommendation.css'
import Heart from '../../assets/Heart'

function FreshRecommendation() {
    return (
        <div>
            <div className="recomendations">
                <div className="heading">
                    <span>Fresh Recomendations</span>
                </div>
                <div className="cards">
                    <div
                        className="card"
                    >
                        <div className="favorite">
                            <Heart></Heart>
                        </div>
                        <div className="image">
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrZqTCInyg6RfYC7Ape20o-EWP1EN_A8fOA&usqp=CAU' alt="Pet Image" />
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
                <div className="load-more-button">
                    <button>Load more</button>
                </div>
            </div>
        </div>
    )
}

export default FreshRecommendation
