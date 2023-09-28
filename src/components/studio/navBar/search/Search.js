import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsModalSearch,
  getIsModalSearch,
} from "../../../../features/studio/studioSlice";
import Videos from "./Videos";

function Search() {
  const [search, setSearch] = useState("");
  const [remove, setRemove] = useState(false);
  const statusTheme = useSelector(getIsModalSearch);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (search != "") {
      setRemove(true);
      dispatch(setIsModalSearch(true));
    } else {
      setRemove(false);
      dispatch(setIsModalSearch(false));
    }
  }, [search]);

  return (
    <div
      className={`w-10/12 relative text-xs top-0 ${
        statusTheme ? "z-[20]" : ""
      }`}
    >
      <div
        className={`absolute w-10/12  ${
          statusTheme ? "bg-white rounded-md" : ""
        }`}
      >
        <div
          className={` flex bg-white items-center space-x-4 border-1 focus:text-dark px-3 h-9 ${
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
            <CiCircleRemove
              className="col-1 w-6 h-6"
              onClick={() => {
                setSearch("");
              }}
            />
          )}
        </div>
        {statusTheme ? (
          <div className="pb-3">
            <div className="border-b-[1px] py-2">
              <span className="pl-7">Video recent</span>
            </div>

            {/* data */}

            <Videos key={1} />
            <Videos key={2} />
            {/* data */}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Search;
