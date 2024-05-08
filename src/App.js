import{BrowserRouter, Link, Route, Routes} from 'react-router-dom'

import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";

function App() {
  return (
    <BrowserRouter>
    <div>
      <h2>Task Management</h2>
     <Link to="/">Home</Link> |
     <Link to="register">Register</Link> |
     <Link to="login">Login</Link> 

    <Routes>
      <Route path ="/" element = {<Home/>}/>
      <Route path ="register" element = {<Register/>}/>
      <Route path ="login" element = {<Login/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
