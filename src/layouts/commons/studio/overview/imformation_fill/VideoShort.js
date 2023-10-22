import React, { useState } from "react";

function VideoShort({
  isShorts,
  handleClickShortsButton,
  handleClickVideoButton,
}) {
  return (
    <div className="ml-7 text-sm text-gray-500 flex justify-between items-center rounded-full">
      <div
        className={`rounded-s-full py-2 px-4  hover:cursor-pointer ${
          isShorts == false
            ? "hover:bg-blue-700 bg-blue-600 text-white shadow-xl"
            : "bg-gray-100 text-gray-800 hover:bg-gray-300"
        } rounded-sm`}
        onClick={handleClickVideoButton}
      >
        Video
      </div>
      <div
        className={`rounded-e-full py-2 px-4  hover:cursor-pointer ${
          isShorts
            ? "hover:bg-blue-700 bg-blue-600 text-white shadow-xl"
            : "bg-gray-100 text-gray-800 hover:bg-gray-300"
        } rounded-sm`}
        onClick={handleClickShortsButton}
      >
        Shorts
      </div>
    </div>
  );
}

export default VideoShort;
