import React, { useEffect, useState } from "react";
import { getStoredUserData } from "../../../../services/accountService";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function ProfileChannel() {
  const [userName, setUserName] = useState("");
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [isSave, setIsSave] = useState(false);
    const user = getStoredUserData();

  useEffect(() => {
    if (user != null) {
      setUserName(user?.userName);
      setChannelName(user?.channelName);
      setDescription(user?.description);
    }
  }, []);

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
    setIsSave(true);
  };

  const handleChangeChannelName = (e) => {
    setChannelName(e.target.value);
    setIsSave(true);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
    setIsSave(true);
  };
  useEffect(() => {
    if (getStoredUserData() != null) {
      if (
        user.userName == userName &&
        user.channelName == channelName &&
        user.description == description
      ) {
        setIsSave(false);
      }
    }
  }, [userName, channelName, description,isSave]);

  const navigate = useNavigate();
  const handleClickSave = () => {
    if (isSave) {
      
     axios.put(
       `http://localhost:8080/api/users`,
       { id: user?.id, userName,channelName,description},
       {
         headers: {
           Authorization: `Bearer ${user?.accessToken}`,
         },
       }
     ).then((res)=>{
        if (parseInt(res.data.status) == 200) {
            toast.success(res.data.message);
            const userLocal = JSON.parse(window.localStorage.getItem("user"));
            const newUserLocal = res.data.data;
            newUserLocal.accessToken= userLocal.accessToken;
            newUserLocal.refreshToken = userLocal.refreshToken;
            window.localStorage.removeItem("user");
            window.localStorage.setItem("user", JSON.stringify(newUserLocal));
            navigate();
        }
     }).catch((e)=>{
        console.log("error",e);
     });
    }
  };
  return (
    <>
      <div className="mb-4">
        <div className="mb-2 font-semibold">User name</div>
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Enter user name"
          value={userName}
          onChange={handleChangeUserName}
        />
      </div>
      <div className="mb-4">
        <div className="mb-2 font-semibold">Channel name</div>
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Enter channel name"
          value={channelName}
          onChange={handleChangeChannelName}
        />
      </div>
      <div className="mb-4">
        <div className="mb-2 font-semibold">User name</div>
        <textarea
          className="resize-none block w-full outline-none rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-10"
          placeholder="Introduce viewers to your channel. The description appears in the channel introduction."
          value={description}
          onChange={handleChangeDescription}
        />
      </div>
      <div className="flex flex-row-reverse">
        <div
          className={`px-4 py-2 rounded-md  font-semibold  shadow-sm ${
            isSave
              ? "bg-blue-500 text-white cursor-pointer hover:bg-blue-700"
              : "bg-gray-300 text-white cursor-default"
          }`}
          onClick={handleClickSave}
        >
          Save
        </div>
      </div>
    </>
  );
}

export default ProfileChannel;
