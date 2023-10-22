import React, { useState } from 'react';
import { BsBoxArrowUpRight } from "react-icons/bs";
import {Link} from "react-router-dom";

function VideoAndTitle({ data, hoverCommentItem }) {
  const [seeCommentVtube, setSeeCommentVtube] = useState(false);
  return (
    <div className="flex space-x-3 justify-start grow">
      <div className="w-40 h-20">
        <img
          src={`${data?.videoDto?.thumbnail}`}
          className="object-cover object-top  rounded-md border-[1px] shadow-sm w-40 h-20"
        />
      </div>
      <div className="flex justify-between grow">
        <div
          className={`text-sm ${
            hoverCommentItem ? "text-blue-600" : "text-gray-500"
          }`}
        >
          {data?.videoDto?.title}
        </div>
        {hoverCommentItem ? (
          <div className="relative">
            <Link to={`/watching/${data?.videoDto?.id}`}>
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
  );
}

export default VideoAndTitle