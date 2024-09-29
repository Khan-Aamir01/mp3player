import React, { useEffect, useState } from 'react';
import SongContainer from './songContainer';
import Sidebar from './sidebar';



function MainContent() {
  const [songs, setSongs] = useState([]);  // State to store songs
  const [loading, setLoading] = useState(true);  // State to manage loading

  // Fetch songs from the API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/song');  // API call to backend
        if (!response.ok) {
          throw new Error('Error fetching songs');
        }
        const data = await response.json();  // Parse the JSON response
        setSongs(data);  // Set the songs in state
        setLoading(false);  // Set loading to false
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);  // Even in case of error, stop loading
      }
    };

    fetchSongs();
  }, []);  // Empty dependency array ensures this runs only once on component mount

  // Display loading state or songs
  if (loading) {
    return <div>Loading songs...</div>;
  }

  return (
    <div >
    <Sidebar/>
    <div className=" w-3/4 flex-grow bg-gray-100 p-4 overflow-x-hidden">
      <SongContainer songs={songs} />
      
    </div>
    </div>
  );
}

export default MainContent;