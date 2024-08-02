import React from 'react';
import SongCard from './songCard'; // Import SongCard component

function SongContainer() {
    const songs = [
        { id: 1, title: 'Song 1', artist: 'Artist 1', cover: 'image1.jpg' },
        { id: 2, title: 'Song 2', artist: 'Artist 2', cover: 'image2.jpg' },
        { id: 3, title: 'Song 3', artist: 'Artist 3', cover: 'image3.jpg' },
        { id: 4, title: 'Song 4', artist: 'Artist 4', cover: 'image4.jpg' },
        { id: 5, title: 'Song 5', artist: 'Artist 5', cover: 'image5.jpg' },
        { id: 6, title: 'Song 6', artist: 'Artist 6', cover: 'image6.jpg' },
        // Add more songs here
    ];

    return (
        <div className="p-4 m-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Songs</h2>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Show All
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
                {songs.map((song) => (
                    <SongCard key={song.id} song={song} />
                ))}
            </div>
        </div>
    );
}

export default SongContainer;