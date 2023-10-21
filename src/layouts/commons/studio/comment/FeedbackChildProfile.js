import React, { useEffect, useRef, useState } from "react";
import { BiLike, BiDislike, BiPencil } from "react-icons/bi";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getStoredUserData } from "../../../../services/accountService";
import { useDispatch } from "react-redux";
import {
  editCommentByUser,
  getCommentByChannel,
  getEdit,
  setData,
  setEdit,
  deleteFeedbackByUser,
} from "../../../../features/studio/commentChannelSlice";
import { toast } from "react-toastify";
import LikeFeedback from "./LikeFeedback";
import DislikeFeedback from "./DislikeFeedback";
import formatDateAgo from "../../../../format/FormatDateAgo";

function FeedbackChildProfile({
  handleClickFeedbackChildForm,
  clickSetEditForm,
  data,
}) {
  const [taskMenuLabel, setTaskMenuLabel] = useState(false);
  const [taskMenu, setTaskMenu] = useState(false);
  const [hoverLike, setHoverLike] = useState(false);
  const [hoverDislike, setHoverDislike] = useState(false);
  const dispatch = useDispatch();

  const handleClickRemoveFeedback = () => {
    console.log("as");
    dispatch(deleteFeedbackByUser(data?.id)).then(() => {
      toast.success("delete success");
      dispatch(setData(null));
      setTaskMenu(false);
    });
  };
  const refEdit = useRef(null);

  useEffect(() => {
    const handleClickOutsideEdit = (event) => {
      if (refEdit.current && !refEdit.current.contains(event.target)) {
        setTaskMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutsideEdit);
    return () => {
      document.removeEventListener("click", handleClickOutsideEdit);
    };
  }, []);
  return (
    <div className="grow">
      <div className="flex items-center mb-2 space-x-2 text-[13px]">
        <div className="bg-black text-white  px-1 rounded-xl ">
          @{data?.userResponseDto.userName}
        </div>
        <div className="border rounded-full w-2 h-2 bg-gray-500"></div>
        <div className="text-gray-500">{formatDateAgo(data?.createAt)}</div>
      </div>
      <div className="text-[11px] w-4/5 shrink">{data?.content}</div>
      <div className="flex space-x-6 items-center mt-2">
        <div
          className="uppercase text-sm hover:text-blue-600 hover:cursor-pointer"
          onClick={handleClickFeedbackChildForm}
        >
          Feedback
        </div>
        <LikeFeedback commentId={data?.id} vote={data?.userVoteCommentDto} />
        <DislikeFeedback commentId={data?.id} vote={data?.userVoteCommentDto} />
        <div className="relative" ref={refEdit}>
          <PiDotsThreeVerticalBold
            className="hover:cursor-pointer hover:text-gray-700"
            onMouseOver={() => setTaskMenuLabel(true)}
            onMouseOut={() => setTaskMenuLabel(false)}
            onClick={() => setTaskMenu(!taskMenu)}
          />
          {taskMenu ? (
            getStoredUserData()?.id == data?.userResponseDto?.id ? (
              <div className="absolute whitespace-nowrap z-10  bg-white shadow-md border-[1px] -left-7 top-6 py-3 rounded-md">
                <div
                  className="px-4 flex items-center space-x-4  hover:bg-gray-100 hover:cursor-pointer py-2"
                  onClick={clickSetEditForm}
                >
                  <BiPencil className="w-6 h-6 text-gray-400" />
                  <div>Edit</div>
                </div>
                <div
                  className="px-4 flex items-center space-x-4  hover:bg-gray-100 hover:cursor-pointer py-2"
                  onClick={handleClickRemoveFeedback}
                >
                  <RiDeleteBin6Line className="w-6 h-6 text-gray-400" />
                  <div>Remove</div>
                </div>
              </div>
            ) : (
              <div className="absolute z-10 whitespace-nowrap  bg-white shadow-md border-[1px] -left-7 top-6 py-3 rounded-md">
                <div
                  className="px-4 flex items-center space-x-4  hover:bg-gray-100 hover:cursor-pointer py-2"
                  onClick={handleClickRemoveFeedback}
                >
                  <RiDeleteBin6Line className="w-6 h-6 text-gray-400" />
                  <div>Remove</div>
                </div>
              </div>
            )
          ) : (
            <></>
          )}
          {taskMenuLabel ? (
            <div className="absolute whitespace-nowrap text-xs bg-gray-500 text-white px-2 -left-7 top-6 py-1 rounded-md">
              task menu
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedbackChildProfile;
