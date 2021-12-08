import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { removeSelectedPet, setSelectedPet, setUser } from '../../Redux/Actions/PetsAction';
import './View.css'

function View() {
    const id = useParams()
    const dispatch = useDispatch()
    const petDetails = useSelector(state => state.selectedPet.pet)
    const [image, setImage] = useState()
    const [seller, setSeller] = useState()
    useEffect(() => {
        axios.get('/users/selected-pet', { params: id })
            .then((res) => {
                dispatch(setSelectedPet(res.data))
                axios.get('/users/seller', { params: { id: res.data.userId } })
                    .then((res) => setSeller(res.data))
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))


        return () => {
            dispatch(removeSelectedPet())
        }

    }, [id])
    return (
        <div style={{ paddingTop: '8em' }}>
            <div className="card1">
                <nav>
                    <h2>Post.</h2>
                </nav>

                <div className="photo">
                    <div className="photoheight">
                        <img src={petDetails && `/images/${image ? image : petDetails.image[0]}`} alt="image" />
                    </div>
                    <span><h5>More Photos</h5></span>

                    <div className="image-multiple">
                        {petDetails && petDetails.image.map((obj) => {
                            return <div className="">
                                <img onClick={() => setImage(obj)} style={{ maxHeight: "70px", paddingRight: '3px' }} src={`/images/${obj}`} alt="image" />
                            </div>
                        })}
                    </div>
                </div>


                {petDetails && <div className="description">
                    <h2>{petDetails.name}</h2>
                    <h1>&#x20B9;{petDetails.price}</h1>
                    <h4>{petDetails.category}</h4>
                    <p>{new Date(petDetails.date).toDateString()}</p>
                    <p>{petDetails.description}</p>
                    
                </div>}
                {/* <br/><br/> */}
                {seller && <div className="description">
                    {/* <img src={user && image ? `/images/${image.image}?${image.imageHash}` : user && user.photo ? user.photo : 'https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png'} alt="" /> */}
                    <h3>{seller.name}</h3>
                    <h5>{seller.email}</h5>
                    <h5>{petDetails && petDetails.place}</h5>
                    <p>{petDetails && petDetails.phone}</p>
                </div>}

            </div>
        </div>
    )
}

export default View
