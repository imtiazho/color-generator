import './App.css';
import { Routes, Route } from "react-router-dom";
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import Generator from './Components/Generator/Generator';
import RequirAuth from './Components/RequirAuth/RequirAuth';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generator" element={
          <RequirAuth>
            <Generator />
          </RequirAuth>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
