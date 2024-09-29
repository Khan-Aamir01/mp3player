import React from 'react';
import { useNavigate } from 'react-router-dom';

function SongCard({ song }) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/song/${song.id}`);  // Redirect to the song page with the song ID
  };
  return (
    <div
      className="bg-white rounded shadow-md p-4 w-36 cursor-pointer"
      onClick={handleCardClick}
    >
      <img src={song.coverURL} alt={song.name} className="w-full h-36 object-cover rounded-md" />
      <h3 className="text-lg font-medium mt-2">{song.name}</h3>
      <p className="text-gray-500">Artist Name</p>
    </div>
  );
}

export default SongCard;