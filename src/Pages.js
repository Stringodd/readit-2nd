import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import FilmsMain from "./Components/Films/FilmsMain";
import HomePage from "./Components/HomePage/HomePage";
import Profile from "./Components/Profile/profile";
import WatchList from "./Components/Profile/watchList";
import FavoriteMovies from "./Components/Profile/favoriteMovies";
import FilmInfo from "./Components/FilmInfo/filmInfo";

function Pages() {
  const isLoginValue = useSelector((state) => state.user !== null);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />

        <Route path="/films" element={<FilmsMain />} />

        <Route path="/movie/:id" element={<FilmInfo />} />

        {isLoginValue && <Route path="/profile" element={<Profile />} />}
        {isLoginValue && (
          <Route path="/favoritemovies" element={<FavoriteMovies />} />
        )}
        {isLoginValue && <Route path="/watchlist" element={<WatchList />} />}
      </Routes>
    </div>
  );
}

export default Pages;
