import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const fetchVerse = async () => {
  const response = await fetch("https://bible-api.com/data/web/random");
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const Home = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [liked, setLiked] = useState(false);
  const FAVORITES_LIMIT = 10;

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["randomVerse"],
    queryFn: fetchVerse,
  });

  useEffect(() => {
    if (!data) {
      setLiked(false);
      return;
    }
    const exists = favorites.some(
      (verse) =>
        verse.random_verse.chapter === data.random_verse.chapter &&
        verse.random_verse.verse === data.random_verse.verse
    );
    setLiked(exists);
  });

  const likedVerse = () => {
    if (!data) return;
    if (favorites.length >= FAVORITES_LIMIT) return;
    if (liked) {
      setFavorites((prev) =>
        prev.filter(
          (verse) =>
            verse.random_verse.chapter === data.random_verse.chapter &&
            verse.random_verse.verse === data.random_verse.verse
        )
          ? prev
          : [...prev, data]
      );
      setLiked(false);
    } else {
      setFavorites((prev) => [...prev, data]);
      setLiked(true);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-14">
      <div className="w-full max-w-md rounded-md border-2 border-black shadow-[5px_7px_0px_0px_#1e2328] p-6">
        {isLoading || isFetching ? (
          <div className="text-gray-700">Loading...</div>
        ) : error ? (
          <div className="text-red-600">Error fetching verse.</div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-lg mb-1">
                  {data.random_verse.book}
                </div>
                <div className="text-blue-500 font-semibold">
                  <Link
                    to={`/bible/${data.random_verse.book}/${data.random_verse.chapter}/${data.random_verse.verse}`}
                  >
                    {`${data.random_verse.chapter}:${data.random_verse.verse}`}
                  </Link>
                </div>
                <div className="text-sm mt-0.5 text-gray-700">
                  {data.translation.name} (
                  {data.translation.identifier.toUpperCase()})
                </div>
              </div>
              <button
                onClick={likedVerse}
                className="border bg-blue-400 rounded-md shadow px-3 py-2  transition"
              >
                <span role="img" aria-label="favorite">
                  {favorites.length >= FAVORITES_LIMIT
                    ? "🤍"
                    : liked
                    ? "❤️"
                    : "🤍"}
                </span>
              </button>
            </div>
            <div className="mt-12 text-lg font-medium text-black">
              {data.random_verse.text}
            </div>
          </>
        )}
      </div>
      <button
        onClick={() => refetch()}
        className="bg-blue-400 text-black font-medium px-6 py-2 rounded-md shadow-[5px_7px_0px_0px_#1e2328] hover:bg-blue-500 transition flex items-center gap-2"
      >
        Get New Verse
      </button>
    </main>
  );
};
