import React, { useEffect, useState } from 'react'
import './FreshRecommendation.css'
import Heart from '../../assets/Heart'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPets } from '../../Redux/Actions/PetsAction'
import { useNavigate } from 'react-router-dom'

function FreshRecommendation() {
    const allPets = useSelector((state) => state.allPets.pets)
    const dispatch = useDispatch()
    const [limit, setLImit] = useState(12)
    const navigate = useNavigate()
    console.log(limit);

    const fetchAllPets = () => {
        axios.get('/users/pets', { params: { limit } }, { withCredentials: true })
            .then((res) => dispatch(setPets(res.data)))
            .catch((err) => console.log('Error ', err))
    }

    useEffect(() => {
        fetchAllPets()
    }, [limit])

    return (
        <div>
            <div className="recomendations">
                <div className="heading">
                    <span>Latest Posts</span>
                </div>
                <div className="cards">
                    {allPets.map((pets) => {
                        const { price, category, name, description, _id, image } = pets
                        return (
                            <div
                                className="card"
                                key={_id}
                                onClick={() => navigate(`/views/${_id}`)}
                            >
                                <div className="favorite">
                                    <Heart></Heart>
                                </div>
                                <div className="image">
                                    <img src={`http://localhost:3001/images/${image[0]}`} alt="Pet Image" />
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
                    <button onClick={() => { setLImit(limit + 12) }}>Load more</button>
                </div>
            </div>
        </div>
    )
}

export default FreshRecommendation
