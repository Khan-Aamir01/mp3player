import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../Context/HomeContext";
import axios from "axios";

const SingleMusic = () => {
  const { error, loading, recommendedMusic } = useContext(HomeContext);
  const { id, name } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null); // Store the Audio object here
  const [coverURL, setCoverURL] = useState("");
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Fetch song from API and create the Audio object
  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/song/${id}`);
        const data = response.data; // Axios automatically parses JSON
        const audioObject = new Audio(data.songUrl); // Create Audio object with song URL
        setAudio(audioObject);
        setCoverURL(data.coverURL);  
      } catch (err) {
        console.log("Error while fetching song");
      }
    };

    fetchSong(); // Call the async function inside useEffect
  }, [id]);

  // Attach event listeners to the Audio object for duration and time update
  useEffect(() => {
    if (audio) {
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });

      return () => {
        audio.removeEventListener("loadedmetadata", () => {});
        audio.removeEventListener("timeupdate", () => {});
      };
    }
  }, [audio]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Function to handle progress bar click
  const handleProgressClick = (event) => {
    const { offsetX, currentTarget } = event.nativeEvent;
    const progressBarWidth = currentTarget.offsetWidth;
    const clickPosition = offsetX / progressBarWidth;
    const newTime = clickPosition * duration;
    audio.currentTime = newTime; // Jump to the clicked position in the song
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="bg-gradient-to-r from-teal-500 via-green-400 to-emerald-200 flex flex-col px-10 py-6 space-y-6 min-h-screen">
      <h1 className="md:text-4xl text-2xl font-bold text-black shadow-lg p-2 rounded-lg bg-emerald-200/[0.5] text-center">
        Now Playing: {name}
      </h1>
  
      {/* Music Player Controls with Cover */}
      <div className="bg-gray-800/[0.5] p-4 rounded-lg shadow-lg flex space-x-6">
        {/* Song Cover */}
        {coverURL && (
          <img
            src={coverURL}
            alt={`${name} Cover`}
            className="w-24 h-24 object-cover rounded-lg"
          />
        )}
  
        {/* Controls and Progress Bar */}
        <div className="flex-1 space-y-4">
          {/* Progress Bar */}
          <div
            className="w-full bg-gray-700 h-2 rounded-full mb-2 relative cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-yellow-100">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
  
          {/* Control Buttons Below the Progress Bar */}
          <div className="flex justify-center space-x-4 mt-4">
            {/* Reset Button (Rewind) */}
            <button
              onClick={() => { audio.currentTime = 0; setCurrentTime(0); }}
              className="text-3xl bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              ⏮
            </button>
  
            {/* Pause/Resume Button */}
            <button
              onClick={togglePlayPause}
              className="text-3xl bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              {isPlaying ? "⏸️" : "▶️"}
            </button>
  
            {/* Skip 10 Seconds Button (Fast-Forward) */}
            <button
              onClick={() => { 
                const newTime = audio.currentTime + 10;
                audio.currentTime = newTime <= duration ? newTime : duration;
                setCurrentTime(audio.currentTime);
              }}
              className="text-3xl bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              ⏭
            </button>
          </div>
        </div>
      </div>
  
      {/* Recommended Music Section */}
      <div className="bg-gray-800/[0.5] p-4 pb-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-yellow-100">Recommended Music</h2>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
          {recommendedMusic.map((music) => (
            <a
              href={`/song/${music.id}/${music.name}`}
              key={music.id}
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md cursor-pointer"
            >
              <img
                src={music.coverURL}
                alt={music.name}
                className="w-32 h-36 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-medium text-gray-800">{music.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleMusic;


