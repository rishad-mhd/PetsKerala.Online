import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { navTologin, } from '../../Redux/Actions/PetsAction'
import Error from '../Error/Error'
import './CreatePost.css'

function CreatePost() {
    const user = useSelector(state => state.user.user)
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState()
    const [place, setPlace] = useState()
    const [image, setImage] = useState()
    const [phone, setPhone] = useState()
    const [description, setDescription] = useState()
    const date = new Date()
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const id = useParams()
    const dispatch = useDispatch()
    const [progress, setProgress] = useState()

    useEffect(() => {
        axios.get('/users/selected-pet', { params: id })
            .then((res) => {
                setName(id.id ? res.data.name : "")
                setCategory(id.id ? res.data.category : "")
                setPrice(res.data ? res.data.price : "")
                setPlace(res.data ? res.data.place : user.place)
                setImage(res.data ? res.data.image : null)
                setPhone(res.data ? res.data.phone : user.phone)
                setDescription(res.data ? res.data.description : "")
            })
            .catch((err) => console.log(err))
        document.getElementById("form").reset();

    }, [id])



    const postDetails = {
        id: id.id ? id.id : "",
        name,
        category,
        price,
        place,
        date,
        description,
        phone,
        place
    }
    const options = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total)
            console.log(percent,"%",loaded,"b",total);
            setProgress(percent)
        }
    }
    const handleClick = (e) => {
        e.preventDefault()
        if (!user) {
            dispatch(navTologin(true))
        } else {
            if (image) {
                let formData = new FormData()
                image.forEach((file) => formData.append("image", file))
                formData.append("postDetails", JSON.stringify(postDetails))
                axios.post(id.id ? '/users/editPost' : '/users/createPost', formData, options)
                    .then(res => navigate(id.id ? '/user' : '/'))
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
            <br />
            <br />
            <div className="Ultra-main">
                <div className="Main">
                    {progress && <div class="progress">
                        <div className="progress-bar" role="progressbar" style={{width: `${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}%</div>
                    </div>}
                    <center> <h2>{id.id ? "Edit" : "Sale"} Post</h2></center>
                    <form id="form" action="" onSubmit={handleClick}>
                        <div className="centerDiv">
                            <div className='left'>
                                {error && <Error value={error} />}
                                <label htmlFor="name">Name</label>
                                <br />
                                <input
                                    className="input"
                                    type="text"
                                    value={name}
                                    id="name"
                                    name="Name"
                                    placeholder="dog"
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                    required
                                />
                                <br />
                                <label htmlFor="category">Category</label>
                                <br />
                                <select
                                    className="input"
                                    value={category}
                                    id="category"
                                    name="category"
                                    onChange={(e) => {
                                        setCategory(e.target.value)
                                    }}
                                    required
                                >
                                    <option value="" disabled>Select Category</option>
                                    <option value="Cat">Cats</option>
                                    <option value="Dog">Dogs</option>
                                    <option value="Pegion">Pegions</option>
                                    <option value="Birds">Birds</option>
                                    <option value="Fish">Fish</option>
                                    <option value="Buffallo">Buffallo</option>
                                    <option value="Goat">Goat</option>
                                    <option value="Parrot">Parrot</option>
                                    <option value="Other">Other</option>
                                </select>
                                <br />
                                <label htmlFor="price">Price</label>
                                <br />
                                <input
                                    className="input"
                                    type="number"
                                    value={price}
                                    id="price"
                                    name="Price"
                                    placeholder="₹1000"
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                    required
                                />
                                <label htmlFor="phone">Mobile Number</label>
                                <br />
                                <input
                                    className="input"
                                    type="tel"
                                    value={phone}
                                    id="phone"
                                    name="Name"
                                    placeholder="+91"
                                    onChange={(e) => {
                                        setPhone(e.target.value)
                                    }}
                                    required
                                />

                                <br />
                                <label htmlFor="place">Place</label>
                                <br />
                                <input
                                    className="input"
                                    type="text"
                                    value={place}
                                    id="place"
                                    name="Price"
                                    placeholder="Thrissur"
                                    onChange={(e) => {
                                        setPlace(e.target.value)
                                    }}
                                    required
                                />
                            </div>
                            <div className="right">
                                <br />
                                <input id="image" style={{    width: "13em"}} onChange={(e) => {

                                    console.log(e.target.files);
                                    setImage(Array.from(e.target.files))
                                }} type="file" accept='image/*' multiple />
                                <br /> <br />
                                <div className='image'>
                                    {image && image.map((obj, i) => {
                                        console.log(obj);
                                        return <img key={i} alt="Posts" style={{ border: "1px solid #fff" }} src={image && obj.type ? URL.createObjectURL(obj) : `/images/${obj}`}></img>
                                    })}
                                </div>
                                <br />
                                <label htmlFor="Description">Description</label>
                                <br />
                                <textarea
                                    className="textarea"
                                    type="textarea"
                                    value={description}
                                    id="Description"
                                    name="Name"
                                    placeholder="Description"
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                    }}
                                    required
                                />

                            </div>

                        </div>
                        <center>
                            <br /> <br />
                            <button className="uploadBtn">Submit</button>
                            <br />
                        </center>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default CreatePost
