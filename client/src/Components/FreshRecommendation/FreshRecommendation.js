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
                    {allPets && allPets.map((pets) => {
                        const { price, category, name, place, _id, image } = pets
                        return (
                            <div
                                className="card"
                                key={_id}
                                onClick={() => navigate(`/views/${_id}`)}
                            >
                                <div className="image">
                                    <img src={`/images/${image[0]}`} alt="Pet Image" />
                                </div>
                                <div className="content">
                                <span className="pname">{name}</span><br/>    
                                <span className="categoryname">{place}</span><br/>
                                <span className="rate">&#x20B9; {price}</span><br/>
                                <div className="place">
                                <span >{category}</span><br/>  
                                </div>
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
