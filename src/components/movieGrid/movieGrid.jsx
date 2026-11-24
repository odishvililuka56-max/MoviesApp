import { useState } from "react";
import { movies } from "../../data/movies";
import { MovieCard } from "../movieCard/movieCard";

export const MovieGrid = ({
  movieList = movies,
  title = "View All Movies",
  removeFromFavorites = null,
}) => {
  const [searchWord, setSearchWord] = useState("");

  function searchItem(e) {
    setSearchWord(e.target.value);
  }

  const filteredMovies = movieList.filter((item) =>
    item.title.toLowerCase().startsWith(searchWord.toLowerCase()),
  );

  return (
    <section className="movie-library">
      <div className="movie-top">
        <h1 className="movie-library-title">{title}</h1>
        <form action="">
          <input
            value={searchWord}
            onChange={searchItem}
            type="text"
            placeholder="Search movies..."
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="movie-grid">
        {filteredMovies.map((item) => (
          <MovieCard
            key={item.id}
            singleMovie={item}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </div>
    </section>
  );
};
