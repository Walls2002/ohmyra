import Chat from "./pages/Chat";
import About from "./pages/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
