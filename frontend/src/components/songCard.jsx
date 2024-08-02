import React from 'react';

function SongCard({ song }) {
  return (
    <div className="bg-white rounded shadow-md p-4 w-36">
      <img src={song.cover} alt={song.title} className="w-full h-36 object-cover rounded-md" />
      <h3 className="text-lg font-medium mt-2">{song.title}</h3>
      <p className="text-gray-500">{song.artist}</p>
    </div>
  );
}

export default SongCard;