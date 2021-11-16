import React, { useEffect, useState } from 'react'
import './Header.css';
import SellButtonPlus from '../../assets/SellButtonPlus'
import Search from '../../assets/Search';
import SellButton from '../../assets/SellButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { navToCreate, navTologin, setUser, searchByname } from '../../Redux/Actions/PetsAction';
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

  const handleClick = () => {
    dispatch(navToCreate(true))
    navigate('/create')
  }

  return (
    <div className="navbar navbar-light navbar-expand-lg headerParentDiv " style={offset > 100 ? { background: "white" } : { background: 'transparent' }}>
      <div className="headerChildDiv">
        <div className="brandName navbar-brand" onClick={() => {
          navigate('/')
        }}>
          <h2 className="h3"> PETSO.</h2>
        </div>

        {/* <div className="nav-item Home">
          <a href="#" className="nav-link"><span>Home</span></a>
          <a href="#" className="nav-link"><span>Gallery</span></a>
          <a href="#" className="nav-link"><span>Posts</span></a>
          <a href="#" className="nav-link"><span>Blog</span></a>
          <a href="#" className="nav-link"><span>About</span></a>
          </div> */}
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <div className="nav-link productSearch">
                <div className="input">
                  <input
                    type="text"
                    placeholder="Search here for your favorite Pets"
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
              <a href="#" className="nav-link"><span className={offset < 100 ? "" : "span-hover"}>Home</span></a>
            </li>
            <li class="nav-item active">
              <a href="#" className="nav-link"><span className={offset < 100 ? "" : "span-hover"}>Gallery</span></a>
            </li>
            <li class="nav-item active">
              <a href="#" className="nav-link "><span className={offset < 100 ? "" : "span-hover"}>Posts</span></a>
            </li>
            <li class="nav-item active">
              <a href="#" className="nav-link"><span className={offset < 100 ? "" : "span-hover"}>Blog</span></a>
            </li>
            <li class="nav-item active">
              <a href="#" className="nav-link"><span className={offset < 100 ? "" : "span-hover"}>About</span></a>
            </li>
            <li class="nav-item active">
              <div className="loginPage nav-link" >
                <span className={offset < 100 ? "login-span" : "span-hover"}
                  onClick={() => {
                    { user == null && dispatch(navTologin(true)) }
                  }}>{user == null ? "Login" : user.name}</span>

                {/* <hr /> */}
                {user && <span className='logout' onClick={handleLogout}>Logout</span>}
              </div>
            </li>

            <li class="nav-item active">
              <div className="sellMenu" onClick={handleClick} >
                <SellButton></SellButton>
                <div className="sellMenuContent">
                  <SellButtonPlus></SellButtonPlus>
                  <span>Post</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* <div className="loginPage" >
          <span className=''
            onClick={() => {
              { user == null ? navigate('/login') : console.log(user); }
            }}>{user == null ? "Login" : user.name}</span>

          <hr />
          {user && <span className='logout' onClick={handleLogout}>Logout</span>}
        </div> */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      {!user && <Login />}
    </div >
  )
}

export default Header
