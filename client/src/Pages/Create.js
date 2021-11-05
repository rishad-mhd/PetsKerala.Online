import React, { Fragment } from 'react'
import CreatePost from '../Components/CreatePost/CreatePost'
import Header from '../Components/Header/Header'

function Create() {
    return (
        <div>
            <Fragment>
                <Header />
                <CreatePost />
            </Fragment>
        </div>
    )
}

export default Create
