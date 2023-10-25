import React, { useState } from "react";
import { getStoredUserData } from "../../../../services/accountService";
import { useDispatch } from "react-redux";
import { addFeedbackByUser, setData } from "../../../../features/studio/commentChannelSlice";
import { toast } from "react-toastify";

function FeedbackForm({ handleClickCancelFeedbackForm, commentId }) {
  const [hoverCommentItem, setHoverCommentItem] = useState(false);

  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };
  const handleClickSaveFeedbackForm = () => {
    dispatch(
      addFeedbackByUser({
        commentId: commentId,
        content: value,
        userId: "",
      })
    ).then(()=>{
      toast.success("Feedback success");
      dispatch(setData(null));
      handleClickCancelFeedbackForm();
    });
  };
  return (
    <div
      className="flex justify-between  text-black  px-4 py-3 hover:bg-gray-100 cursor-default"
      onMouseOver={() => setHoverCommentItem(true)}
      onMouseOut={() => setHoverCommentItem(false)}
    >
      <div className="flex space-x-5 w-4/6 ml-16">
        <img
          src={getStoredUserData()?.avatar}
          className="w-12 h-12 rounded-full"
        />
        <div className="grow">
          <div className="border-2 w-4/5 px-3 py-3 rounded-md">
            <div className="text-xs mb-2">Feedback</div>
            <input
              type="text"
              className={`focus:border-none focus:outline-none w-full ${
                hoverCommentItem ? "bg-gray-100" : ""
              }`}
              placeholder="Feedback..."
              value={value}
              onChange={handleChangeValue}
            />
          </div>
          <div className="flex justify-end w-4/5 mt-2 space-x-8">
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
  );
}

export default FeedbackForm;
