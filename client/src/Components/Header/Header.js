import React from 'react'
import './Header.css';
import SellButtonPlus from '../../assets/SellButtonPlus'
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';

function Header() {
    return (
        <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div  className="brandName">
         <h4> petskerala.online</h4>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input placeholder='India' type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Search here for your favorite Pets"
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="loginPage">
            <span className=''>Login</span>
            <hr/>
            <span className='logout'>Logout</span>
        </div>

        <div  className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>Post</span>
          </div>
        </div>
      </div>
    </div >
    )
}

export default Header
