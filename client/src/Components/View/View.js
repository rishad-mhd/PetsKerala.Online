import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { removeSelectedPet, setSelectedPet } from '../../Redux/Actions/PetsAction';
import './View.css'

function View() {
    const id = useParams()
    const dispatch = useDispatch()
    const petDetails = useSelector(state => state.selectedPet.pet)
    const [state, setstate] = useState([])
    console.log(state);
    useEffect(() => {
        axios.get('/users/selected-pet', { params: id })
            .then((res) => {
                dispatch(setSelectedPet(res.data))
                setstate(res.data.image.slice(1))
            })
            .catch((err) => console.log(err))
        return () => {
            dispatch(removeSelectedPet())
        }

    }, [])
    return (
        <div>
            <div className="viewParentDiv">
                <div className="imageShowDiv">
                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100" src={petDetails && `/images/${petDetails.image[0]}`} alt="First slide" />
                            </div>
                            {petDetails && state && state.map((obj) => {
                                return <div className="carousel-item ">
                                    <img className="d-block w-100" src={`/images/${obj}`} alt="First slide" />
                                </div>
                            })}
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div className="rightSection">
                    {petDetails && <div className="productDetails">
                        <p>&#x20B9; {petDetails.price}</p>
                        <span>{petDetails.name}</span>
                        <p>{petDetails.category}</p>
                        <span>{new Date(petDetails.date).toDateString()}</span>
                    </div>}
                    {/* {userDetails && <div className="contactDetails">
                        <p>Seller details</p>
                        <p>{userDetails.username}</p>
                        <p>{userDetails.phone}</p>
                    </div>} */}
                </div>
            </div>
        </div>
    )
}

export default View
