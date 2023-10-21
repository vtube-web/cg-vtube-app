import React, { useState } from "react";
import CommentEditForm from "./CommentEditForm";
import CommentProfile from "./CommentProfile";
import VideoAndTitle from "./VideoAndTitle";
import FeedbackForm from "./FeedbackForm";
import FeedbackChild from "./FeedbackChild";


function Comment({ data }) {
  const [taskMenu, setTaskMenu] = useState(false);
  const [hoverCommentItem, setHoverCommentItem] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const handleClickCancelEditForm = () => {
    setEditForm(false);
    setTaskMenu(false);
  };

  const [feedbackChild, setFeedbackChild] = useState(false);
  const handleClickFeedbackChild = () => {
    if (data?.replyDtoList.length > 0) {
      setFeedbackChild(!feedbackChild);
    }
  };

  const [feedbackForm, setFeebackForm] = useState(false);
  const handleClickFeedbackForm = () => {
    setFeebackForm(!feedbackForm);
  };
  const handleClickCancelFeedbackForm = () => {
    setFeebackForm(false);
  };

  return (
    <div className="border-b-[1px]">
      <div
        className="flex justify-between items-center text-black border-t-[1px] px-4 py-3 hover:bg-gray-100 cursor-default"
        onMouseOver={() => setHoverCommentItem(true)}
        onMouseOut={() => setHoverCommentItem(false)}
      >
        <div className="flex space-x-5 w-4/6">
          <img
            src={`${data?.userResponseDto.avatar}`}
            className="w-12 h-12 rounded-full"
          />
          {editForm ? (
            <CommentEditForm
              handleClickCancelEditForm={handleClickCancelEditForm}
              hoverCommentItem={hoverCommentItem}
              data={data}
            />
          ) : (
            <CommentProfile
              data={data}
              handleClickFeedbackForm={handleClickFeedbackForm}
              handleClickFeedbackChild={handleClickFeedbackChild}
              clickSetEditForm={() => setEditForm(true)}
              feedbackChild={feedbackChild}
            />
          )}
        </div>

        <VideoAndTitle data={data} hoverCommentItem={hoverCommentItem} />
      </div>

      {feedbackForm ? (
        <FeedbackForm
          handleClickCancelFeedbackForm={handleClickCancelFeedbackForm}
          commentId={data?.id}
        />
      ) : (
        <></>
      )}

      {feedbackChild ? (
        data?.replyDtoList?.map((reply, i) => (
          <FeedbackChild
            key={i}
            reply={reply}
            commentId={data?.id}
            videoId={data?.videoDto?.id}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default Comment;
