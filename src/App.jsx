import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Home } from "./components/Home";
import { Favorites } from "./components/Favorites";
import { VerseDetail } from "./components/VerseDetail";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen overflow-hidden">
        <Nav />
        <main className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route
              path="/bible/:bookId/:chapter/:verse"
              element={<VerseDetail />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
