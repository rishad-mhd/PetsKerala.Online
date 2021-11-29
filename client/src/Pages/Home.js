import React from 'react'
import Banner from '../Components/Banner/Banner'
import Footer from '../Components/Footer/Footer'
import FreshRecommendation from '../Components/FreshRecommendation/FreshRecommendation'
import QuickMenu from '../Components/QuickMenu/QuickMenu'


function Home() {
    

    return (
        <div>
            <Banner />
            <QuickMenu />
            <FreshRecommendation />
            <Footer />
        </div>
    )
}

export default Home
