import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ListAPI from "../../api/ListAPI";
import { fetchLists } from "../../store/slices/listSlice";

function Lists() {
  const data = useSelector((state) => state.mert.data);
  const fetchUserValue = useSelector((state) => state.user.user);
  const favorite = useSelector((state) => state.favorite.favoriteMovies);
  const watch = useSelector((state) => state.forwatch.watchMovies);
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.user.user.uid);
  const lists = useSelector((state) => state.lists.lists);
  const listNames = [];
  console.log(lists);

  useEffect(() => {
    dispatch(fetchLists())
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center flex-col bg-[#1f252c]  ">
      <div className=" w-full flex  h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      <div className="w-4/5 h-full  flex flex-row sm:flex-row justify-center items-center text-center  pt-10 pb-10 bg-[#1f252c]  ">
        <div className="flex flex-col w-4/5 text-[#63707d] justify-center text-2xl mt-11 border-b-2 hover:text-[#613573] hover:border-[#613573] border-[#445566]">
          <p>LISTELER</p>
        </div>
        <div className="flex flex-col sm:ml-32 justify-center w-32 text-center  border-r-2  border-[#232d38]">
          <p className=" mb-4 pt-2  font-bold text-2xl text-[#fffffe]">
            {favorite.length}
          </p>
          <p className="  h-full font-bold  text-[#fffffe] text-s font-sans opacity-60 hover:text-[#613573] hover:opacity-80">
            LISTE
          </p>
        </div>
        <div className="flex flex-col  justify-center w-32 text-center ">
          <button className="  h-full font-bold text-5xl text-[#fffffe] text-s font-sans opacity-60 hover:text-[#613573] hover:opacity-80">
            +
          </button>
        </div>
      </div>
      <div>
        {Array.isArray(lists) && lists.length !== 0 ? (
          <div className="w-4/5 h-full mt-16  mb-16  grid grid-cols-2 sm:grid-cols-5 justify-center items-center ">
            {lists.map((list) => (
              <div
                key={list.list_id}
                className="h-[16rem] xl:h-[18rem]  rounded-3xl mx-7 my-2 flex  flex-row justify-center group  "
              >
                <Link
                  className="absolute w-[9rem] h-[13rem] sm:w-[11rem]  sm:h-[16rem] xl:w-[13rem] xl:h-[18rem]  hover:text-[#613573]"
                  to={`/lists/${list.list_id}`}
                >
                  <div className="">
                    <img
                      className=" absolute w-[9rem] h-[13rem] sm:w-[11rem]  sm:h-[16rem] xl:w-[13rem] xl:h-[18rem] border-2 border-[#1b2228] hover:border-[#613573] rounded-3xl object-cover"
                      src={
                        list.movies[0].posterUrl
                          ? list.movies[0].posterUrl
                          : "../images/heart.png"
                      }
                    />
                    <div>{list.list_name}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div>No lists</div>
        )}
      </div>
    </div>
  );
}

export default Lists;
