import React, { useEffect, useState } from "react";
import { BiDislike } from "react-icons/bi";
import {
  dislikeCommentByUser,
  setData,
} from "../../../../features/studio/commentChannelSlice";
import { toast } from "react-toastify";
import { getStoredUserData } from "../../../../services/accountService";
import { useDispatch } from "react-redux";

function DislikeComment({ commentId, vote }) {
  const [hoverDislike, setHoverDislike] = useState(false);
  const dispatch = useDispatch();
  const handleClickSaveDisLike = () => {
    dispatch(dislikeCommentByUser(commentId)).then((res) => {
      console.log(res.payload);
      if (res.payload.data) {
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message);
      }
      dispatch(setData(null));
    });
  };

  const [userDisLike, setUserDisike] = useState(false);

  useEffect(() => {
    if (vote != null || vote?.userId == getStoredUserData()?.id) {
      if (vote?.dislikes) {
        setUserDisike(true);
      } else {
        setUserDisike(false);
      }
    } else {
      setUserDisike(false);
    }
  }, [vote]);
  return (
    <div className="relative" onClick={handleClickSaveDisLike}>
      <BiDislike
        className={` hover:cursor-pointer  ${
          userDisLike
            ? "text-blue-500 hover:text-blue-700"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onMouseOver={() => setHoverDislike(true)}
        onMouseOut={() => setHoverDislike(false)}
      />
      {hoverDislike ? (
        <div className="absolute top-5 px-2 py-1 text-xs -left-5 bg-gray-500 text-white rounded-lg">
          Dislike
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DislikeComment;
