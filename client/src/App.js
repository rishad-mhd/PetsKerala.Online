import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Create from './Pages/Create';
import Home from './Pages/Home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
