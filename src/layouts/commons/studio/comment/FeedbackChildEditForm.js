import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setData,
  editFeedbackByUser,
} from "../../../../features/studio/commentChannelSlice";
import { toast } from "react-toastify";

function FeedbackChildEditForm({
  data,
  handleClickCancelEditForm,
  hoverCommentItem,
}) {
  const [value, setValue] = useState(data.content);
  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const dispatch = useDispatch();

  const handleClickSaveEditForm = () => {
    dispatch(editFeedbackByUser({ id: data?.id, content: value })).then(() => {
      toast.success("Edit success");
      dispatch(setData(null));
      handleClickCancelEditForm();
    });
  };

  return (
    <div className="grow">
      <div className="border-2 w-2/3 px-3 py-3">
        <div className="text-xs mb-2">Comment</div>
        <input
          type="text"
          className={`focus:border-none focus:outline-none w-full ${
            hoverCommentItem ? "bg-gray-100" : ""
          }`}
          placeholder="Write a comment..."
          value={value}
          onChange={handleChangeValue}
        />
      </div>
      <div className="flex justify-end w-2/3 mt-2 space-x-8">
        <div
          className="uppercase text-sm text-blue-600 hover:cursor-pointer"
          onClick={handleClickCancelEditForm}
        >
          cancel
        </div>
        <div
          className="uppercase text-sm hover:text-blue-600 hover:cursor-pointer"
          onClick={handleClickSaveEditForm}
        >
          save
        </div>
      </div>
    </div>
  );
}

export default FeedbackChildEditForm;
