import { Outlet, useNavigate } from "react-router-dom";
import { HomeContext } from "../Context/HomeContext";
import { useContext } from "react";

const Home = () => {
  const { newSong, error, loading, recommendedMusic } = useContext(HomeContext);

  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-teal-500 via-green-400 to-emerald-200 flex flex-col px-10 py-6 space-y-6 min-h-screen">
        <h1 className="md:text-4xl text-2xl font-bold text-balck shadow-lg p-2 rounded-lg bg-emerald-200/[0.5] text-center">
          Discover Your Next Favorite Song at Solker Music
        </h1>

        {/* New Music Section */}
        <div className="space-y-4 bg-gray-800/[0.5] p-4 pb-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-yellow-100">
              Fresh New Tracks
            </h2>
            <button
              onClick={() => navigate("/song")}
              className="bg-yellow-100 font-semibold px-4 py-2 rounded-md hover:bg-yellow-300 transition"
            >
              See All New Music
            </button>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
            {newSong.map((music) => (
              <div
                onClick={() => navigate(`/song/${music.id}/${music.name}`)}
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
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Music Section */}
        <div className="space-y-4 bg-gray-800/[0.5] p-4 pb-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-yellow-100">
            Recommended for You
          </h2>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
            {recommendedMusic.map((music) => (
              <div
                onClick={() => navigate(`/song/${music.id}/${music.name}`)}
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
              </div>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Home;
