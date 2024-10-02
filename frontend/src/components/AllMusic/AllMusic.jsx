import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { HomeContext } from "../Context/HomeContext";

const AllMusic = () => {
  const { allSong, error, loading } = useContext(HomeContext);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="bg-gradient-to-r from-teal-500 via-green-400 to-emerald-200 flex flex-col px-10 py-6 space-y-6 min-h-screen">
      <h1 className="md:text-4xl text-2xl font-bold text-black shadow-lg p-2 rounded-lg bg-emerald-200/[0.5] text-center">
        All Songs
      </h1>

      {/* All Songs Section */}
      <div className="bg-gray-800/[0.5] p-4 pb-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-yellow-100 mb-4">
          Available Songs
        </h2>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
          {allSong.map((music) => (
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
  );
};

export default AllMusic;
