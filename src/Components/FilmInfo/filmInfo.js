import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovie } from "../../store/slices/singleMovieSlice";
import { useState } from "react";
import favoritesAPI from "../../api/favoritesAPI";
import watchlistAPI from "../../api/watchlistAPI";
import AddToListModal from "../Modals/addToListModal";
import "../../css/moviePage.css";
import { fetchRating } from "../../store/slices/ratingsSlice";
import StarRating from "./StarRating";

function FilmInfo() {
  const dispatch = useDispatch();
  const { title } = useParams();
  const current = useSelector((state) => state.movie.movie);
  const fetchUserValue = useSelector((state) => state.user.user);
  const rating = useSelector((state) => state.ratings.ratings);
  const [addMovieModal, setAddMovieModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const movieTitle = title.toString();
  console.log(rating);
  useEffect(() => {
    dispatch(fetchMovie(movieTitle))
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchRating(movieTitle))
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
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

  useEffect(() => {
    dispatch(fetchRating(movieTitle))
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, [rating]);

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

  const addToList = () => {
    {
      setAddMovieModal(!addMovieModal);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center bg-[#1f252c]  ">
      <div className=" w-full h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      <div className=" flex w-4/5 items-center sm:items-center flex-col sm:flex-row   h-full">
        {current && (
          <div className="cont">
            <div className="sm:w-1/3 w-full flex flex-col justify-center text-center items-start">
              <img
                className="  w-[18rem]  h-[26rem] border-[#33394b] rounded-lg border-2  object-cover"
                src={
                  current.posterUrl ? current.posterUrl : "../images/heart.png"
                }
              />
              {rating !== "" ? (
                <div className="w-[8rem] flex flex-row ml-24">
                  <div className="rating">{rating} &#9733;</div>
                </div>
              ) : (
                <div className="w-[8rem] flex flex-row ml-24">
                  <div className="btUpper">No ratings</div>
                </div>
              )}
            </div>
            <div className="w-full sm:w-2/3  flex flex-col justify-start items-center ">
              <div className="flex flex-col justify-center text-center items-center  w-full  mt-6  ">
                <div className="flex flex-row justify-center  items-center text-center  ">
                  <p className="text-white w-6/7 font-bold text-2xl font-serif pr-2">
                    {current.title.toUpperCase()}
                  </p>
                  <p className=" sm:text-xl text-[#77818f]   font-normal">
                    {current.year}
                  </p>
                </div>
                <div className="flex w-full gap-2 justify-center text-center items-center">
                  <p className="  pt-2 sm:text-xl text-[#77818f] font-normal">
                    Directed by {current.director}
                  </p>
                </div>
                <p className="w-4/5  file: mt-6 text-xl text-[#8ba6a0]">
                  {current.plot}
                </p>
                <div className="mt-20 flex flex-col">
                  <div className="flex flex-row">
                    <p className="pt-2 sm:text-xl text-[#77818f] font-normal mr-3">
                      Aktörler
                    </p>
                    <p className="pt-2 sm:text-xl text-[#8ba6a0] font-normal">
                      {current.actors}
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <p className="pt-2 sm:text-xl text-[#77818f] font-normal mr-3">
                      Türler
                    </p>

                    {current.genres.map((genre) => (
                      <p
                        key={genre}
                        className="pt-2 sm:text-xl text-[#8ba6a0] font-normal"
                      >
                        &nbsp;{genre}&nbsp;
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-row">
                    <p className="pt-2 sm:text-xl text-[#77818f] font-normal mr-3">
                      Süre
                    </p>

                    <p className="pt-2 sm:text-xl text-[#8ba6a0] font-normal">
                      {current.runtime} dakika
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {fetchUserValue && (
                <div>
                  <div className="bttn">
                    <div className="star">
                      <StarRating title={current.title} />
                    </div>
                    <div className="bttnUpper">
                      <button
                        className="btUpper"
                        onClick={() => addToFavoriteMovies(title)}
                      >
                        <img
                          className={`h-10 object-cover rounded-2xl ml-10 mr-5 ${
                            isFavorite ? "bg-[#B12403]" : ""
                          }  hover:bg-[#B12403]}`}
                          src={require("../../images/popcorn.png")}
                        />
                      </button>
                      <button
                        className="btUpper"
                        onClick={() => addToWatchlist(title)}
                      >
                        <img
                          className={`h-10 object-cover rounded-2xl ml-10 mr-5 ${
                            inWatchlist ? "bg-[#B12403]" : ""
                          }  hover:bg-[#B12403]}`}
                          src={require("../../images/eye.png")}
                        />
                      </button>
                    </div>
                    <div>
                      <button className="btBottom" onClick={addToList}>
                        LİSTEYE EKLE
                      </button>
                    </div>
                    {addMovieModal && (
                      <AddToListModal
                        modal={addMovieModal}
                        title={current.title}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilmInfo;
