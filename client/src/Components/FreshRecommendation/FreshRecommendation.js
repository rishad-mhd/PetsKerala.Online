import React, { useEffect } from 'react'
import './FreshRecommendation.css'
import Heart from '../../assets/Heart'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPets } from '../../Redux/Actions/PetsAction'

function FreshRecommendation() {
    const allPets = useSelector((state) => state.allPets.pets)
    const dispatch = useDispatch()
    const fetchAllPets = () => {
        axios.get('/pets')
            .then((res) => dispatch(setPets(res.data)))
            .catch((err) => console.log('Error ', err))
    }
    useEffect(() => {
        fetchAllPets()
    }, [])
    return (
        <div>
            <div className="recomendations">
                <div className="heading">
                    <span>Fresh Recomendations</span>
                </div>
                <div className="cards">
                    {allPets.map((pets) => {
                        const { price, category, name, description, image, id } = pets
                        return (
                            <div
                                className="card"
                                key={id}
                            >
                                <div className="favorite">
                                    <Heart></Heart>
                                </div>
                                <div className="image">
                                    <img src={image} alt="Pet Image" />
                                </div>
                                <div className="content">
                                    <p className="rate">&#x20B9; {price}</p>
                                    <span className="kilometer">{category}</span>
                                    <p className="name">{name}</p>
                                </div>
                                <div className="date">
                                    <span>{description}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="load-more-button">
                    <button>Load more</button>
                </div>
            </div>
        </div>
    )
}

export default FreshRecommendation
