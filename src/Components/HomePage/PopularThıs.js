import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { addFavoriteMovie } from "../../store/slices/favoriteMovieSlice";
import { addWatchMovie } from "../../store/slices/forWatchList";
import { deleteWatchMovie } from "../../store/slices/forWatchList";
import { deleteFavoriteMovies } from "../../store/slices/favoriteMovieSlice";
function PopularThıs() {
  const data = useSelector((state) => state.mert.data);
  const isLoginValue = useSelector((state) => state.user !== null);
  const favorite = useSelector((state) => state.favorite.favoriteMovies);
  const watch = useSelector((state) => state.forwatch.watchMovies);
  const dispatch = useDispatch();

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
    <div className="w-full h-full bg-[#14181c] flex justify-center items-center flex-col">
      <div className="flex flex-col w-4/5 text-[#63707d]  mt-15 border-b-2 hover:text-[#613573] hover:border-[#613573] border-[#445566]">
        <p>BU HAFTANIN POPÜLER OLANLARI</p>
      </div>
      <div className="w-4/5 h-full mt-8 bg-[#14181c] grid grid-cols-2 sm:grid-cols-5  justify-center items-center ">
        {data.slice(0, 5).map((element, key) => {
          return (
            <div
              key={key}
              className="  h-[16rem] xl:h-[18rem] rounded-3xl  sm:mx-7 my-2 flex  items-end justify-center group  "
            >
              <Link
                className="absolute w-[9rem] h-[13rem] sm:w-[11rem]  sm:h-[16rem] xl:w-[13rem] xl:h-[18rem]"
                to={`/movie/${element.Id}`}
              >
                <img
                  className=" absolute w-[9rem] h-[13rem] sm:w-[11rem]  sm:h-[16rem] xl:w-[13rem] xl:h-[18rem] border-2 border-[#1b2228] hover:border-[#613573] rounded-3xl object-cover"
                  src={require(`../../images/${element.img}`)}
                />
              </Link>
              {isLoginValue && (
                <div className="w-3/5 h-10 mb-2 z-10 flex justify-center rounded-lg bg-black opacity-70  gap-4 sm:invisible  sm:group-hover:visible  ease-in-out duration-100 ">
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
      <div className="flex flex-col justify-between  items-center w-4/5 h-full py-16  text-[#63707d]  mt-12 gap-16  hover:text-[#42668a]  ">
        <p className=" w-full border-b-2 border-[#42668a] hover:border-[#613573] hover:text-[#613573]">
          ÖNERİLENLER
        </p>
        <Link to="/lists">
          <button className="w-[19rem] h-[3.5rem] bg-[#c4a60e] hover:border-2 text-xl p-2 justfy- rounded-xl text-white  ">
            POPÜLER LİSTELER
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PopularThıs;
