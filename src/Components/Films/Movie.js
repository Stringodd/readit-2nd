import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import favoritesAPI from "../../api/favoritesAPI";
import watchlistAPI from "../../api/watchlistAPI";
import { useEffect } from "react";
import { fetchWatchlist } from "../../store/slices/watchlistSlice";
import { fetchFavorites } from "../../store/slices/favoritesSlice";

function Movie(props) {
  const { id, title, posterUrl } = props.data;
  const fetchUserValue = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  var favorites = useSelector((state) => state.favorites.favorites);
  var watchlist = useSelector((state) => state.watchlist.watchlist);
  var favTitles = [];
  var watchTitles = [];
  if (fetchUserValue) {
    favorites.forEach((element) => {
      favTitles.push(element.title);
    });
    watchlist.forEach((element) => {
      watchTitles.push(element.title);
    });
  }
  const addToFavoriteMovies = (title) => {
    dispatch(fetchFavorites());
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
    dispatch(fetchWatchlist());
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
    <div
      key={id}
      className="h-[16rem] xl:h-[18rem]  rounded-3xl mx-7 my-2 flex  flex-row justify-center group  "
    >
      <Link
        className="absolute w-[9rem] h-[13rem] sm:w-[11rem]  sm:h-[16rem] xl:w-[13rem] xl:h-[18rem]  hover:text-[#613573]"
        to={`/movie/${title}`}
      >
        <div className="">
          <img
            className=" absolute w-[9rem] h-[13rem] sm:w-[11rem]  sm:h-[16rem] xl:w-[13rem] xl:h-[18rem] border-2 border-[#1b2228] hover:border-[#613573] rounded-3xl object-cover"
            src={posterUrl ? posterUrl : "../images/heart.png"}
          />
          <div>{title}</div>
        </div>
      </Link>
      {fetchUserValue && (
        <div className=" h-10 mb-2 z-10  rounded-lg bg-black opacity-70  sm:invisible  sm:group-hover:visible  ease-in-out duration-100  ">
          <button onClick={() => addToFavoriteMovies(title)}>
            <img
              className={` h-6 object-cover   rounded-2xl bg-[#B12403] hover:bg-[#B12403]}`}
              src={require("../../images/popcorn.png")}
            />
          </button>
          <button onClick={() => addToWatchlist(title)}>
            <img
              className={" h-6 object-cover   rounded-2xl "}
              src={require("../../images/eye.png")}
            />
          </button>
        </div>
      )}
    </div>
  );
}
export default Movie;
