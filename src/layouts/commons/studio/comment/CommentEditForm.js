import React from 'react'

function CommentEditForm({ handleClickCancelEditForm, hoverCommentItem }) {
  const handleClickSaveEditForm = () => {};

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

export default CommentEditForm