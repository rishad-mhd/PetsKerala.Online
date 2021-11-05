import React from 'react'
import './Banner.css'

function Banner() {
    return (
        <div>
            <div className="bannerParentDiv">
                <div className="bannerChildDiv">
                    <div className="bgcolor">
                        <div className="banner">
                            <img
                                // src="../../../Images/banner copy.png"
                                src="https://cdn.shopify.com/s/files/1/0523/9855/5314/collections/Collection_banners_34.png?v=1621765900"
                                alt=""
                            />
                            {/* <h1>Welcome To Petskerala</h1> */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Banner
