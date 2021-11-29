import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import Heart from '../../assets/Heart'
import { setCategorisedPets } from '../../Redux/Actions/PetsAction'
import './Category.css'

function Category() {
    const item = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const pets = useSelector(state => state.categorisedPets.pets)
    useEffect(() => {
        axios.get('/users/category', { params: item })
            .then((res) => dispatch(setCategorisedPets(res.data)))
            .catch((err) => console.log(err))
    }, [])
    return (
        <div>
            {/* <div className="quickOption-bar">
                <QuickOption />
            </div> */}
            <div className="categories">
                <div className="heading">
                    {/* <span>{used && <span>Used</span>} {props.value} in India</span> */}
                </div>
                <div className="cards">
                    {pets && pets.map(pet => {
                        const { _id, name, price, description, category, image } = pet
                        return (
                            <div
                                key={_id}
                                onClick={() => navigate(`/views/${_id}`)}
                                className="card">
                                <div className="image">
                                    <img src={`/images/${image[0]}`} alt="" />
                                </div>
                                <div className="content">
                                    <p className="rate">&#x20B9;{price}</p>
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
                    <button onClick={() => {
                    }}>Load more</button>
                </div>
            </div>
        </div>
    )
}

export default Category
