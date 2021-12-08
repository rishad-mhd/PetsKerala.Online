import React, { useEffect, useState } from 'react'
import './FreshRecommendation.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setFLimit, setPets } from '../../Redux/Actions/PetsAction'
import { useNavigate } from 'react-router-dom'
import Skeleton from '../Skeleton/Skeleton'

function FreshRecommendation() {
    const allPets = useSelector((state) => state.allPets.pets)
    const dispatch = useDispatch()
    const flimit = useSelector(state => state.limit.flimit)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    console.log(flimit);

    const fetchAllPets = () => {
        axios.get('/users/pets', { params: { limit: flimit } }, { withCredentials: true })
            .then((res) => {
                dispatch(setPets(res.data))
                setLoading(false)
            })
            .catch((err) => console.log('Error ', err))
    }

    useEffect(() => {
        setLoading(true)
        fetchAllPets()
    }, [flimit])

    const skeleton = () => {
        let arr = []
        for (var i = 0; i < 12; i++) {
            arr.push(<Skeleton />)
        }
        return (arr)
    }

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
                                <div className="image skeleton">
                                    <img src={`/images/${image[0]}`} alt="Pet Image" />
                                </div>
                                <div className="content">
                                    <div style={{ marginBottom: "7px" }}>
                                        <span className="pname">{name}</span><br />
                                    </div>
                                    <div style={{ marginBottom: "11px" }}>
                                        <span className="categoryname">{place}</span><br />
                                    </div>
                                    <div>
                                        <span className="rate">&#x20B9; {price}</span>
                                    </div>
                                    <div className="place">
                                        <span style={{ background: "#ffffff61", borderRadius: "3px", padding: "0px 5px 0px 5px" }}>{category}</span><br />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {loading && skeleton()}
                </div>
                <div className="load-more-button"><br/>
                    <center> <button onClick={() => { dispatch(setFLimit(flimit + 12)) }}>Load more</button></center><br/>
                </div>
            </div>
        </div>
    )
}

export default FreshRecommendation
