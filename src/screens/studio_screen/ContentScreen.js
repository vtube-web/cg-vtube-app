import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MenuItemChill from "../../components/studio/common/menu_item_sub/MenuItemSub";
import VideoSubContent from "../../layouts/commons/studio/content/VideoSubContent";
import DirectSubContent from "../../layouts/commons/studio/content/DirectSubContent";
import PlaylistSubContent from "../../layouts/commons/studio/content/PlaylistSubContent";
import EditSubContent from "../../layouts/commons/studio/content/EditSubContent";

function ContentScreen() {
  const { channelId, subParam } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (subParam == "*") {
      navigate(`/channel/${channelId}/content/upload`);
    }
  }, [subParam]);
  const pathAcountDefault = `/channel/${channelId}/content`;
  const menus = [
    {
      to: `${pathAcountDefault}/upload`,
      title: "Video",
    },
    {
      to: `${pathAcountDefault}/direct`,
      title: "Direct",
    },
    {
      to: `${pathAcountDefault}/playlist`,
      title: "Playlist",
    },
  ];
  return (
    <div className="text-black w-full">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {subParam == "edit" ? <EditSubContent /> : <></>}

      <div className="pl-6 pt-4 text-2xl font-bold flex">
        Content channel page
      </div>

      <div className="flex flex-nowrap space-x-3 py-4 bg-white rounded-lg mt-2">
        <div className="w-full">
          <div className="flex px-4 space-x-8 border-b-[1px] w-full">
            {menus?.map((menu, i) => (
              <MenuItemChill menu={menu} key={i}/>
            ))}
          </div>
          {subParam == "upload" ? <VideoSubContent /> : <></>}
          {subParam == "direct" ? <DirectSubContent /> : <></>}
          {subParam == "playlist" ? <PlaylistSubContent /> : <></>}
        </div>
      </div>

      
    </div>

  );
}

export default ContentScreen;
