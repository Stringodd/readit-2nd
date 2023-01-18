import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchList } from "../../store/slices/singleListSlice";
import favoritesAPI from "../../api/favoritesAPI";
import { fetchFavorites } from "../../store/slices/favoritesSlice";
import { fetchWatchlist } from "../../store/slices/watchlistSlice";
import ListAPI from "../../api/ListAPI";
import Movie from "../Films/Movie";
import Pagination from "../Films/Pagination";

function ListInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const current = useSelector((state) => state.list.list);
  const fetchUserValue = useSelector((state) => state.user.user);
  var favorites = useSelector((state) => state.favorites.favorites);
  var watchlist = useSelector((state) => state.watchlist.watchlist);
  const listid = id.toString();
  console.log(current.listname);
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

  async function deleteList(listname) {
    const res = await ListAPI.deleteList(listname, fetchUserValue.uid);

    if (res.error) {
      alert(`error: ${res.error}`);
      return false;
    }

    window.location.href = "/lists";
    return true;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center bg-[#1f252c]  ">
      <div className=" w-full h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      <div className=" flex w-4/5 items-center sm:items-center flex-col sm:flex-row   h-full">
        {current && (
          <div
            className=" w-4/5  py-12 h-full  flex  flex-col sm:flex-row
        "
          >
            {fetchUserValue && (
              <button onClick={() => deleteList(current.listname)}>
                Listeyi Sil
              </button>
            )}

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
                    <Pagination
                      data={current.movies}
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
          </div>
        )}
      </div>
    </div>
  );
}

export default ListInfo;
