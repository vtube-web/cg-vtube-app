import React, { useState } from "react";
import { GoPencil } from "react-icons/go";
import { CiYoutube } from "react-icons/ci";
import FormatDateUpdate from "../../../../../format/FomatDateUpdate";
import { useNavigate, useParams } from "react-router-dom";

function Videos({ data, onClickLink }) {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const [hoverVideo, setHoverVideo] = useState(false);
  const [mouseDetail, setMouseDetail] = useState(false);
  const [mouseWatchVideo, setMouseWatchVideo] = useState(false);

  const handleNextPage = () => {
    onClickLink();
    navigate(`/channel/${channelId}/content/upload`);
  };
  const handleNextPageEdit = (e) => {
    e.stopPropagation();
    navigate(`/channel/${channelId}/content/edit/${data?.id}`);
  };
  const handleNextPageWatching = (e) => {
    e.stopPropagation();
    navigate(`/watching/${data?.id}`);
  };
  return (
    <div
      className="border-b-[1px] py-2 hover:cursor-pointer hover:bg-gray-100"
      onMouseOver={() => {
        setHoverVideo(true);
      }}
      onMouseOut={() => {
        setHoverVideo(false);
      }}
      onClick={handleNextPage}
    >
      <div className="px-7 flex space-x-4">
        <div className="relative opacity-60 flex-none">
          <img
            className="w-32 h-16 rounded-sm object-cover object-top"
            src={`${data?.thumbnail}`}
          />
          <div className="absolute right-1 top-11 bg-black px-1 rounded-sm">
            {/* <span className="text-white">0:19</span> */}
          </div>
        </div>
        <div className="pt-2 text-gray-600 min-w-0">
          <div className="truncate">
            Video ngắm cảnh hoàng hôn asd asd asdsa
          </div>
          {hoverVideo ? (
            <div className="flex mt-3 text-gray-400 space-x-5">
              <div
                className="relative"
                onMouseOver={() => setMouseDetail(true)}
                onMouseOut={() => setMouseDetail(false)}
              >
                <GoPencil
                  className="w-5 h-5 hover:text-gray-600"
                  onClick={handleNextPageEdit}
                />
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
                <CiYoutube
                  className="w-5 h-5 hover:text-gray-600"
                  onClick={handleNextPageWatching}
                />
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
            <div className="mt-1 text-gray-400">#mattroi</div>
          )}
        </div>
        <div className="pt-2 text-gray-600 flex-auto text-center min-w-0 lg:hidden xl:block truncate">
          <div className="">{FormatDateUpdate(data?.createAt)}</div>
          <div className="mt-1 text-gray-400">Date upload</div>
        </div>
      </div>
    </div>
  );
}

export default Videos;
