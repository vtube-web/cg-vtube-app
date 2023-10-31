import axios from "axios";
import React, { useEffect, useState } from "react";
import { getStoredUserData } from "../../../../services/accountService";
import { useNavigate, useParams } from "react-router";
import { VTUBE_API } from "../../../../app/constants";

function AnalytiscChannel() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { channelId } = useParams();
  useEffect(() => {
    if (data == null) {
      axios
        .get(`${VTUBE_API}/videos/statistical/${getStoredUserData()?.id}`)
        .then((res) => {
          if (parseInt(res?.data?.status) == 200) {
            setData(res?.data?.data);
          }
        });
    }
  }, []);

  const handleNavigateAnalytics = () => {
    navigate(`/channel/${channelId}/analytical`);
  };

  return (
    <div className="w-[400px] h-[29em] bg-white border-[1px] border-gray-300 rounded-md p-6">
      <div className="pb-6 border-b-[1px]">
        <div className="text-xl font-bold">Channel analytics</div>
        <div className="pt-2 text-sm text-gray-700">
          Number of current subscribers
        </div>
        <div className="text-4xl pb-4">{data?.subscribe}</div>
      </div>
      <div className="pb-6 border-b-[1px]">
        <div className="text-md pt-3 font-bold">Summary</div>
        <div className="flex justify-between pt-2 items-center text-md">
          <div className="col-8">Number of views</div>
          <div className="col-3 text-end">{data?.views}</div>
          <div className="col-1 text-center text-xs">—</div>
        </div>
        <div className="flex justify-between pt-2 items-center text-md">
          <div className="col-8">Number of Likes</div>
          <div className="col-3 text-end">{data?.likes}</div>
          <div className="col-1 text-center text-xs">—</div>
        </div>
        <div className="flex justify-between pt-2 items-center text-md">
          <div className="col-8">Number of Dislikes</div>
          <div className="col-3 text-end">{data?.dislikes}</div>
          <div className="col-1 text-center text-xs">—</div>
        </div>
      </div>
      <div className="">
        <div className="h-8"></div>
        <span
          className="text-md font-bold p-2 text-blue-700 hover:cursor-pointer  rounded-sm active:bg-blue-100 active:transition-all active:ease-in active:duration-500 active:animate-spin select-none  active:select-all"
          onClick={handleNavigateAnalytics}
        >
          Go to analytics
        </span>
      </div>
    </div>
  );
}

export default AnalytiscChannel;
