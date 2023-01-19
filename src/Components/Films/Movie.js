import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import favoritesAPI from "../../api/favoritesAPI";
import watchlistAPI from "../../api/watchlistAPI";
import "../../css/movieItem.css";
import { fetchWatchlist } from "../../store/slices/watchlistSlice";
import { fetchFavorites } from "../../store/slices/favoritesSlice";
import { useState } from "react";

function Movie(props) {
  const { id, title, posterUrl } = props.data;
  const fetchUserValue = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  var favorites = useSelector((state) => state.favorites.favorites);
  var watchlist = useSelector((state) => state.watchlist.watchlist);
  var isFavorite = false;
  var inWatchlist = false;
  var favTitles = [];
  var watchTitles = [];
  //problem with buttons displaying wrong, work on it isfavorite/inwatchlist
  if (fetchUserValue) {
    favorites.forEach((element) => {
      favTitles.push(element.title);
    });
    if (favTitles.includes(title)) {
      isFavorite = true;
    }
    watchlist.forEach((element) => {
      watchTitles.push(element.title);
      if (title === element.title) {
        inWatchlist = true;
      }
    });
  }
  const addToFavoriteMovies = (title) => {
    if (favTitles && favTitles.includes(title)) {
      favoritesAPI.deleteFavorite(title, fetchUserValue.uid);
      favTitles = favTitles.filter((name) => name !== title);
    } else {
      favoritesAPI.addFavorite(title, fetchUserValue.uid);
      favTitles = [...favTitles, title];
    }
    dispatch(fetchFavorites());
  };

  const addToWatchlist = (title) => {
    if (watchTitles && watchTitles.includes(title)) {
      watchlistAPI.deleteFromWatchlist(title, fetchUserValue.uid);
      watchTitles = watchTitles.filter((name) => name !== title);
    } else {
      watchlistAPI.addToWatchlist(title, fetchUserValue.uid);
      watchTitles = [...watchTitles, title];
    }
    dispatch(fetchWatchlist());
  };

  return (
    <div key={id} className="movie">
      <div className="container">
        <Link
          className="absolute w-[9rem] h-[13rem] sm:w-[11rem]  sm:h-[16rem] xl:w-[13rem] xl:h-[18rem]  hover:text-[#613573]"
          to={`/movie/${title}`}
        >
          <div className="">
            <img
              className=" absolute w-[9rem] h-[13rem] sm:w-[11rem]  sm:h-[16rem] xl:w-[13rem] xl:h-[18rem] border-2 border-[#55697e] hover:border-[#613573] rounded-3xl object-cover"
              src={
                posterUrl
                  ? posterUrl
                  : "https://cdn.discordapp.com/attachments/1065424417242480710/1065473161883295824/blank.jpg"
              }
            />
            <div className="title">{title}</div>
          </div>

          <div className="overlay"></div>
        </Link>
        {fetchUserValue && (
          <div className="buttonContainer">
            <button onClick={() => addToFavoriteMovies(title)}>
              <img
                className={`h-6 object-cover mr-10 ml-7 rounded-2xl ${
                  isFavorite ? "bg-[#B12403]" : ""
                }  hover:bg-[#B12403]}`}
                src={require("../../images/popcorn.png")}
              />
            </button>
            <button onClick={() => addToWatchlist(title)}>
              <img
                className={`h-6 object-cover rounded-2xl ml-10 mr-5 ${
                  inWatchlist ? "bg-[#B12403]" : ""
                }  hover:bg-[#B12403]}`}
                src={require("../../images/eye.png")}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Movie;
