import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import Pagination from "./Pagination";
import { fetchWatchlist } from "../../store/slices/watchlistSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../../store/slices/favoritesSlice";
import { fetchMovies } from "../../store/slices/movieSlice";

function FilmsMain() {
  const allMovies = useSelector((state) => state.movies.movies);
  const [movies, setMovies] = useState(allMovies);
  const [filterData, setFilterData] = useState(allMovies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies())
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

  //works individually
  const ChangeGenre = (event) => {
    var genre = event;
    if (event === "Tür") {
    } else {
      setMovies(allMovies.filter((item) => item.genres.includes(genre)));
    }
  };
  const FilmName = (event) => {
    const title = event.toLowerCase();
    setMovies(
      allMovies.filter((item) => item.title.toLowerCase().includes(title))
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col bg-[#1f252c]  ">
      <div className=" w-full flex  h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      <div>
        <div className="w-full h-full bg-[#1b2228] flex flex-col sm:flex-row justify-center sm:justify-between items-center p-20">
          <div className="  flex flex-col sm:flex-row text-lg  text-[#899aa9] ">
            <p>FİLTRELEME</p>
            <div className="border-2 sm:mt-0 mt-4 border-[#232a31] flex text-center  sm:ml-4">
              <select
                onChange={(event) => ChangeGenre(event.target.value)}
                className="bg-[#1b2127] w-[140px]   focus:bg-[#D3D3D3]  focus:text-black focus:text-opacity-60 "
              >
                <option>Tür</option>
                <option>Fantasy</option>
                <option>Crime</option>
                <option>Drama</option>
                <option>Music</option>
                <option>Adventure</option>
                <option>History</option>
                <option>Thriller</option>
                <option>Animation</option>
                <option>Family</option>
                <option>Mystery</option>
                <option>Biography</option>
                <option>Action</option>
                <option>Film-Noir</option>
                <option>Romance</option>
                <option>Sci-Fi</option>
                <option>War</option>
                <option>Western</option>
                <option>Horror</option>
                <option>Musical</option>
                <option>Sport</option>
              </select>
            </div>
          </div>
          <div className=" flex  items-center sm:mt-0 mt-4 ">
            <p className="flex flex-row pl-2 sm:text-lg font-sans  text-[#899aa9] ">
              FİLM ARA
            </p>
            <input
              onChange={(event) => FilmName(event.target.value)}
              className="w-[250px] sm:ml-5 h-[40px] ml-2 bg-[#2c3440] rounded-lg focus:bg-slate-100 pl-2"
            ></input>
          </div>
        </div>
        <p className=" bg-[#1b2228] pl-16 text-xl text-[#63707d] hover:text-[#613573] w-full border-b-2 border-[#445566] hover:border-[#613573]">
          TÜM FİLMLER
        </p>
      </div>
      <div>
        {Array.isArray(movies) && movies.length !== null ? (
          <div className="w-4/5 h-full mt-16  mb-16  grid grid-cols-2 sm:grid-cols-5 justify-center items-center ">
            <Pagination
              data={movies}
              RenderComponent={Movie}
              title="Movies"
              pageLimit={5}
              dataLimit={20}
            />
          </div>
        ) : (
          <div>No movies</div>
        )}
      </div>
    </div>
  );
}

export default FilmsMain;
