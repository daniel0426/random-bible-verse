import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchSpecificVerse = async ({ queryKey }) => {
  const [_tag, bookId, chapter, verse] = queryKey;
  console.log(queryKey);
  const response = await fetch(
    `https://bible-api.com/${bookId}+${chapter}:${verse}`
  );
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const VerseDetail = () => {
  const { bookId, chapter, verse } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["verseDetail", bookId, chapter, verse],
    queryFn: fetchSpecificVerse,
  });
  console.log(data.verses[0].book_name);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-14">
      <div className="w-full max-w-md rounded-md border-2 border-black shadow-[5px_7px_0px_0px_#1e2328] p-6">
        {isLoading ? (
          <div className="text-gray-700">Loading...</div>
        ) : error ? (
          <div className="text-red-600">Error fetching verse.</div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-lg mb-1">
                  {data.verses[0].book_name}
                </div>
                <div className="text-blue-500 font-semibold">
                  {`${data.verses[0].chapter}:${data.verses[0].verse}`}
                </div>
                <div className="text-sm mt-0.5 text-gray-700">
                  {data.translation_name} ({data.translation_id.toUpperCase()})
                </div>
              </div>
              <button className="border bg-blue-400 rounded-md shadow px-3 py-2  transition">
                <span role="img" aria-label="favorite">
                  🤍
                </span>
              </button>
            </div>
            <div className="mt-12 text-lg font-medium text-black">
              {data.text}
            </div>
          </>
        )}
      </div>
      <button className="bg-blue-400 text-black font-medium px-6 py-2 rounded-md shadow-[5px_7px_0px_0px_#1e2328] hover:bg-blue-500 transition flex items-center gap-2">
        Share Verse
      </button>
    </main>
  );
};
