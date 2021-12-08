import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { setCategorisedPets, setCLimit } from '../../Redux/Actions/PetsAction'
import './Category.css'

function Category() {
    const item = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const pets = useSelector(state => state.categorisedPets.pets)
    const climit = useSelector(state => state.limit.climit)
    useEffect(() => {
        axios.get('/users/category', { params: { item: item.item, limit: climit } })
            .then((res) => dispatch(setCategorisedPets(res.data)))
            .catch((err) => console.log(err))
    }, [climit])
    return (
        <div>
            <div className="categories">
                {/* <div className="heading"> */}
                {/* <span>{used && <span>Used</span>} {props.value} in India</span> */}
                <br /> <br /><div className="heading">
                    <h3>Latest Posts</h3>
                </div>
                {/* </div> */}
                <div className="cards">
                    {pets && pets.map(pet => {
                        const { _id, name, price, place, description, category, image } = pet
                        return (
                            <div
                                key={_id}
                                onClick={() => navigate(`/views/${_id}`)}
                                className="card">
                                <div className="image">
                                    <img src={`/images/${image[0]}`} alt="" />
                                </div>
                                <div className="content">
                                    <div style={{ marginBottom: "7px" }}>
                                        <span className="pname">{name}</span><br />
                                    </div>
                                    <div style={{ marginBottom: "7px" }}>
                                        <span className="categoryname">{place}</span><br />
                                    </div>
                                    <div style={{ marginBottom: "7px" }}>
                                        <span className="rate">&#x20B9; {price}</span><br />
                                    </div>
                                    <div className="place">
                                        <p >{category}</p><br />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="load-more-button">
                    <button onClick={() => dispatch(setCLimit(climit + 12))}>Load more</button>
                </div>
            </div>
        </div>
    )
}

export default Category
