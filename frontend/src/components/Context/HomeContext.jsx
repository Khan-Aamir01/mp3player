import axios from "axios";
import { createContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const [newSong, setNewSong] = useState([]);
  const [recommendedMusic, setRecommendedMusic] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get top 6 musics which are newly uploaded
  const getNewSong = async () => {
    try {
      const response = await axios.get(`${API_URL}/song/new`);
      const data = response.data;
      setNewSong(data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data || "Something went wrong");
      setLoading(false);
    }
  };

  //   Get randome 3 musics
  const getRecommendedMusic = async () => {
    try {
      const response = await axios.get(`${API_URL}/song/recommended`);
      const data = response.data;
      setRecommendedMusic(data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data || "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewSong();
    getRecommendedMusic();
  }, []);

  return (
    <HomeContext.Provider value={{ newSong, recommendedMusic, error, loading }}>
      {children}
    </HomeContext.Provider>
  );
};

export { HomeContext, HomeProvider };