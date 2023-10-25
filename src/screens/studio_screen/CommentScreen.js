import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MenuItemChill from "../../components/studio/common/menu_item_sub/MenuItemSub";
import Comment from "../../layouts/commons/studio/comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentByChannel,
  getData,
} from "../../features/studio/commentChannelSlice";
import Pagination from "../../components/studio/common/pagination/Pagination";
import { BiSearchAlt2 } from "react-icons/bi";

function CommentScreen() {
  const { channelId } = useParams();

  const pathAcountDefault = `/channel/${channelId}`;
  const menus = [
    {
      to: `${pathAcountDefault}/comment`,
      title: "Comment",
    },
  ];
  const dispatch = useDispatch();
  const dataList = useSelector(getData);
  const [datas, setDatas] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (dataList == null) {
      handleSearchData();
    } else {
      setDatas(dataList);
    }
  }, [dataList]);

  const handleChangeValue = (e) => {
    setValue(e.target.value);
   
  };
  const handleSearchData = () => {
      dispatch(
        getCommentByChannel({
          currentPageNumber: 0,
          content: value,
        })
      );
  };
  useEffect(() => {
    if (value === "") {
      handleSearchData();
    }
  }, [value]);


  const handleNextPage = (label) => {
    const currentPageNumber = datas?.currentPageNumber;
    const totalPages = datas?.totalPages;
    if (label == "Next page" && datas?.hasNext) {
      if (currentPageNumber < totalPages) {
        dispatch(
          getCommentByChannel({ currentPageNumber: currentPageNumber + 1,content:value })
        );
      }
    } else if (label == "Previous page" && datas?.hasPrevious) {
      if (currentPageNumber > 0) {
          dispatch(
            getCommentByChannel({
              currentPageNumber: currentPageNumber - 1,
              content: value,
            })
          );
      }
    } else if (label == "First page") {
         dispatch(
           getCommentByChannel({
             currentPageNumber: 0,
             content: value,
           })
         );
    } else if (label == "Last page") {
       dispatch(
         getCommentByChannel({
           currentPageNumber: totalPages - 1,
           content: value,
         })
       );
    }
  };
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

      <div className="pl-6 pt-4 text-2xl font-bold flex">
        Comment channel page
      </div>
      <div className="flex flex-nowrap space-x-3 py-4 bg-white rounded-lg mt-2">
        <div className="w-full">
          <div className="flex px-4 justify-between items-center space-x-8 border-b-[1px] w-full">
            {menus?.map((menu, i) => (
              <MenuItemChill menu={menu} key={i} />
            ))}
            <div className="w-1/2 border flex items-center justify-between space-x-4 px-3 py-1 mb-1 rounded-lg">
              <div className="border-r-2 pr-3 text-gray-700 cursor-default">
                Content
              </div>
              <input
                type="text"
                className="w-full border-none focus:border-none focus:outline-none"
                placeholder="value"
                value={value}
                onChange={handleChangeValue}
              />
              <BiSearchAlt2
                className="w-7 h-7 text-gray-400 hover:text-gray-700 hover:cursor-pointer"
                onClick={handleSearchData}
              />
            </div>
          </div>

          {datas?.content?.map((data, i) => (
            <Comment data={data} key={i} />
          ))}

          <div>
            <Pagination datas={datas} handleNextPage={handleNextPage} />
            <div className="py-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentScreen;
