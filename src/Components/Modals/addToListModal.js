import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isLogin } from "../../store/slices/userSlice";
import AuthAPI from "../../api/AuthAPI";
import ListAPI from "../../api/ListAPI";
import { fetchLists } from "../../store/slices/listSlice";
function AddToListModal(props) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  // usestate kısmı
  const [showModal, setShowModal] = useState(props.modal);
  const [title, setTitle] = useState(props.title);
  const [listName, setListName] = useState("");
  const [alert, setalert] = useState("invisible");
  const lists = useSelector((state) => state.lists.lists);

  useEffect(() => {
    dispatch(fetchLists())
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function addToList(listName) {
    ListAPI.addMovie(listName, user.uid, title);
    setShowModal(false);
  }

  return (
    <div>
      <>
        {/* <button
          className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Open regular modal
        </button> */}
        {showModal ? (
          <>
            <div className="   w-full justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[160] outline-none focus:outline-none">
              <div className="relative w-auto sm:my-6 sm:mx-auto max-w-[30rem]  ">
                {/*content*/}
                <div className="border-0 rounded shadow-lg relative flex flex-col w-full bg-[#445566] outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl text-[#768798] font-semibold">
                      LISTE SEC
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex flex-col items-center justify-center">
                    <div className="flex flex-col mx-6 mb-4">
                      <div>
                        {Array.isArray(lists) && (
                          <div>
                            {lists.map((list) => (
                              <div key={list.list_id}>
                                <button
                                  onClick={() => addToList(list.list_name)}
                                >
                                  {list.list_name}
                                </button>
                                <div>{list.movies.length} movies in list.</div>
                              </div>
                            ))}
                          </div>
                        )}
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

export default AddToListModal;
