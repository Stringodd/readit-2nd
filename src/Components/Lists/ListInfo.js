import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchList } from "../../store/slices/singleListSlice";
import ListAPI from "../../api/ListAPI";
import Movie from "../Films/Movie";
import Pagination from "../Films/Pagination";
import AddMovieToListModal from "../Modals/addMovietoListModal";

function ListInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const current = useSelector((state) => state.list.list);
  const fetchUserValue = useSelector((state) => state.user.user);
  const [modal, setModal] = useState(false);
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

  async function deleteList(listname) {
    const res = await ListAPI.deleteList(listname, fetchUserValue.uid);

    if (res.error) {
      alert(`error: ${res.error}`);
      return false;
    }

    window.location.href = "/lists";
    return true;
  }

  const addMovietoList = () => {
    setModal(!modal);
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col bg-[#1f252c]  ">
      <div className=" w-full flex  h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      {current && (
        <div className="w-full">
          <div>
            <div className="w-full  bg-[#1b2228] flex flex-col sm:flex-row justify-center sm:justify-between items-center p-10">
              <div className="  flex flex-col sm:flex-row text-lg  text-[#899aa9] ">
                <div className="border-2 sm:mt-0 mt-4 border-[#232a31] flex text-center  sm:ml-4"></div>
              </div>

              <div className=" flex  items-center sm:mt-0 mt-4 ">
                {fetchUserValue && (
                  <div>
                    <button
                      className=" p-2 bg-[#77818f] rounded-2xl text-xl"
                      onClick={() => deleteList(current.listname)}
                    >
                      Listeyi Sil
                    </button>
                    <button
                      className=" p-2 bg-[#77818f] rounded-2xl text-xl"
                      onClick={addMovietoList}
                    >
                      Film Ekle
                    </button>
                    {modal && (
                      <AddMovieToListModal
                        modal={modal}
                        listname={current.listname}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <p className=" bg-[#1b2228] pl-16 text-xl text-[#63707d]  w-full border-b-2 border-[#445566] ">
              {current.listname.toUpperCase()}
            </p>
            <p className="  pl-16 sm:text-xl text-[#77818f] font-normal">
              Created by {fetchUserValue.username}
            </p>
          </div>

          <div>
            {Array.isArray(current.movies) && current.movies.length !== 0 ? (
              <div>
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
      )}
    </div>
  );
}

export default ListInfo;
