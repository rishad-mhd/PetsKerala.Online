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
    const [image, setImage] = useState()
    useEffect(() => {
        axios.get('/users/selected-pet', { params: id })
            .then((res) => {
                dispatch(setSelectedPet(res.data))
            })
            .catch((err) => console.log(err))
        return () => {
            dispatch(removeSelectedPet())
        }

    }, [])
    return (
        <div style={{ paddingTop: '10%' }}>
            <div className="card1">
                <nav>
                    <svg className="arrow1" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink">
                        <polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " style={{ stroke: "#727272" }} /></svg>
                    Back to all Plants
                    <svg className="heart1" version="1.1" viewBox="0 0 512 512"
                        style={{ stroke: "#727272" }} xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <path d="M 340.8 98.4 c 50.7 0 91.9 41.3 91.9 92.3 c 0 26.2 -10.9 49.8 -28.3 66.6 L 256 407.1 L 105 254.6 c -15.8 -16.6 -25.6 -39.1 -25.6 -63.9 c 0 -51 41.1 -92.3 91.9 -92.3 c 38.2 0 70.9 23.4 84.8 56.8 C 269.8 121.9 302.6 98.4 340.8 98.4 M 340.8 83 C 307 83 276 98.8 256 124.8 c -20 -26 -51 -41.8 -84.8 -41.8 C 112.1 83 64 131.3 64 190.7 c 0 27.9 10.6 54.4 29.9 74.6 L 245.1 418 l 10.9 11 l 10.9 -11 l 148.3 -149.8 c 21 -20.3 32.8 -47.9 32.8 -77.5 C 448 131.3 399.9 83 340.8 83 L 340.8 83 Z" style={{ stroke: "#727272" }} /></svg>
                </nav>
                
                <div className="photo">
                    <div className="photoheight">
                        <img style={{ maxWidth: "25em" }} src={petDetails && `/images/${image ? image : petDetails.image[0]}`} alt="image" />
                    </div>
                  
                    
                    <div className="image-multiple">
                        {petDetails && petDetails.image.map((obj) => {
                            return <div className="">
                                <img onClick={() => setImage(obj)} style={{ maxHeight: "44px" }} src={`/images/${obj}`} alt="image" />
                            </div>
                        })}
                     </div>
                    </div>
                   
                
                {petDetails && <div className="description">
                    <h2>{petDetails.name}</h2>
                    <h4>{petDetails.category}</h4>
                    <h1>&#x20B9;{petDetails.price}</h1>
                    <p>{petDetails.description}</p>
                    <button>Add to Cart</button>
                    <button>Wishlist</button>
                </div>}
            </div>
        </div>
    )
}

export default View
