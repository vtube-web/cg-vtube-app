import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsModalSearch,
  getIsModalSearch,
} from "../../../../../features/studio/modalSlice";
import Videos from "./Videos";
import {
  findChannelVideo,
  getVideoList,
} from "../../../../../features/studio/videoContentSlice";

function Search() {
  const [search, setSearch] = useState("");
  const [remove, setRemove] = useState(false);
  const statusTheme = useSelector(getIsModalSearch);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const dataList = useSelector(getVideoList);
  const [datas, setDatas] = useState(null);
  useEffect(() => {
    if (search != "") {
      const dataReq = {
        displayMode: null,
        titles: null,
        numberOfViews: null,
      };
      dataReq.titles = search;
      dispatch(findChannelVideo({ dataReq }));
      setRemove(true);
      dispatch(setIsModalSearch(true));
    } else {
      setRemove(false);
      dispatch(setIsModalSearch(false));
    }
  }, [search]);

  useEffect(() => {
    if (search != "") {
      setDatas(dataList);
    }
  }, [dataList]);

  const handleClickLink = (data) => {
    setSearch("");
  };

  return (
    <div
      className={`w-10/12 relative text-xs top-0  ${
        statusTheme ? "z-[20] " : ""
      }`}
    >
      <div
        className={`absolute w-10/12  ${
          statusTheme ? "bg-white rounded-md " : ""
        }`}
      >
        <div
          className={` flex bg-white items-center lg:space-x-4 border-1 focus:text-dark px-3 h-9  ${
            statusTheme
              ? "text-gray-700 rounded-t-md"
              : "text-gray-300 border-gray-400 rounded-md"
          }`}
        >
          <IoIosSearch className="col-1 w-6 h-6" />
          <input
            type="text"
            className=" border-none focus:border-none flex-auto focus:text-black "
            placeholder="Search on your channel "
            value={search}
            onChange={handleSearch}
            onFocus={() => {
              dispatch(setIsModalSearch(true));
            }}
          />
          {remove == false ? (
            <></>
          ) : (
            <div
              className="col-1 text-lg text-gray-300 hover:text-gray-500 hover:cursor-pointer"
              onClick={() => {
                setSearch("");
              }}
            >
              ✖
            </div>
          )}
        </div>
        {statusTheme ? (
          <div className="pb-3">
            <div className="border-b-[1px] py-2">
              {remove ? (
                <span className="pl-7">Video ({datas?.content?.length})</span>
              ) : (
                <span className="pl-7">Video recent</span>
              )}
            </div>
            {datas?.content?.map((data, i) => (
                <Videos
                  data={data}
                  onClickLink={(data) => handleClickLink(data)}
                  key={i}
                />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Search;
