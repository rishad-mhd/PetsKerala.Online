import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import BottomNav from './Components/BottomNav/BottomNav';
import Category from './Components/Category/Category';
import Header from './Components/Header/Header';
import LoginSuccess from './Components/LoginSucces/LoginSuccess';
import SignUp from './Components/SignUp/SignUp';
import Create from './Pages/Create';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import User from './Pages/User';
import ViewPost from './Pages/ViewPost';
import { setUser } from './Redux/Actions/PetsAction';


function App() {
  const dispatch = useDispatch()
  const fetchUserdetails = async () => {
    const response = await axios.get('/users/auth/user', { withCredentials: true })
      .catch((err) => {
        console.log("not authenticated", err);
      })
    if (response && response.data) {
      console.log("user", response.data);
      dispatch(setUser(response.data))

    }
  }
  useEffect(() => {
    fetchUserdetails()
  }, [])
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/create/:id" element={<Create />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/views/:id" element={<ViewPost />} />
        <Route path="/category/:item" element={<Category />} />
        <Route path="/user" element={<User />} />
      </Routes>
      <BottomNav/>
    </BrowserRouter>
  );
}

export default App;
