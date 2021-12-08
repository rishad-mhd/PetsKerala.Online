import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setGLimit } from '../../Redux/Actions/PetsAction'
import './Gallery.css'

function Gallery() {
    const [images, setImages] = useState([])
    const [Limit, setLimit] = useState(5)
    const [Scroll, setScroll] = useState()
    const dispatch = useDispatch()
    const glimit = useSelector(state => state.limit.glimit)
    useEffect(() => {
        axios.get('/users/all-images').then((res) => setImages(res.data))
    }, [])

    const loading = (e) => {
        console.log(e);
        setScroll(window.scrollY)
        console.log(Scroll);
    }
    return (
        <div className="gallery-main" onScroll={loading}>
            <div className="gallery-cards" >
                <h3>Gallery</h3>
                {images.slice(0, glimit).map((image, i) => {
                    return (
                        <div key={i} className="gallery-card" >
                            <img src={`/images/${image}`} alt="" />
                        </div>
                    )
                })}
                <center>
                    <button className="gbutton" onClick={() => {
                        dispatch(setGLimit(glimit + 12))
                    }}>load more</button>
                </center>
            </div>
        </div>
    )
}

export default Gallery
