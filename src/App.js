import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavbarMain from "./Components/Navbar/NavbarMain";
import Footer from "./Components/Footer/Footer";
import CreateModal from "./Components/Modals/CreateModal";
import { fetchUser } from "./store/slices/userSlice";

import Pages from "./Pages";
import { fetchWatchlist } from "./store/slices/watchlistSlice";
import { fetchFavorites } from "./store/slices/favoritesSlice";
import { fetchMovies } from "./store/slices/movieSlice";
function App() {
  const dispatch = useDispatch();
  const favoritesFromLocalStorage = localStorage.getItem("favoriteMovies");

  useEffect(() => {
    dispatch(fetchUser())
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <NavbarMain />
      <Pages />
      <Footer />
      <CreateModal />
    </div>
  );
}

export default App;
