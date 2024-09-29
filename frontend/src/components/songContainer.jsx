import React from 'react';
import SongCard from './songCard'; // Import SongCard component
import { Link } from 'react-router-dom';


function SongContainer({songs}) {
    
    songs.forEach(element => {
        console.log(element.name);
    });

    return (
        <div className="p-4 m-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Songs</h2>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Show All
                </button>
            </div>
            <Link to='/song/:id'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
                
                {songs.map((songs) => (
                    <SongCard key={songs.id} song={songs} />
                ))} 
            </div> </Link>
        </div>
    );
}

export default SongContainer;