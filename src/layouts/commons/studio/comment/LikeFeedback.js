import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  likeFeedbacktByUser,
  setData,
} from "../../../../features/studio/commentChannelSlice";
import { toast } from "react-toastify";
import { getStoredUserData } from "../../../../services/accountService";

function LikeFeedback({ commentId, vote }) {
  const [hoverLike, setHoverLike] = useState(false);

  const dispatch = useDispatch();

  const handleClickSaveLike = () => {
    dispatch(likeFeedbacktByUser(commentId)).then((res) => {
      if (res.payload.data) {
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message);
      }
      dispatch(setData(null));
    });
  };
  const [userLike, setUserLike] = useState(false);

  useEffect(() => {
    if (vote != null || vote?.userId == getStoredUserData()?.id) {
      if (vote?.likes) {
        setUserLike(true);
      } else {
        setUserLike(false);
      }
    } else {
      setUserLike(false);
    }
  }, [vote]);
  return (
    <div className="relative" onClick={handleClickSaveLike}>
      <BiLike
        className={` hover:cursor-pointer  ${
          userLike
            ? "text-blue-500 hover:text-blue-700"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onMouseOver={() => setHoverLike(true)}
        onMouseOut={() => setHoverLike(false)}
      />
      {hoverLike ? (
        <div className="absolute top-5 px-2 py-1 text-xs -left-3 bg-gray-500 text-white rounded-lg">
          Like
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default LikeFeedback;
