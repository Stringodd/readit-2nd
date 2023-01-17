import React, { useState, useEffect } from "react";
import BrowseBy from "./BrowseBy";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavoriteMovie } from "../../store/slices/favoriteMovieSlice";
import { addWatchMovie } from "../../store/slices/forWatchList";
import { deleteWatchMovie } from "../../store/slices/forWatchList";
import { deleteFavoriteMovies } from "../../store/slices/favoriteMovieSlice";
import MovieAPI from "../../api/MovieAPI";
import { fetchMovies } from "../../store/slices/movieSlice";

function FilmsMain() {
  const movies = useSelector((state) => state.movies.movies);
  //const data = useSelector((state) => state.movie);
  const fetchUserValue = useSelector((state) => state.user.user);
  const [SelectsValue, setSelectsValue] = useState({ year: "", genre: "" });
  const favorite = useSelector((state) => state.favorite.favoriteMovies);
  const watch = useSelector((state) => state.forwatch.watchMovies);
  //const [NewData, setNewData] = movies;
  //const [filterData, setFilterData] = movies;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies())
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);
  /*
  useEffect(() => {
    filter();
  }, [SelectsValue]);
  const YearSelectValue = async (event) => {
    let { year, genre } = SelectsValue;
    //year burada SelectsValue.year ın kısa hali
    if (event.year) {
      year = event.year;
    }
    if (event.genre) {
      genre = event.genre;
    }

    setSelectsValue({ ...SelectsValue, year, genre });
  };

  const filter = () => {
    if (SelectsValue.year === "Year" && SelectsValue.genre === "Genre") {
      setFilterData(NewData);
    } else if (SelectsValue.genre !== "" || SelectsValue.year !== "") {
      setFilterData(
        NewData.filter((item) =>
          SelectsValue.genre !== "" && SelectsValue.year !== ""
            ? item.Category === SelectsValue?.genre &&
              item.Part === SelectsValue?.year
            : item.Category === SelectsValue?.genre ||
              item.Part === SelectsValue?.year
        )
      );
    }
  };

  const FilmName = (event) => {
    const name = event.toLowerCase();
    setFilterData(NewData);
    setFilterData(NewData.filter((item) => item.Name.includes(name)));
  };

  const addToFavoriteMovies = (element) => {
    favorite && favorite.find((x) => x.Id === element.Id)
      ? dispatch(deleteFavoriteMovies(element))
      : dispatch(addFavoriteMovie(element));
  };

  const addToForWatchMovies = (element) => {
    watch && watch.find((x) => x.Id === element.Id)
      ? dispatch(deleteWatchMovie(element))
      : dispatch(addWatchMovie(element));
  };
  */
  return (
    <div className="w-full h-full flex justify-center items-center flex-col bg-[#1f252c]  ">
      <div className=" w-full flex  h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      <div className="w-4/5 h-full  flex flex-row sm:flex-row justify-center items-center text-center  pt-10 pb-10 bg-[#1f252c]  ">
        <div className="flex flex-col w-4/5 text-[#63707d] justify-center text-2xl mt-11 border-b-2 hover:text-[#613573] hover:border-[#613573] border-[#445566]">
          <p>FILMLER</p>
        </div>
      </div>
      <div>
        {Array.isArray(movies) && movies.length !== 0 ? (
          <div className="w-4/5 h-full mt-16  mb-16  grid grid-cols-2 sm:grid-cols-5 justify-center items-center ">
            {movies.map((movie) => (
              <div
                key={movie.id}
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
              </div>
            ))}
          </div>
        ) : (
          <div>No movies</div>
        )}
      </div>
    </div>
  );
}

export default FilmsMain;
