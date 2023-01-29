import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLists } from "../../store/slices/listSlice";
import ListModal from "../Modals/listModal";
import Pagination from "../Films/Pagination";
import List from "./List";

function Lists() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const lists = useSelector((state) => state.lists.lists);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(fetchLists())
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const createList = () => {
    {
      setModal(!modal);
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center flex-col bg-[#1f252c]  ">
      <div className=" w-full flex  h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      <div className="w-full">
        <div className="w-full bg-[#1b2228] flex flex-col sm:flex-row justify-center sm:justify-between items-center p-5">
          <div className="flex flex-col sm:flex-row text-lg  text-[#899aa9] "></div>
          <div>
            {user && (
              <div className="nContainer">
                <div className="flex flex-col  justify-center w-[5rem] text-center  border-r-2  border-[#232d38]">
                  <p className=" mb-4 pt-2  font-bold text-2xl text-[#fffffe]">
                    {lists.length}
                  </p>
                  <p className="  h-full font-bold  text-[#fffffe] text-s font-sans opacity-60 hover:text-[#613573] hover:opacity-80">
                    LISTE
                  </p>
                </div>
                <div className="flex flex-col  justify-center w-[5rem] text-center ">
                  <button
                    className="   mb-4 pt-2  font-bold text-2xl text-[#fffffe]  hover:text-[#613573] hover:opacity-80"
                    onClick={createList}
                  >
                    +
                  </button>
                  <p className="  h-full font-bold  text-[#fffffe] text-s font-sans opacity-60 hover:text-[#613573] hover:opacity-80">
                    LISTE EKLE
                  </p>
                  {modal && <ListModal modal={modal} />}
                </div>
              </div>
            )}
          </div>
        </div>
        <p className=" bg-[#1b2228] pl-16 text-xl text-[#63707d] hover:text-[#613573] w-full border-b-2 border-[#445566] hover:border-[#613573]">
          LISTELER
        </p>
      </div>
      <div className="w-full">
        {user ? (
          <div>
            <div>
              {Array.isArray(lists) && lists.length !== 0 ? (
                <div>
                  <Pagination
                    data={lists}
                    RenderComponent={List}
                    title="Lists"
                    pageLimit={5}
                    dataLimit={12}
                  />
                </div>
              ) : (
                <div>No lists</div>
              )}
            </div>
          </div>
        ) : (
          <div>Listerinizi gormek icin giris yapin</div>
        )}
      </div>
    </div>
  );
}

export default Lists;
