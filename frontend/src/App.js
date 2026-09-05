import "./App.css";
import Home from "./component/Home";
import About from "./component/About";
import Navbar from "./component/Navbar";
import NoteState from "./context/notes/NoteState";
import { Routes, Route } from "react-router-dom";
import Alert from "./component/Alert"
import Login from "./component/Login";
import Signup from "./component/Signup";
function App() {
  return (
    <NoteState>
      <div className="App">
        <Navbar/>
        <Alert/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
        </div>
      </div>
    </NoteState>
  );
}

export default App;
