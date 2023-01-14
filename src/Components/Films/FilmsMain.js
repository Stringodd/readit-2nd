import React, { useState, useEffect } from "react";
import BrowseBy from "./BrowseBy";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavoriteMovie } from "../../store/slices/favoriteMovieSlice";
import { addWatchMovie } from "../../store/slices/forWatchList";
import { deleteWatchMovie } from "../../store/slices/forWatchList";
import { deleteFavoriteMovies } from "../../store/slices/favoriteMovieSlice";
import MovieAPI from "../../api/MovieAPI";

function FilmsMain() {
  const data = MovieAPI.getAllMovies();
  //const data = useSelector((state) => state.movie);
  console.log({ data });
  const isLoginValue = useSelector((state) => state.login);
  const [SelectsValue, setSelectsValue] = useState({ year: "", genre: "" });
  const favorite = useSelector((state) => state.favorite.favoriteMovies);
  const watch = useSelector((state) => state.forwatch.watchMovies);
  const [NewData, setNewData] = useState(data);
  const [filterData, setFilterData] = useState(data);
  const dispatch = useDispatch();
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
  return (
    <div className=" w-full h-full flex flex-col  ">
      <div className="w-full  h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      <BrowseBy ChangeYear={YearSelectValue} FilmName={FilmName} />
      <div className="w-full h-full pt-8  bg-[#1b2228] px-8 pb-8  grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6  ">
        {filterData &&
          filterData.map((element, key) => {
            return (
              <div
                key={key}
                className="  flex  justify-center items-end mb-6 gap-2  h-[16rem] xl:h-[18rem] object-cover    rounded-3xl  group  "
              >
                <Link
                  className="absolute w-[9rem] h-[13rem] sm:w-[11rem]  sm:h-[16rem] xl:w-[13rem] xl:h-[18rem]"
                  to={`/movie/${element.Id}`}
                >
                  <img
                    className="absolute w-[9rem] h-[13rem] sm:w-[11rem]  sm:h-[16rem] xl:w-[13rem] xl:h-[18rem] border-2 border-[#1b2228] hover:border-[#613573] rounded-3xl object-cover "
                    src={require(`../../images/${element.img}`)}
                  />
                </Link>
                {isLoginValue && (
                  <div className="w-1/2 h-10 mb-2 z-10 flex justify-center rounded-lg bg-black opacity-70  gap-4 sm:invisible  sm:group-hover:visible  ease-in-out duration-100 ">
                    <button onClick={() => addToFavoriteMovies(element)}>
                      <img
                        className={` h-6 object-cover   rounded-2xl ${
                          favorite && favorite.find((x) => x.Id === element.Id)
                            ? "bg-[#B12403]"
                            : "hover:bg-[#B12403]"
                        }  `}
                        src={require("../../images/popcorn.png")}
                      />
                    </button>
                    <button onClick={() => addToForWatchMovies(element)}>
                      <img
                        className={` h-6 object-cover   rounded-2xl ${
                          watch && watch.find((x) => x.Id === element.Id)
                            ? "bg-[#00b020]"
                            : "hover:bg-[#00b020]"
                        }  `}
                        src={require("../../images/eye.png")}
                      />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default FilmsMain;
