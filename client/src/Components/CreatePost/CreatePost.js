import React, { Fragment, useState } from 'react'
import Error from '../Error/Error'
import Header from '../Header/Header'
import './CreatePost.css'

function CreatePost() {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState()
    const [image, setImage] = useState()
    const date = new Date()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    return (
        <Fragment>
            <Header />
            <card>
                <div className="bg-image">
                    <div className="centerDiv">
                        {error && <Error value="Please fill out the form completely" />}
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
                        <br />
                        <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>
                        <br />
                        <input onChange={(e) => {
                            setImage(e.target.files[0])
                        }} type="file" required />
                        <br />
                        <button onClick className="uploadBtn">upload and Submit</button>
                    </div>
                </div>
            </card>
        </Fragment>
    )
}

export default CreatePost
