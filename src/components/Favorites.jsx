import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavs = localStorage.getItem("favorites");
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }
  }, []);

  if (favorites.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
        <h1 className="text-2xl font-bold">No favorite verses yet</h1>
        <div className="flex flex-col items-center">
          <p>
            Start building your collection by adding verses to your favorites.
          </p>
          <p>You can save up to 10 verses that inspire you.</p>
        </div>
        <Link
          to="/"
          className="bg-blue-400 text-white px-5 py-2 font-semibold rounded-lg shadow-md hover:bg-blue-500 transition"
        >
          Go to get some verses
        </Link>
      </main>
    );
  }

  const removeVerse = () => {
    setFavorites((prev) => prev.slice(1));
    const updatedFavs = favorites.slice(1);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  return (
    <main className="min-h-screen p-6">
      <div className="mb-12 text-center">
        <h1 className="text-2xl font-bold mb-4 ">Your Favorite Verses</h1>
        <h2>{favorites.length} of 10 verses saved</h2>
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        {favorites.map((verse, i) => (
          <div
            key={`${verse.random_verse.book}-${verse.random_verse.chapter}-${verse.random_verse.verse}-${i}`}
            className="max-w-md rounded-md border-2 border-black bg-[#e0eeff] shadow-[5px_7px_0px_0px_#1e2328] p-6 relative"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="font-bold">{verse.random_verse.book}</div>
                <div className="text-blue-500 font-semibold">{`${verse.random_verse.chapter}:${verse.random_verse.verse}`}</div>
                <div className="text-sm mt-0.5">{`${
                  verse.translation.name
                } (${verse.translation.identifier.toUpperCase()})`}</div>
              </div>
              <button
                onClick={removeVerse}
                className="border  rounded-md shadow px-3 py-2 hover:bg-gray-300 transition"
              >
                <span role="img" aria-label="favorite">
                  ❤️
                </span>
              </button>
            </div>
            <p className="mt-2">{verse.random_verse.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
};
