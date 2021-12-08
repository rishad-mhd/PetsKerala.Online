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
  const image = useSelector(state => state.userImage.image)
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState(false)
  const result = useSelector(state => state.search.items)
  const [temp, setTemp] = useState([])

  function handleClickOutside(event) {
    document.removeEventListener("mousedown", handleClickOutside)
    setSearch(false)
    console.log("You clicked outside of me!");
  }


  const searching = (e) => {
    let data = e.target.value
    if (data.length === 0) {
      dispatch(searchByname(null))
    }
    if (data.length === 3) {

      axios.get('/users/search', { params: { data } }).then((res) => {
        console.log(res);
        if (res.data && data.length >= 3) {
          setTemp(res.data)
          dispatch(searchByname(res.data))
        }
      })
    } else if (data.length > 3) {
      if (!result) {
        return
      }
      if (result.length === 0) {
        dispatch(searchByname(temp))
      }
      var matched_terms = [];
      var search_term = data;
      search_term = search_term.toLowerCase();
      console.log(result);
      console.log(data);
      if (result.length !== 0) {
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

  return (
    <div className="headerParentDiv ">
      <div className="headerChildDiv">
        <div className="brandName" onClick={() => {
          navigate('/')
        }}>
          <h3 className="hf"> PETSO.</h3>
        </div>
        <div className="links">

          <div className=" productSearch">
            <div className="input">
              <input
                type="text"
                placeholder="Mecavo"
                onKeyUp={searching}
                onClick={() => {
                  setSearch(true)
                }}
              />
              <div class="dropdown">
                <div id="myDropdown" class={`dropdown-content ${search ? "show" : ""}`}>
                  {result && result.map((obj) => {
                    return <a key={obj._id} onClick={() => navigate(`/views/${obj._id}`)}>{obj.name}</a>
                  })}

                </div>
              </div>
            </div>
            <div className="searchAction">
              <Search ></Search>
            </div>
          </div>
          <span className="items" onClick={() => navigate('/')}>Home</span>
          <span className="items" onClick={() => navigate('/gallery')}>Gallery</span>
          <span className="items" style={{ color: "grey" }}>Blog</span>
          <span className="items" onClick={() => navigate('/about')}>About</span>

          <div className="user">
            <div className="usimages">
              <img src={user && image ? `/userImages/${image.image}?${image.imageHash}` : user && user.image ? `/userImages/${user.image}` : user && user.photo ? user.photo : 'https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png'} alt="" />
            </div>
            <div className="loginPage" >
              <span className={offset < 100 ? "login-span" : "span-hover"}
                onClick={() => {
                  { user == null ? dispatch(navTologin(true)) : navigate('/user') }
                }}>{user == null ? "Login" : user.name.indexOf(' ') <= 0 ? user.name : user.name.split(' ').slice(0, -1).join(' ')}</span>
              {/* <span>{user && }</span> */}
            </div>
          </div>
          <div className="sellMenu" onClick={() => {
            dispatch(removeSelectedPet())
            navigate('/create')
          }} >
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>Post</span>
            </div>
          </div>
        </div>
        <div className="user-icon"
          onClick={() => { !user ? dispatch(navTologin(true)) : navigate('/user') }} >
          <img src={user && image ? `/userImages/${image.image}?${image.imageHash}` : user && user.image ? `/userImages/${user.image}` : user && user.photo ? user.photo : 'https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png'} alt="" />
        </div>
      </div>
      {!user && <Login />}
    </div >
  )
}

export default Header
