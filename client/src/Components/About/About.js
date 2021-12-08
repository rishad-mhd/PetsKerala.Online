import React from 'react'
import './About.css'

function About() {
    return (
        <div className="About">
            <h3>HELLO!</h3>
            <p> Welcome To Free Classified Platform.</p>
            <div className="about-sub">
                <div className="about-inner">

                    <div className="about1">
                        <span>NAME</span><br />
                        <p>PetsoPvt.Lmtd</p><br />
                        <span> EMAIL</span><br />
                        <p>Petskerala@email.com</p><br />
                        <span>PHONE</span><br />
                        <p>+91 9605778337</p><br />
                        <span>WEBSITE</span><br />
                        <p>Petskerala.online</p><br />
                        <span> LOCATION</span><br />
                        <p>INDIA, KERALA.</p><br />
                        <span> FEATURES</span><br />
                        <p>Posts, Gallery, etc</p><br />
                        <span>SOCIAL</span>
                    </div>
                    <div className="img">
                        <img
                            src="/images/55.jpg"
                            alt=""

                        />
                        <p>Keep Supporting.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
