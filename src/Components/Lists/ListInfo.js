import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchList } from "../../store/slices/singleListSlice";
import { Link } from "react-router-dom";
import ListAPI from "../../api/ListAPI";
import { addFavoriteMovie } from "../../store/slices/favoriteMovieSlice";
import { addWatchMovie } from "../../store/slices/forWatchList";
import { deleteWatchMovie } from "../../store/slices/forWatchList";
import { deleteFavoriteMovies } from "../../store/slices/favoriteMovieSlice";
import favoritesAPI from "../../api/favoritesAPI";
import { fetchFavorites } from "../../store/slices/favoritesSlice";
import { fetchWatchlist } from "../../store/slices/watchlistSlice";
import watchlistAPI from "../../api/watchlistAPI";

function ListInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const current = useSelector((state) => state.list.list);
  const fetchUserValue = useSelector((state) => state.user.user);
  var favorites = useSelector((state) => state.favorites.favorites);
  var watchlist = useSelector((state) => state.watchlist.watchlist);
  const listid = id.toString();

  useEffect(() => {
    dispatch(fetchList(listid))
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    dispatch(fetchFavorites())
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    dispatch(fetchWatchlist())
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const addToFavoriteMovies = (movie) => {
    if (favorites && favorites.includes(movie)) {
      favoritesAPI.deleteFavorite(movie, fetchUserValue.uid);
      favorites = favorites.filter((title) => title !== movie);
    } else {
      favoritesAPI.addFavorite(movie, fetchUserValue.uid);
      favorites = [...favorites, movie];
    }
  };

  const addToWatchlist = (movie) => {
    if (watchlist && watchlist.includes(movie)) {
      watchlistAPI.deleteFromWatchlist(movie, fetchUserValue.uid);
      watchlist = watchlist.filter((title) => title !== movie);
    } else {
      watchlistAPI.addToWatchlist(movie, fetchUserValue.uid);
      watchlist = [...watchlist, movie];
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center bg-[#1f252c]  ">
      <div className=" w-full h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      <div className=" flex w-4/5 items-center sm:items-center flex-col sm:flex-row   h-full">
        {current && (
          <div
            className=" w-4/5  py-12 h-full  flex  flex-col sm:flex-row
        "
          >
            <div className="sm:w-1/3 w-full flex justify-center items-start">
              <img
                className="  w-[16rem]  h-[24rem] border-[#33394b] rounded-lg border-2  object-cover"
                src={
                  current.movies[0]
                    ? current.movies[0].posterUrl
                    : "../images/heart.png"
                }
              />
            </div>
            <div className="w-full sm:w-2/3  flex flex-col justify-start items-center ">
              <div className="flex flex-col justify-center text-center items-center  w-full  mt-6 sm:ml-6 ">
                <p className="text-white w-6/7 font-bold text-2xl font-serif">
                  {current.listname.toUpperCase()}
                </p>
                <div className="flex w-full gap-2 justify-center text-center items-center">
                  <p className="  pt-2 sm:text-xl text-[#77818f]   font-normal">
                    te
                  </p>
                  <p className="  pt-2 sm:text-xl text-[#77818f] font-normal">
                    Directed by {fetchUserValue.username}
                  </p>
                </div>
                <p className="w-4/5  file: mt-6 text-lg text-[#8ba6a0]"></p>
              </div>
              <div>
                {Array.isArray(current.movies) &&
                current.movies.length !== 0 ? (
                  <div className="w-4/5 h-full mt-16  mb-16  grid grid-cols-2 sm:grid-cols-5 justify-center items-center ">
                    {current.movies.map((movie) => (
                      <div
                        key={movie.title}
                        className="h-[16rem] xl:h-[18rem]  rounded-3xl mx-7 my-2 flex  flex-row justify-center group  "
                      >
                        <Link
                          className="absolute w-[9rem] h-[13rem] sm:w-[11rem]  sm:h-[16rem] xl:w-[13rem] xl:h-[18rem]  hover:text-[#613573]"
                          to={`/movie/${movie.title}`}
                        >
                          <div className="">
                            <img
                              className=" absolute w-[9rem] h-[13rem] sm:w-[11rem]  sm:h-[16rem] xl:w-[13rem] xl:h-[18rem] border-2 border-[#1b2228] hover:border-[#613573] rounded-3xl object-cover"
                              src={
                                movie.posterUrl
                                  ? movie.posterUrl
                                  : "../images/heart.png"
                              }
                            />
                            <div>{movie.title}</div>
                          </div>
                        </Link>
                        {fetchUserValue && (
                          <div className=" h-10 mb-2 z-10  rounded-lg bg-black opacity-70  sm:invisible  sm:group-hover:visible  ease-in-out duration-100  ">
                            <button
                              onClick={() => addToFavoriteMovies(movie.title)}
                            >
                              <img
                                className={` h-6 object-cover   rounded-2xl bg-[#B12403] hover:bg-[#B12403]}`}
                                src={require("../../images/popcorn.png")}
                              />
                            </button>
                            <button onClick={() => addToWatchlist(movie.title)}>
                              <img
                                className={" h-6 object-cover   rounded-2xl "}
                                src={require("../../images/eye.png")}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No movies</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListInfo;
