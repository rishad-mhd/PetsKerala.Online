import React, { useEffect, useState } from 'react'
import './UserPage.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser, setUserImage, setUserPost } from '../../Redux/Actions/PetsAction'
import { useNavigate } from 'react-router'
import ImageCropper from '../ImageCropper/ImageCropper'

function UserPage() {
    const user = useSelector(state => state.user.user)
    const pets = useSelector(state => state.userPost.pets)
    const image = useSelector(state => state.userImage.image)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [delet, setDelete] = useState(false)
    const [edit, setEdit] = useState()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [place, setPlace] = useState()
    const [loading, setLoading] = useState()

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

    const fetchAuthUser = async () => {
        const response = await axios.get('/users/auth/user')
            .catch((err) => {
                console.log("not authenticated", err);
            })
        if (response && response.data) {
            console.log("user", response.data);
            dispatch(setUser(response.data))
            { response.data.image && dispatch(setUserImage({ image: response.data.image, imageHash: Date.now() })) }
            setEdit(false)

        }
    }

    useEffect(() => {
        if (!image) {
            fetchAuthUser()
        }
    }, [image])

    const updateUser = () => {
        const userDetails = {
            id: user.id,
            name: name ? name : user.name,
            phone: phone ? phone : user.phone,
            place: place ? place : user.place
        }
        console.log('hi');
        let formdata = new FormData()
        formdata.append('userDetails', JSON.stringify(userDetails))
        axios.put('/users/update-user', formdata)
            .then((res) => {
                // window.location.reload()
                console.log(res);
                fetchAuthUser()
            }).catch((err) => console.log(err))
    }

    const handleLogout = () => {
        axios.get('/users/auth/user/logout')
            .then((res) => {
                console.log(res.data)
                dispatch(setUser(null))
                dispatch(setUserImage(null))
                navigate('/')
            })
    }



    return (
        <div className="UserParentDiv">
            <div className="UserChildDiv">
                <div className={`user-data  ${pets && !pets[0] && "flex"}`}>
                    <div className="userImageName">
                        <ImageCropper value={{ aspect: 16 / 16 }} load={setLoading} />
                        <div className="user-image">
                            {loading && <div class="loader-1 center"><span></span></div>}
                            <img src={user && image ? `/userImages/${image.image}?${image.imageHash}` : user && user.photo ? user.photo : 'https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png'} alt="" />
                        </div>

                        <div className="user-name">
                            <span>{user && user.name.indexOf(' ') <= 0 ? user.name : user && user.name.split(' ').slice(0, -1).join(' ')}</span>
                        </div>
                    </div>
                    <div className="user-details">
                        <div className="user-details-inner">
                            <div>
                                <i class="fas fa-user-edit" style={{ cursor: 'pointer', float: 'right' }}
                                    onClick={() => setEdit(edit ? false : true)}></i>
                                <div className="right">
                                    <span className="label">Full Name </span><br />
                                    {!edit && <p className="input" style={{ padding: '.3em' }}>{user && user.name}</p>}
                                    {edit && <input type="text"
                                        className="input"
                                        defaultValue={user && user.name}
                                        onChange={(e) => setName(e.target.value)}
                                        value={name} />}

                                    <div>
                                        <span>Email  </span><br />
                                        <p className="input" style={{ padding: '.3em' }}>{user && user.email}</p>
                                    </div>
                                    <div>
                                        <span>Phone  </span><br />
                                        {!edit && <p className="input" style={{ padding: '.3em' }}>{user && user.phone}</p>}
                                        {edit && <input type="text"
                                            className="input"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            defaultValue={user && user.phone} />}
                                    </div>
                                </div>
                                <div className="left">
                                    <div>
                                        <span>Place  </span> <br />
                                        {!edit && <p className="input" style={{ padding: '.3em' }}>{user && user.place}</p>}
                                        {edit && <input type="text"
                                            className="input"
                                            value={place}
                                            onChange={(e) => setPlace(e.target.value)}
                                            defaultValue={user && user.place} />}

                                    </div>



                                    {pets && <div>
                                        <span>Posts </span><br />
                                        <p className="input" style={{ padding: '.3em' }}>{pets.length} posts</p>
                                    </div>}

                                    <div>
                                        {edit && <button type='submit' className="btn btn-outline-primary" onClick={updateUser}>Update</button>}
                                    </div>
                                    {!edit && <span className="btn btn-outline-danger" style={{ cursor: 'pointer' }} onClick={handleLogout}>logout</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    < div className="user-posts" >
                        {pets && pets[0] ? <center><h3 style={{fontWeight:'400'}}>Your Post</h3></center> : ""}
                        {pets && pets.map((obj) => {
                            return <div key={obj._id} className="user-post ">
                                <div style={{
                                    float: "right",
                                    marginTop: "1em",
                                    cursor: 'pointer'
                                }}>
                                    <div style={{ marginRight: ".5em" }}>
                                        <img class="iconss" src="/images/document-editor.png" onClick={() => navigate(`/create/${obj._id}`)}
                                            style={{ marginRight: ".5em" }} />
                                        <img class="iconss2" src="/images/remove.png" onClick={() => deletePost(obj._id)} style={{ color: 'red' }} />
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

