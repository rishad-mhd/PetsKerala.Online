import React from 'react'
import './Header.css';
import SellButtonPlus from '../../assets/SellButtonPlus'
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../Redux/Actions/PetsAction';

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let user = useSelector(state => state.user.user)
  const handleLogout = () => {
    axios.get('users/auth/user/logout')
    .then((res)=>{
      console.log(res.data)
      dispatch(setUser(null))
    })
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={() => {
          navigate('/')
        }}>
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
        <div className="loginPage" >
          <span className=''
            onClick={() => {
              { user == null ? navigate('/login') : console.log(user); }
            }}>{user == null ? "Login" : user.name}</span>

          <hr />
          {user && <span className='logout' onClick={handleLogout}>Logout</span>}
        </div>
        <div className="sellMenu" onClick={() => {
          navigate('/create')
        }} >
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
