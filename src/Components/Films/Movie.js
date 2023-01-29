import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import favoritesAPI from "../../api/favoritesAPI";
import watchlistAPI from "../../api/watchlistAPI";
import "../../css/movieItem.css";
import { useEffect, useState } from "react";
import { fetchWatchlist } from "../../store/slices/watchlistSlice";
import { fetchFavorites } from "../../store/slices/favoritesSlice";

function Movie(props) {
  const { id, title, posterUrl } = props.data;
  const fetchUserValue = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    async function checkFavorite() {
      const favResult = await favoritesAPI.isFavorite(
        title,
        fetchUserValue.uid
      );
      setIsFavorite(favResult);
    }
    async function checkWatchlist() {
      const watchResult = await watchlistAPI.inWatchlist(
        title,
        fetchUserValue.uid
      );
      setInWatchlist(watchResult);
    }
    checkWatchlist();
    checkFavorite();
  }, []);

  const addToFavoriteMovies = (title) => {
    if (isFavorite) {
      favoritesAPI.deleteFavorite(title, fetchUserValue.uid);
    } else {
      favoritesAPI.addFavorite(title, fetchUserValue.uid);
    }
    setIsFavorite(!isFavorite);
  };

  const addToWatchlist = (title) => {
    if (inWatchlist) {
      watchlistAPI.deleteFromWatchlist(title, fetchUserValue.uid);
    } else {
      watchlistAPI.addToWatchlist(title, fetchUserValue.uid);
    }
    setInWatchlist(!inWatchlist);
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
