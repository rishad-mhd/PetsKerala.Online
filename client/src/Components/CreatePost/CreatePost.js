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
                <div className="border">
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
                            placeholder="IPHONE"
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
                            <option value="Cars">Cars</option>
                            <option value="Motorcycles">Motorcycles</option>
                            <option value="Mobiles">Mobiles</option>
                            <option value="For Sale:Houses & Apartments">For Sale:Houses & Apartments</option>
                            <option value="Scooter">Scooter</option>
                            <option value="Commercial & Other Vehicles">Commercial & Other Vehicles</option>
                            <option value="For Rent: House & Apartments">For Rent: House & Apartments</option>
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
                            placeholder="100000"
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
