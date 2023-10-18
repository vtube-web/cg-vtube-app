import React, { useState } from "react";
import { BiLike, BiDislike, BiPencil } from "react-icons/bi";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsBoxArrowUpRight } from "react-icons/bs";
import CommentEditForm from "./CommentEditForm";
import CommentProfile from "./CommentProfile";
import VideoAndTitle from "./VideoAndTitle";

function Comment({ data }) {
  const [taskMenuLabel, setTaskMenuLabel] = useState(false);
  const [taskMenu, setTaskMenu] = useState(false);

  const [hoverCommentItem, setHoverCommentItem] = useState(false);
  const [seeCommentVtube, setSeeCommentVtube] = useState(false);

  const [hoverLike, setHoverLike] = useState(false);
  const [hoverDislike, setHoverDislike] = useState(false);

  const [editForm, setEditForm] = useState(false);
  const handleClickCancelEditForm = () => {
    setEditForm(false);
    setTaskMenu(false);
  };

  const [feedbackChild, setFeedbackChild] = useState(false);
  const handleClickFeedbackChild = () => {
    setFeedbackChild(!feedbackChild);
  };

  const [feedbackForm, setFeebackForm] = useState(false);
  const handleClickFeedbackForm = () => {
    setFeebackForm(!feedbackForm);
  };
  const handleClickCancelFeedbackForm = () => {
    setFeebackForm(false);
  };
  const handleClickSaveFeedbackForm = () => {};
  return (
    <div className="border-b-[1px]">
      <div
        className="flex justify-between items-center text-black border-t-[1px] px-4 py-3 hover:bg-gray-100 cursor-default"
        onMouseOver={() => setHoverCommentItem(true)}
        onMouseOut={() => setHoverCommentItem(false)}
      >
        <div className="flex space-x-5 w-4/6">
          <img
            src="https://icdn.dantri.com.vn/thumb_w/640/2019/01/20/2-1547917870331.jpg"
            className="w-12 h-12 rounded-full"
          />
          {editForm ? (
            <CommentEditForm
              handleClickCancelEditForm={handleClickCancelEditForm}
              hoverCommentItem={hoverCommentItem}
            />
          ) : (
            <CommentProfile
              data={data}
              handleClickFeedbackForm={handleClickFeedbackForm}
              handleClickFeedbackChild={handleClickFeedbackChild}
              clickSetEditForm={() => setEditForm(true)}
            />
          )}
        </div>

      <VideoAndTitle data={data} hoverCommentItem={hoverCommentItem}/>
      </div>

      {feedbackForm ? (
        <div
          className="flex justify-between  text-black  px-4 py-3 hover:bg-gray-100 cursor-default"
          onMouseOver={() => setHoverCommentItem(true)}
          onMouseOut={() => setHoverCommentItem(false)}
        >
          <div className="flex space-x-5 w-4/6 ml-16">
            <img
              src="https://icdn.dantri.com.vn/thumb_w/640/2019/01/20/2-1547917870331.jpg"
              className="w-12 h-12 rounded-full"
            />
            <div className="grow">
              <div className="border-2 w-2/3 px-3 py-3 rounded-md">
                <div className="text-xs mb-2">Feedback</div>
                <input
                  type="text"
                  className={`focus:border-none focus:outline-none w-full ${
                    hoverCommentItem ? "bg-gray-100" : ""
                  }`}
                  placeholder="Feedback..."
                />
              </div>
              <div className="flex justify-end w-2/3 mt-2 space-x-8">
                <div
                  className="uppercase text-sm text-blue-600 hover:cursor-pointer"
                  onClick={handleClickCancelFeedbackForm}
                >
                  cancel
                </div>
                <div
                  className="uppercase text-sm hover:text-blue-600 hover:cursor-pointer"
                  onClick={handleClickSaveFeedbackForm}
                >
                  save
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {feedbackChild ? (
        <div
          className="flex justify-between  text-black  px-4 py-3 hover:bg-gray-100 cursor-default"
          onMouseOver={() => setHoverCommentItem(true)}
          onMouseOut={() => setHoverCommentItem(false)}
        >
          <div className="flex space-x-5 w-4/6 ml-16">
            <img
              src="https://icdn.dantri.com.vn/thumb_w/640/2019/01/20/2-1547917870331.jpg"
              className="w-12 h-12 rounded-full"
            />
            <div className="grow">
              <div className="flex items-center mb-2 space-x-2 text-[13px]">
                <div className="bg-black text-white  px-1 rounded-xl ">
                  @bone9237
                </div>
                <div className="border rounded-full w-2 h-2 bg-gray-500"></div>
                <div className="text-gray-500">8 s</div>
              </div>
              <div className="text-[11px] shrink">
                aasdasd as dasd aasdasd as dasdaasdasd as dasdaasdasd as
                dasdaasdasd as dasdaasdasd as dasdaasdasd as dasdaasdasd as
                dasdaasdasd as dasdaasdasd as dasdaasdasd as dasdaasdasd as
                dasdaasdasd as dasdaasdasd as dasd
              </div>
              <div className="flex space-x-6 items-center mt-2">
                <div className="uppercase text-sm">Feedback</div>

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
                      <div className="px-4 flex items-center space-x-4  hover:bg-gray-100 hover:cursor-pointer py-2">
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
          </div>

          <div className="flex space-x-3 justify-end grow">
            {hoverCommentItem ? (
              <div className="relative ">
                <BsBoxArrowUpRight
                  className="w-5 text-gray-500 h-5 hover:cursor-pointer hover:text-gray-700"
                  onMouseOver={() => setSeeCommentVtube(true)}
                  onMouseOut={() => setSeeCommentVtube(false)}
                />
                {seeCommentVtube ? (
                  <div className="absolute whitespace-nowrap text-xs bg-gray-600 top-[101px] text-white px-2 py-1 rounded-lg -left-[105px]">
                    See comments on vtube
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Comment;
