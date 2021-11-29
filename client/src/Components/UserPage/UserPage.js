import React, { useEffect, useState } from 'react'
import './UserPage.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUserPost } from '../../Redux/Actions/PetsAction'
import { useNavigate } from 'react-router'
import ImageCropper from '../ImageCropper/ImageCropper'

function UserPage() {
    const user = useSelector(state => state.user.user)
    const pets = useSelector(state => state.userPost.pets)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [delet, setDelete] = useState(false)
    const [edit, setEdit] = useState()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [place, setPlace] = useState()
    const image = useSelector(state => state.croppedImage.image)

    useEffect(() => {
        axios.get('/users/user-posts')
            .then((res) => dispatch(setUserPost(res.data)))
            .catch((err) => console.log(err))
        delet && setDelete(false)
    }, [delet])

    const deletePost = (id) => {
        console.log(id);
        if (window.confirm('Do you want to delete')) {
            axios.get('/users/delete-post', { params: { id } })
                .then((res) => setDelete(true))
        }
    }

    const updateUser = () => {
        const userDetails = {
            id: user.id,
            name: name ? name : user.name,
            phone: phone ? phone : user.phone,
            place: place ? place : user.place
        }
        console.log('hi');
        let formdata = new FormData()
        if (image) {
            formdata.append('image', image)
        }
        formdata.append('userDetails', JSON.stringify(userDetails))
        axios.put('/users/update-user', formdata)
            .then((res) => {
                window.location.reload()
                console.log(res);
            }).catch((err) => console.log(err))
    }
    return (
        <div className="UserParentDiv">
            <div className="UserChildDiv">
                <div className="user-data">
                    {/* <form action="" onSubmit={(e)=>e.preventDefault()}> */}
                    <div className="userImageName">
                        <div className="user-image">
                            <img src={user && user.image ? `/images/${user.image}` : user && user.photo ? user.photo : 'https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png'} alt="" />
                        </div>
                        {edit && <ImageCropper value={{ aspect: 16 / 16 }} />}
                        <div className="user-name">
                            <span>{user && user.name}</span>
                        </div>
                    </div>
                    <div className="user-details">
                        <div className="user-details-inner">
                            <div>
                                <label htmlFor="">User Name : </label>
                                {!edit && <span>{user && user.name}</span>}
                                {edit && <input type="text"
                                    defaultValue={user && user.name}
                                    onChange={(e) => setName(e.target.value)}
                                    value={name} />}
                            </div>
                            <div>
                                <label htmlFor="">Email : </label>
                                <span>{user && user.email}</span>
                            </div>
                            <div>
                                <label htmlFor="">Phone : </label>
                                {!edit && <span>{user && user.phone}</span>}
                                {edit && <input type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    defaultValue={user && user.phone} />}
                            </div>
                            <div>
                                <label htmlFor="">Place : </label>
                                {!edit && <span>{user && user.place?user.place:"null" }</span>}
                                {edit && <input type="text"
                                    value={place}
                                    onChange={(e) => setPlace(e.target.value)}
                                    defaultValue={user && user.place} />}

                            </div>
                            {pets && <div>
                                <label htmlFor="">Posts  :</label>
                                <span>{pets.length} posts</span>
                            </div>}
                        </div>
                        <div style={{

                        }}>
                            <i class="fas fa-user-edit" style={{ cursor: 'pointer' }}
                                onClick={() => setEdit(edit ? false : true)}></i>
                        </div>
                        {edit && <button type='submit' className="btn btn-outline-primary" onClick={updateUser}>Update</button>}
                    </div>
                    {/* </form> */}
                </div>
                <div>
                    < div className="user-posts" >
                        {pets && pets[0] ? <center><h3>Your Post</h3></center> : ""}
                        {pets && pets.map((obj) => {
                            return <div key={obj._id} className="user-post ">
                                <div style={{
                                    float: "right",
                                    marginTop: "1em",
                                    cursor: 'pointer'
                                }}>
                                    <div style={{ marginRight: ".5em" }}>
                                        <i class="fas fa-edit" onClick={() => navigate(`/create/${obj._id}`)}
                                            style={{ marginRight: ".5em" }}></i>
                                        <i class="fas fa-trash" onClick={() => deletePost(obj._id)} style={{ color: 'red' }}></i>
                                    </div>
                                </div>
                                <div className="post-inner">
                                    <img src={`/images/${obj.image[0]}`} alt="" />
                                    <span>{obj.name}</span>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UserPage

