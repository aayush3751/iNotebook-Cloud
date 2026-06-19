import "./App.css";
import Home from "./component/Home";
import About from "./component/About";
import Navbar from "./component/Navbar";
import NoteState from "./context/notes/NoteState";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <NoteState>
      <div className="App">
        <Navbar/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </NoteState>
  );
}

export default App;
