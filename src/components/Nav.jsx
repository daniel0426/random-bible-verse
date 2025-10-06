import logo from "../assets/bible.png";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 border-b-4 border-black bg-white shadow">
      <Link to="/" className="h-10">
        <img src={logo} alt="Bible logo" className="h-10" />
      </Link>
      <div className="flex gap-4 flex-1 justify-end">
        <Link
          to="/"
          className="bg-blue-400 text-white px-5 py-2 font-semibold rounded-lg shadow-md hover:bg-blue-500 transition"
        >
          Home
        </Link>
        <Link
          to="/favorites"
          className="bg-blue-400 text-white  px-5 py-2 font-semibold rounded-lg hover:bg-blue-500 transition"
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
};
