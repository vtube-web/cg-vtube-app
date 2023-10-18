import React from "react";
import VideoCommon from "./Video";

function VideoItem({ isChecked, onChangeItem, item }) {
  const handleCheckboxItemChange = (e)=>{
     onChangeItem(e.target.checked);
  }
  return (
    <div className="flex border-b-[1px] justify-between hover:bg-gray-100 hover:cursor-pointer">
      <div className="py-2  text-center px-3">
        <input
          type="checkbox"
          onChange={handleCheckboxItemChange}
          checked={isChecked}
        />
      </div>
      <div className="py-2 grow" style={{ width: 220 }}>
        <VideoCommon item={item} />
      </div>
      <div className="py-2 text-center col-1 ">
        {item?.isPrivate ? "private" : "public"}
      </div>
      <div className="py-2 col-1 text-center ">
        {item?.createAt?.slice(0, 10).split("-").join("/")}
      </div>
      <div className="py-2 text-end col-2 ">{item?.views || "0"}</div>
      <div className="py-2 text-end col-2 ">{item?.totalComment}</div>
      <div className="py-2 text-end col-2 pr-3 ">
        {item?.likes && item?.dislikes
          ? (item?.likes / (item?.likes + item?.dislikes)) * 100
          : "" || "--"}
      </div>
    </div>
  );
}

export default VideoItem;
