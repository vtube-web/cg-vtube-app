import React, { useState } from "react";

import { BsBoxArrowUpRight } from "react-icons/bs";
import FeedbackChildProfile from "./FeedbackChildProfile";
import FeedbackForm from "./FeedbackForm";
import FeedbackChildEditForm from "./FeedbackChildEditForm";
import {Link} from "react-router-dom";

function FeedbackChild({ reply, commentId, videoId }) {
  const [seeCommentVtube, setSeeCommentVtube] = useState(false);

  const [hoverCommentItem, setHoverCommentItem] = useState(false);

  const [feedbackForm, setFeebackForm] = useState(false);
  const handleClickCancelFeedbackForm = () => {
    setFeebackForm(false);
  };
  const handleClickFeedbackChildForm = () => {
    setFeebackForm(!feedbackForm);
  };
  const [editForm, setEditForm] = useState(false);
  const handleClickCancelEditForm = () => {
    setEditForm(false);
  };

  return (
    <>
      <div
        className="flex justify-between  text-black  px-4 py-3 hover:bg-gray-100 cursor-default"
        onMouseOver={() => setHoverCommentItem(true)}
        onMouseOut={() => setHoverCommentItem(false)}
      >
        <div className="flex space-x-5 w-4/6 ml-16">
          <img
            src={reply?.userResponseDto?.avatar}
            className="w-12 h-12 rounded-full"
          />
          {editForm ? (
            <FeedbackChildEditForm
              handleClickCancelEditForm={handleClickCancelEditForm}
              hoverCommentItem={hoverCommentItem}
              data={reply}
            />
          ) : (
            <FeedbackChildProfile
              data={reply}
              handleClickFeedbackChildForm={handleClickFeedbackChildForm}
              clickSetEditForm={() => setEditForm(true)}
            />
          )}
        </div>

        <div className="flex space-x-3 justify-end grow">
          {hoverCommentItem ? (
            <div className="relative ">
              <Link to={`/watching/${videoId}`}>
                <BsBoxArrowUpRight
                  className="w-5 text-gray-500 h-5 hover:cursor-pointer hover:text-gray-700"
                  onMouseOver={() => setSeeCommentVtube(true)}
                  onMouseOut={() => setSeeCommentVtube(false)}
                />
              </Link>

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
      {feedbackForm ? (
        <FeedbackForm
          handleClickCancelFeedbackForm={handleClickCancelFeedbackForm}
          commentId={commentId}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default FeedbackChild;
