import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../Context/HomeContext";

const SingleMusic = () => {
  const { error, loading, recommendedMusic } = useContext(HomeContext);

  const { id, name } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(`/mp3/${name}.mp3`));
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
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
  }, [audio, name, id]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
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

      {/* Music Player Controls */}
      <div className="bg-gray-800/[0.5] p-4 rounded-lg shadow-lg space-y-4">
        <div className="flex justify-between items-center">
          <button
            onClick={togglePlayPause}
            className="bg-yellow-100 font-semibold px-4 py-2 rounded-md hover:bg-yellow-300 transition"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <a
            href={`/mp3/${name}.mp3`}
            download={`/mp3/${name}.mp3`}
            className="bg-green-600 font-semibold px-4 py-2 rounded-md hover:bg-green-800 transition"
          >
            Download
          </a>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 h-2 rounded-full mb-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-yellow-100">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Recommended Music Section */}
      <div className="bg-gray-800/[0.5] p-4 pb-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-yellow-100">
          Recommended Music
        </h2>
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
              <h3 className="text-lg font-medium text-gray-800">
                {music.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleMusic;
