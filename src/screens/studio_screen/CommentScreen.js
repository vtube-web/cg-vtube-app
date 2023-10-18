import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MenuItemChill from "../../components/studio/common/menu_item_sub/MenuItemSub";

import axios from "axios";
import { getAccessToken } from "../../services/accountService";
import Comment from "../../layouts/commons/studio/comment/Comment";

function CommentScreen() {
  const { channelId } = useParams();

  const pathAcountDefault = `/channel/${channelId}`;
  const menus = [
    {
      to: `${pathAcountDefault}/comment`,
      title: "Comment",
    },
  ];

  const [data,setData] = useState([]);
  useEffect(()=>{
    const token = getAccessToken();
    axios.get("http://localhost:8080/api/comment", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res)=>{
      console.log(res.data.data);
      setData(res.data.data);
    }).catch((e)=>{
      console.log("error",e);
    });
  },[])


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
            <div className="w-1/2 border flex items-center justify-between space-x-5 px-3 py-1 mb-1 rounded-lg">
              <div>
                <select>
                  <option>a</option>
                </select>
              </div>
              <input
                type="text"
                className="w-full border-none focus:border-none focus:outline-none"
                placeholder="value"
              />
              <div>a</div>
            </div>
          </div>

         <Comment data={data} />

          
        </div>
      </div>
    </div>
  );
}

export default CommentScreen;
