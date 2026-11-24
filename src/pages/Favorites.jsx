import { useState, useEffect } from "react";
import { MovieGrid } from "../components/movieGrid/movieGrid";

export const Favorites = () => {
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      const saved = localStorage.getItem("my_favs");
      setFavMovies(saved ? JSON.parse(saved) : []);
    };

    loadFavorites();
    window.addEventListener("favoritesChanged", loadFavorites);
    window.addEventListener("storage", loadFavorites);

    return () => {
      window.removeEventListener("favoritesChanged", loadFavorites);
      window.removeEventListener("storage", loadFavorites);
    };
  }, []);

  function removeFavorite(movieId) { 
    const updatedFavs = favMovies.filter((movie) => movie.id !== movieId);
    localStorage.setItem("my_favs", JSON.stringify(updatedFavs));
    setFavMovies(updatedFavs);
    window.dispatchEvent(new Event("favoritesChanged"));
  }

  return (
    <div>
      <MovieGrid
        movieList={favMovies}
        title="My Favourite Movies"
        removeFromFavorites={removeFavorite}
      />
    </div>
  );
};
