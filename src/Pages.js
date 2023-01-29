import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import FilmsMain from "./Components/Films/FilmsMain";
import HomePage from "./Components/HomePage/HomePage";
import Profile from "./Components/Profile/profile";
import Watchlist from "./Components/Watchlist/Watchlist";
import FilmInfo from "./Components/FilmInfo/filmInfo";
import Lists from "./Components/Lists/Lists";
import ListInfo from "./Components/Lists/ListInfo";
import Favorites from "./Components/Favorites/Favorites";

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

        <Route path="/favoritemovies" element={<Favorites />} />
        <Route path="/Watchlist" element={<Watchlist />} />
      </Routes>
    </div>
  );
}

export default Pages;
