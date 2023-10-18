import React, { useState } from 'react';
import { CiYoutube } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { Link, useParams } from 'react-router-dom';

function Video({item}) {
    const [hoverVideo, setHoverVideo] = useState(false);
    const [mouseDetail, setMouseDetail] = useState(false);
    const [mouseWatchVideo, setMouseWatchVideo] = useState(false);
    const { channelId } = useParams();
    const urlChennel = `${window.location.origin}/channel/${channelId}/content/edit`;
    const urlWatching = `${window.location.origin}/watching`;
  return (
    <div
      className="grow"
      onMouseOver={() => {
        setHoverVideo(true);
      }}
      onMouseOut={() => {
        setHoverVideo(false);
      }}
    >
      <div className=" flex space-x-4">
        <div className="relative  flex-none">
          {/* <img className="w-32 h-16 rounded-sm" src={`${item.thumbnail}`} /> */}
          <video className="w-32 h-16 rounded-sm" src={item?.videoUrl} />
          <div className="absolute right-1 top-9 bg-black px-1 rounded-sm">
            {/* <span className="text-white text-sm">0:19</span> */}
          </div>
        </div>
        <div className="pt-2 text-gray-600 min-w-0">
          <div className="truncate">{item.title}</div>
          {hoverVideo ? (
            <div className="flex mt-2 text-gray-400 space-x-5">
              <div
                className="relative"
                onMouseOver={() => setMouseDetail(true)}
                onMouseOut={() => setMouseDetail(false)}
              >
                <Link to={`${urlChennel}/${item?.id}`}>
                  <GoPencil className="w-5 h-5 hover:text-gray-600" />
                </Link>
                {mouseDetail == false ? (
                  <></>
                ) : (
                  <div className=" absolute top-12 whitespace-nowrap left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#7D7C7C] text-white px-2 py-1 text-[10px]">
                    Detail
                  </div>
                )}
              </div>
              <div
                className="relative"
                onMouseOver={() => setMouseWatchVideo(true)}
                onMouseOut={() => setMouseWatchVideo(false)}
              >
                <Link to={`${urlWatching}/${item?.id}`}>
                  <CiYoutube className="w-5 h-5 hover:text-gray-600" />
                </Link>
                {mouseWatchVideo == false ? (
                  <></>
                ) : (
                  <div className=" absolute top-12 whitespace-nowrap left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#7D7C7C] text-white px-2 py-1 text-[10px]">
                    Watch on youtube
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-1 text-gray-400 truncate ">
              {item?.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Video