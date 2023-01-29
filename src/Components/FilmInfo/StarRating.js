import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import RatingsAPI from "../../api/RatingsAPI";
import "../../css/star.css";
import { fetchUserRating } from "../../store/slices/userRatingSlice";

const StarRating = (props) => {
  const title = props.title;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userRating = useSelector((state) => state.userRating.userRating);
  const [rating, setRating] = useState(userRating);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    dispatch(fetchUserRating(title))
      .unwrap()
      .then((result) => setRating(result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const rateMovie = (index) => {
    if ((rating !== "" && rating != index) || rating === "") {
      RatingsAPI.setRating(title, index, user.uid);
      setRating(index);
      console.log("rated");
    } else if (rating !== "" && rating == index) {
      setRating(0);
      RatingsAPI.removeRating(title, user.uid);
      console.log("removed rating");
    }
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "stars on " : "stars off"}
            onClick={() => rateMovie(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
export default StarRating;
