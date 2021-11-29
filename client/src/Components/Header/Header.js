import React, { useEffect, useState } from 'react'
import './Header.css';
import SellButtonPlus from '../../assets/SellButtonPlus'
import Search from '../../assets/Search';
import SellButton from '../../assets/SellButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { navTologin, setUser, searchByname, removeSelectedPet } from '../../Redux/Actions/PetsAction';
import Login from '../Login/Login';

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let user = useSelector(state => state.user.user)
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState(false)
  const result = useSelector(state => state.search.items)
  const [create, setCreate] = useState(false)
  const [temp,setTemp] = useState([])

  function handleClickOutside(event) {
    document.removeEventListener("mousedown", handleClickOutside)
    setSearch(false)
    console.log("You clicked outside of me!");
  }


  const searching = (e) => {
    let data = e.target.value
    if (data.length === 3) {

      axios.get('/users/search', { params: { data } }).then((res) => {
        setTemp(res.data)
        dispatch(searchByname(res.data))
      })
    } else if (data.length > 3) {
      if(result.length===0){
        dispatch(searchByname(temp))
      }
      var matched_terms = [];
      var search_term = data;
      search_term = search_term.toLowerCase();
      console.log(result);
      console.log(data);
      if(result.length!==0){
        result.forEach(item => {
        if (item.name.toLowerCase().indexOf(search_term) !== -1) {
          matched_terms.push(item);
        }
      })
      dispatch(searchByname(matched_terms));
    }
    }
  }
  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset)
    }

  }, []);
  const handleLogout = () => {
    axios.get('/users/auth/user/logout')
      .then((res) => {
        console.log(res.data)
        dispatch(setUser(null))
      })
  }

  return (
    <div className="navbar navbar-light navbar-expand-lg headerParentDiv " style={{ background: "white" }}>
      <div className="headerChildDiv">
        <div className="brandName navbar-brand" onClick={() => {
          navigate('/')
        }}>
          <h3 className="hf"> PETSO.</h3>
        </div>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <div className="nav-link productSearch">
                <div className="input">
                  <input
                    type="text"
                    placeholder="Mecavo"
                    onKeyUp={searching}
                    onClick={() => {
                      setSearch(true)
                      // document.addEventListener("mousedown", handleClickOutside);
                    }}
                  />
                  <div class="dropdown">
                    <div id="myDropdown" class={`dropdown-content ${search ? "show" : ""}`}>
                      {result && result.map((obj) => {
                        return <a key={obj._id} onClick={()=>navigate(`/views/${obj._id}`)}>{obj.name}</a>
                      })}

                    </div>
                  </div>
                </div>
                <div className="searchAction">
                  <Search color="#"></Search>
                </div>
              </div>
            </li>
            <li class="nav-item active">
              <a href="#" className="nav-link"><span className= "span-hover">Home</span></a>
            </li>
            <li class="nav-item active">
              <a href="#" className="nav-link"><span className="span-hover">Gallery</span></a>
            </li>
            <li class="nav-item active">
              <a href="#" className="nav-link "><span className="span-hover">Posts</span></a>
            </li>
            <li class="nav-item active">
              <a href="#" className="nav-link"><span className="span-hover">Blog</span></a>
            </li>
            <li class="nav-item active">
              <a href="#" className="nav-link"><span className="span-hover">About</span></a>
            </li>
            <li class="nav-item active">
              <div className="loginPage nav-link" >
                <span className={offset < 100 ? "login-span" : "span-hover"}
                  onClick={() => {
                    { user == null ? dispatch(navTologin(true)):navigate('/user') }
                  }}>{user == null ? "Login" : user.name}</span>

                {/* <hr /> */}
                {user && <span className='logout' onClick={handleLogout}>Logout</span>}
              </div>
            </li>

            <li class="nav-item active">
              <div className="sellMenu" onClick={()=>{
                dispatch(removeSelectedPet())
                navigate('/create')
                }} >
                <SellButton></SellButton>
                <div className="sellMenuContent">
                  <SellButtonPlus></SellButtonPlus>
                  <span>Post</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="user-icon"
        onClick={()=>{navigate('/user')}} >
        <img src={user && user.image ? `/images/${user.image}` : user && user.photo ? user.photo : 'https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png'} alt="" />
        </div>
      </div>
      {!user && <Login />}
    </div >
  )
}

export default Header
