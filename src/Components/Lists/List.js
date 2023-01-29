import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../css/listItem.css";

function List(props) {
  const { list_id, list_name, movies } = props.data;
  const fetchUserValue = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <div key={list_id} className="list">
      <div className="container">
        <Link
          className="relative w-[9rem] h-[13rem] sm:w-[11rem]  sm:h-[16rem] xl:w-[13rem] xl:h-[18rem]  hover:text-[#613573] "
          to={`/lists/${list_id}`}
        >
          <div className="">
            {movies.length !== 0 && (
              <div className="posterContainer">
                <img
                  className="relative  w-[13rem] h-[16rem]  border-2 border-[#55697e]  rounded-3xl object-cover"
                  src={
                    movies[2]
                      ? movies[2].posterUrl
                      : "https://cdn.discordapp.com/attachments/1065424417242480710/1065473161883295824/blank.jpg"
                  }
                />
                <img
                  className="relative  w-[13rem] h-[16rem] overflow:hidden  ml-[-6rem] border-2 border-[#55697e]  rounded-3xl object-cover"
                  src={
                    movies[1]
                      ? movies[1].posterUrl
                      : "https://cdn.discordapp.com/attachments/1065424417242480710/1065473161883295824/blank.jpg"
                  }
                />
                <img
                  className="relative w-[13rem] h-[16rem]  ml-[-6rem] border-2 border-[#55697e]  rounded-3xl object-cover"
                  src={
                    movies[0]
                      ? movies[0].posterUrl
                      : "https://cdn.discordapp.com/attachments/1065424417242480710/1065473161883295824/blank.jpg"
                  }
                />
              </div>
            )}
            {movies.length === 0 && (
              <div className="posterContainer">
                <img
                  className="relative w-[13rem] h-[16rem]  border-2 border-[#55697e] rounded-3xl object-cover"
                  src={
                    "https://cdn.discordapp.com/attachments/1065424417242480710/1065473161883295824/blank.jpg"
                  }
                />
                <img
                  className="relative w-[13rem] h-[16rem]  ml-[-6rem] border-2 border-[#55697e]  rounded-3xl object-cover"
                  src={
                    "https://cdn.discordapp.com/attachments/1065424417242480710/1065473161883295824/blank.jpg"
                  }
                />
                <img
                  className="relative w-[13rem] h-[16rem] ml-[-6rem] border-2 border-[#55697e]  rounded-3xl object-cover"
                  src={
                    "https://cdn.discordapp.com/attachments/1065424417242480710/1065473161883295824/blank.jpg"
                  }
                />
              </div>
            )}
          </div>
        </Link>
        <div className=""></div>
      </div>
      <div className="listname">{list_name}</div>
    </div>
  );
}
export default List;
