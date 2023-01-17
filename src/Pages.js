import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import FilmsMain from "./Components/Films/FilmsMain";
import HomePage from "./Components/HomePage/HomePage";
import Profile from "./Components/Profile/profile";
import WatchList from "./Components/Profile/watchList";
import FavoriteMovies from "./Components/Profile/favoriteMovies";
import FilmInfo from "./Components/FilmInfo/filmInfo";
import Lists from "./Components/Lists/Lists";
import ListInfo from "./Components/Lists/ListInfo";

function Pages() {
  const fetchUserValue = useSelector((state) => state.user.user);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />

        <Route path="/films" element={<FilmsMain />} />

        <Route path="/lists" element={<Lists />} />
        <Route path="/lists/:id" element={<ListInfo />} />

        <Route path="/movie/:title" element={<FilmInfo />} />

        {fetchUserValue && <Route path="/profile" element={<Profile />} />}
        {fetchUserValue && (
          <Route path="/favoritemovies" element={<FavoriteMovies />} />
        )}
        {fetchUserValue && <Route path="/watchlist" element={<WatchList />} />}
      </Routes>
    </div>
  );
}

export default Pages;
