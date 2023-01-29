import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListAPI from "../../api/ListAPI";
import "../../css/movietolistmodal.css";

import { fetchMovies } from "../../store/slices/movieSlice";
import Movie from "../Films/Movie";
function AddMovieToListModal(props) {
  const allMovies = useSelector((state) => state.movies.movies);
  const [movies, setMovies] = useState(allMovies);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  // usestate kısmı
  const [showModal, setShowModal] = useState(props.modal);
  const [title, setTitle] = useState("");
  const [listName, setListName] = useState(props.listname);
  const [alert, setalert] = useState("invisible");
  const lists = useSelector((state) => state.lists.lists);

  useEffect(() => {
    dispatch(fetchMovies())
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function addToList(title) {
    console.log(title);
    ListAPI.addMovie(listName, user.uid, title);
    setShowModal(false);
  }

  const FilmName = (event) => {
    const title = event.toLowerCase();
    setMovies(
      allMovies.filter((item) => item.title.toLowerCase().includes(title))
    );
  };

  return (
    <div>
      <>
        {showModal ? (
          <>
            <div className="   w-full justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[160] outline-none focus:outline-none">
              <div className="relative w-auto sm:my-6 sm:mx-auto max-w-[30rem]  ">
                {/*content*/}
                <div className="border-0 rounded shadow-lg relative flex flex-col w-full bg-[#445566] outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <p className="flex flex-row pl-2 sm:text-lg font-sans  text-[#899aa9] ">
                      FİLM ARA
                    </p>
                    <input
                      onChange={(event) => FilmName(event.target.value)}
                      className="w-[250px] sm:ml-5 h-[40px] ml-2 bg-[#2c3440] rounded-lg focus:bg-slate-100 pl-2"
                    ></input>
                  </div>
                  {/*body*/}
                  <div className="min-w-[32rem]  min-h-[36rem] max-h-[36rem] relative p-6 flex flex-col items-center justify-center ">
                    <div className="flex flex-col w-[28rem] h-[36rem]mx-6 mb-4 overflow-y-auto">
                      <div>
                        <div className="mbCont ">
                          {Array.isArray(movies) && (
                            <div>
                              {movies.map((d) => (
                                <button
                                  className="w-[26rem] mt-3 sm:text-xl text-[#cfe6ff] font-normal border border-solid border-slate-200 rounded"
                                  onClick={() => addToList(d.title)}
                                >
                                  {d.title}&nbsp;&nbsp;{" "}
                                  <p className="sm:text-l text-[#77818f] ">
                                    {d.year}
                                  </p>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-[#e00c0c] ml-6 text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      KAPAT
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    </div>
  );
}

export default AddMovieToListModal;
