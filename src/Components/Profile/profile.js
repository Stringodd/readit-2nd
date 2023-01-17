import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../../store/slices/favoritesSlice";
import { fetchWatchlist } from "../../store/slices/watchlistSlice";
import favoritesAPI from "../../api/favoritesAPI";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Profile() {
  const data = useSelector((state) => state.mert.data);
  const fetchUserValue = useSelector((state) => state.user.user);
  const favorites = useSelector((state) => state.favorites.favorites);
  const watchlist = useSelector((state) => state.watchlist.watchlist);
  const dispatch = useDispatch();
  console.log(useSelector((state) => state.favorites.favorites));
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

  return (
    <div className="w-full h-full flex justify-center items-center flex-col bg-[#1f252c]  ">
      <div className=" w-full flex  h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      <div className="w-4/5 h-full  flex flex-col sm:flex-row justify-center items-center text-center  pt-16 pb-8 bg-[#1f252c]  ">
        <p className=" w-1/4   h-full font-sans text-2xl text-[#fffffe] hover:text-[#613573] pt-3">
          Hoşgeldin {fetchUserValue.username}
        </p>

        <div className="flex mt-4 sm:mt-0">
          <div className="flex flex-col sm:ml-32 justify-center w-32 text-center border-r-2 border-[#232d38]">
            <p className=" mb-4 pt-2  font-bold text-2xl text-[#fffffe]">
              {favorites.length}
            </p>
            <p className="  h-full font-bold  text-[#fffffe] text-s font-sans opacity-60 hover:text-[#613573] hover:opacity-80">
              FAVORİLER
            </p>
          </div>
          <div className="flex flex-col  justify-center w-32 text-center ">
            <p className="  mb-4 pt-2  font-bold text-2xl text-[#fffffe]">
              {watchlist.length}
            </p>
            <p className="  h-full font-bold  text-[#fffffe] text-s font-sans opacity-60 hover:text-[#613573] hover:opacity-80">
              İZLEME LİSTENDE
            </p>
          </div>
        </div>
        <div className="w-1/3 h-36 flex justify-center mt-6 sm:mt-0 items-center text-center ">
          <img
            className=" h-48  object-cover   rounded-2xl "
            src={require("../../images/LOTR.jpg")}
          />
        </div>
      </div>
      <div className=" w-4/5 h-[72px] flex  gap-5 justify-start items-center pl-6  text-sm sm:text-base   my-12 bg-[#1f252c] border-2 border-[#232d38] ">
        <Link to="/profile">
          <button className="font-bold  text-[#fffffe]  font-sans opacity-60 hover:text-[#613573] hover:opacity-100 ">
            {" "}
            PROFİL
          </button>
        </Link>
        <Link to="/favoritemovies">
          <button className="font-bold  text-[#fffffe]  font-sans opacity-60 hover:text-[#613573] hover:opacity-100 ">
            {" "}
            FAVORİLER
          </button>
        </Link>
        <Link to="/lists">
          <button className="font-bold  text-[#fffffe]  font-sans opacity-60 hover:text-[#613573] hover:opacity-100 ">
            {" "}
            LISTELER
          </button>
        </Link>
        <Link to="/watchlist">
          <button className="font-bold  text-[#fffffe]  font-sans opacity-60 hover:text-[#613573] hover:opacity-100 ">
            {" "}
            İZLEME LİSTEMDEKİLER
          </button>
        </Link>
      </div>
      <div className="flex flex-col w-4/5 text-[#63707d]  mt-11 border-b-2 hover:text-[#613573] hover:border-[#613573] border-[#445566]">
        <p>BU HAFTA BEĞENEBİLECEKLERİN</p>
      </div>
      <div className="w-4/5 h-full mt-16  mb-16  grid grid-cols-2 sm:grid-cols-5 justify-center items-center "></div>
    </div>
  );
}

export default Profile;
