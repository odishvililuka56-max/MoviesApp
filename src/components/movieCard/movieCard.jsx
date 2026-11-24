import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MovieCard = ({
  singleMovie,
  removeFromFavorites = null,
}) => {
  const isFavoriteSaved = () => {
    const saved = localStorage.getItem("my_favs");
    const favMovies = saved ? JSON.parse(saved) : [];
    return favMovies.some((movie) => movie.id === singleMovie.id);
  };

  const [isInFavorites, setIsInFavorites] = useState(isFavoriteSaved);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const updateFavoriteStatus = () => setIsInFavorites(isFavoriteSaved());
    window.addEventListener("favoritesChanged", updateFavoriteStatus);
    window.addEventListener("storage", updateFavoriteStatus);

    return () => {
      window.removeEventListener("favoritesChanged", updateFavoriteStatus);
      window.removeEventListener("storage", updateFavoriteStatus);
    };
  }, [singleMovie.id]);

  function saveStatus(message) {
    localStorage.setItem("favoriteStatus", message);
    localStorage.setItem("favorite_status", message);
    setStatusMessage(message);
  }

  function handleFavorites() {
    if (removeFromFavorites) {
      removeFromFavorites(singleMovie.id);
      saveStatus(`“${singleMovie.title}” removed from favorites!`);
      return;
    }

    const saved = localStorage.getItem("my_favs");
    const favMovies = saved ? JSON.parse(saved) : [];
    const isIncluded = favMovies.some((movie) => movie.id === singleMovie.id);

    if (isIncluded) {
      const updatedFavs = favMovies.filter(
        (movie) => movie.id !== singleMovie.id,
      );
      localStorage.setItem("my_favs", JSON.stringify(updatedFavs));
      setIsInFavorites(false);
      saveStatus(`“${singleMovie.title}” removed from favorites!`);
    } else {
      const updatedFavs = [...favMovies, singleMovie];
      localStorage.setItem("my_favs", JSON.stringify(updatedFavs));
      setIsInFavorites(true);
      saveStatus(`“${singleMovie.title}” added to favorites!`);
    }

    window.dispatchEvent(new Event("favoritesChanged"));
  }

  return (
    <article className="movie-card">
      <button
        className="movie-card-favorite"
        type="button"
        onClick={handleFavorites}
        aria-pressed={isInFavorites}
      >
        {isInFavorites ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      {statusMessage && (
        <p className="movie-card-status" role="status">
          {statusMessage}
        </p>
      )}
      <Link to={`/movie/${singleMovie.id}`} className="movie-card-poster-link">
        <img
          className="movie-card-poster"
          src={singleMovie.poster_path}
          alt={`Poster for ${singleMovie.title}`}
        />
      </Link>
      <Link to={`/movie/${singleMovie.id}`} className="movie-card-info-link">
        <div className="movie-card-info">
          <h2 className="movie-card-title">{singleMovie.title}</h2>
          <div className="movie-card-meta">
            <time dateTime={singleMovie.release_date}>
              {singleMovie.release_date}
            </time>
            <span className="movie-card-rating">
              Rating {singleMovie.vote_average}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};
