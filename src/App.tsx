import { Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import NewGame from "./pages/NewGame";
import Rules from "./pages/Rules";
import GameBoard from "./pages/GameBoard";

export default function App() {
  return (
    <>
      <AppNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewGame />} />
          <Route path="/game" element={<GameBoard />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </div>
    </>
  );
}
