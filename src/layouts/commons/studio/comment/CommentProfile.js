import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { BiLike, BiDislike, BiPencil } from "react-icons/bi";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";

function CommentProfile({
  data,
  handleClickFeedbackForm,
  handleClickFeedbackChild,
  clickSetEditForm
}) {
      const [hoverLike, setHoverLike] = useState(false);
      const [hoverDislike, setHoverDislike] = useState(false);
        const [taskMenuLabel, setTaskMenuLabel] = useState(false);
        const [taskMenu, setTaskMenu] = useState(false);
  return (
    <div className="grow">
      <div className="flex items-center mb-2 space-x-2 text-[13px]">
        <div className="bg-black text-white  px-1 rounded-xl ">@bone9237</div>
        <div className="border rounded-full w-2 h-2 bg-gray-500"></div>
        <div className="text-gray-500">8 s</div>
      </div>
      <div className="text-[11px] shrink">{data?.content?.content}</div>
      <div className="flex space-x-6 items-center mt-2">
        <div
          className="uppercase text-sm hover:text-blue-600 hover:cursor-pointer"
          onClick={handleClickFeedbackForm}
        >
          Feedback
        </div>
        <div
          className="text-[13px] flex items-center space-x-1 text-gray-500 hover:cursor-pointer"
          onClick={handleClickFeedbackChild}
        >
          <div>1 feedback</div>
          <MdKeyboardArrowDown className="w-5 h-5" />
        </div>
        <div className="relative">
          <BiLike
            className="text-gray-500 hover:cursor-pointer hover:text-gray-700"
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
        <div className="relative">
          <BiDislike
            className="text-gray-500 hover:cursor-pointer hover:text-gray-700"
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
        <div className="relative">
          <PiDotsThreeVerticalBold
            className="hover:cursor-pointer hover:text-gray-700"
            onMouseOver={() => setTaskMenuLabel(true)}
            onMouseOut={() => setTaskMenuLabel(false)}
            onClick={() => setTaskMenu(!taskMenu)}
          />
          {taskMenu ? (
            <div className="absolute whitespace-nowrap  bg-white shadow-md border-[1px] -left-7 top-6 py-3 rounded-md">
              <div
                className="px-4 flex items-center space-x-4  hover:bg-gray-100 hover:cursor-pointer py-2"
                onClick={clickSetEditForm}
              >
                <BiPencil className="w-6 h-6 text-gray-400" />
                <div>Edit</div>
              </div>
              <div className="px-4 flex items-center space-x-4  hover:bg-gray-100 hover:cursor-pointer py-2">
                <RiDeleteBin6Line className="w-6 h-6 text-gray-400" />
                <div>Remove</div>
              </div>
            </div>
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

export default CommentProfile