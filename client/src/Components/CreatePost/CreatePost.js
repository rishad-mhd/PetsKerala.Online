import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { navTologin } from '../../Redux/Actions/PetsAction'
import Error from '../Error/Error'
import Header from '../Header/Header'
import './CreatePost1.css'

function CreatePost() {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState()
    const [image, setImage] = useState()
    const [phone, setPhone] = useState()
    const [description, setDescription] = useState()
    const date = new Date()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    console.log(user);

    const postDetails = {
        name,
        category,
        price,
        date,
        description,
        phone
    }
    const handleClick = () => {
        if (!user) {
            dispatch(navTologin(true))
        } else {
            if (postDetails.name && postDetails.category && postDetails.price && image) {
                let formData = new FormData()
                image.forEach((file) => formData.append("image", file))
                formData.append("postDetails", JSON.stringify(postDetails))
                axios.post('users/createPost', formData)
                    .then(res => navigate('/'))
                    .catch(err => {
                        setError(err)
                        console.log(err.response);
                    })
                console.log(formData);
            }
        }

    }


    return (
        <Fragment>
            <Header />
            <br />
            {/* <card> */}
            <div className="Main">
                <center> <h2>Sale Post</h2></center>
                <div className="centerDiv">
                    <div className='left'>
                        {error && <Error value={error} />}
                        <label htmlFor="fname">Name</label>
                        <br />
                        <input
                            className="input"
                            type="text"
                            value={name}
                            id="fname"
                            name="Name"
                            placeholder="Dog"
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                        <br />
                        <label htmlFor="fname">Category</label>
                        <br />
                        <select
                            className="input"
                            value={category}
                            id="fname"
                            name="category"
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="Cat">Cats</option>
                            <option value="Dog">Dogs</option>
                            <option value="Pegion">Pegions</option>
                            <option value="Birds">Birds</option>
                            <option value="Fish">Fish</option>
                            <option value="Animals">Animals</option>
                            <option value="Hens">Hens</option>
                            <option value="Ducks">Ducks</option>
                            <option value="Other">Other</option>
                        </select>
                        <br />
                        <label htmlFor="fname">Price</label>
                        <br />
                        <input
                            className="input"
                            type="number"
                            value={price}
                            id="fname"
                            name="Price"
                            placeholder="₹1000"
                            onChange={(e) => {
                                setPrice(e.target.value)
                            }}
                        />
                        <br />
                    </div>
                    <div className="right">
                        <div className='image'>
                            {image && image.map((obj, i) => {
                                return <img key={i} alt="Posts" /*border-color="red" width="200px" height="120px" border-radius="3px" padding="5px"*/ src={image ? URL.createObjectURL(obj) : ""}></img>
                            })}
                        </div>


                        <br />
                        <input onChange={(e) => {
                            setImage(Array.from(e.target.files))
                        }} type="file" accept='image/*' required multiple />
                        <br /> <br />
                        <label htmlFor="fname">Mobile Number</label>
                        <br />
                        <input
                            className="input"
                            type="text"
                            value={phone}
                            id="Description"
                            name="Name"
                            placeholder="+91"
                            onChange={(e) => {
                                setPhone(e.target.value)
                            }}
                        />
                        <br />
                        <label htmlFor="fname">Description</label>
                        <br />
                        <input
                            className="input"
                            type="textarea"
                            value={description}
                            id="Description"
                            name="Name"
                            placeholder="Description"
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />

                    </div>

                </div>
                <center>
                    <br /> <br />
                    <button onClick={handleClick} className="uploadBtn">Submit</button>
                    <br />
                </center>
            </div>
            {/* </card> */}
        </Fragment>
    )
}

export default CreatePost
