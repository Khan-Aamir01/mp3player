import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./sidebar";

function SongPage() {
  const { id } = useParams(); // Get the song ID from the URL
  const [song, setSong] = useState(null); // State to hold song details
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch song details when component loads
  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/song/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch song details");
        }
        const data = await response.json();
        console.log(data);
        setSong(data); // Set the song details in state
        setLoading(false); // Turn off loading state
      } catch (error) {
        console.error("Error fetching song details:", error);
        setLoading(false);
      }
    };

    fetchSongDetails();
  }, [id]);

  // Show a loading message while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the song data is not found, display an error
  if (!song) {
    return <div>Song not found</div>;
  }

  return (
    <>
      <Sidebar />
      <div className="flex">
        {/* Main content area */}
        <div className="flex-grow p-8">
          {/* Title and Album */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-950">{song.name}</h1>
            <p className="text-lg text-gray-400">Aamir</p>
          </div>

          {/* Song Cover and Player */}
          <div className="flex space-x-8">
            {/* Left side - Song Cover */}
            <div className="w-1/2">
              <img
                src={song.coverURL} // Dynamically set cover URL
                alt={song.name}
                className="w-48 h-auto rounded-lg"
              />
            </div>

            {/* Right side - Song Title and Player */}
            <div className="w-1/2">
              <h2 className="text-2xl text-white mb-4">
                Now Playing: {song.name}
              </h2>
              <audio controls className="w-full">
                <source src={song.songUrl} type="audio/mpeg" />
                {/* Dynamically set song URL */}
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SongPage;
