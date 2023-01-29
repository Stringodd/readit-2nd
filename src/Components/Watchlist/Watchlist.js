import React, { useState, useEffect } from "react";
import Movie from "../Films/Movie";
import Pagination from "../Films/Pagination";
import { fetchWatchlist, watchlist } from "../../store/slices/watchlistSlice";
import { useSelector, useDispatch } from "react-redux";

function Watchlist() {
  const watchList = useSelector((state) => state.watchlist.watchlist);
  const user = useSelector((state) => state.user.user);
  const [movies, setMovies] = useState(watchList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWatchlist())
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setMovies(watchList);
  }, [watchList]);

  const FilmName = (event) => {
    const title = event.toLowerCase();
    setMovies(
      watchList.filter((item) => item.title.toLowerCase().includes(title))
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col bg-[#1f252c]  ">
      <div className=" w-full flex  h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      <div className="w-full">
        <div className="w-full h-full bg-[#1b2228] flex flex-col sm:flex-row justify-center sm:justify-between items-center p-10">
          <div className="  flex flex-col sm:flex-row text-lg  text-[#899aa9] ">
            <div className="border-2 sm:mt-0 mt-4 border-[#232a31] flex text-center  sm:ml-4"></div>
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
          IZLEME LISTESI{" "}
        </p>
      </div>
      {user ? (
        <div>
          {Array.isArray(movies) && movies.length !== 0 ? (
            <div>
              <Pagination
                data={movies}
                RenderComponent={Movie}
                title="Movies"
                pageLimit={5}
                dataLimit={18}
              />
            </div>
          ) : (
            <div>No movies</div>
          )}
        </div>
      ) : (
        <div>Listenizi gormek icin giris yapin</div>
      )}
    </div>
  );
}

export default Watchlist;
