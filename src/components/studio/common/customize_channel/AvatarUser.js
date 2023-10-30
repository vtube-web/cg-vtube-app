import React, { useState } from "react";
import { firebaseStorage } from "../../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import { getStoredUserData } from "../../../../services/accountService";
import { useNavigate } from "react-router";

function AvatarUser() {
  const [image, setImage] = useState(null);
  const [tempImage, setTempImage] = useState(false);
  const navigate = useNavigate();
  const handleImage = (e) => {
    const img = e.target.files[0];
    const imageRef = ref(
      firebaseStorage,
      `images/avatar/${img.name + uuidv4()}`
    );
    uploadBytes(imageRef, img).then((snapshort) => {
      getDownloadURL(snapshort.ref).then((url) => {
        setImage(url);
        setTempImage(true);
      });
    });
  };
  const handleClickSave = () => {
    const user = getStoredUserData();
    if (user != null) {
      axios
        .put(
          `http://localhost:8080/api/users/edit-avatar`,
          { id: user?.id, avatar: image },
          {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        )
        .then((res) => {
          if (parseInt(res.data.status) == 200) {
            toast.success(res.data.message);
            const userLocal = JSON.parse(window.localStorage.getItem("user"));
            userLocal.avatar = image;
            window.localStorage.removeItem("user");
            window.localStorage.setItem("user", JSON.stringify(userLocal));
            setImage(null);
            setTempImage(false);
            navigate();
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  };
  const handleClickRemove = () => {
    setTempImage(false);
    setImage(null);
  };
  return (
    <div className="mb-[22px]">
      <div className="mb-2 font-semibold">Image</div>
      <div className=" flex justify-between space-x-3">
        <div className="w-[45%] bg-gray-100 rounded-sm flex justify-center py-2 shadow-xs border">
          {tempImage ? (
            <img
              src={`${image}`}
              className=" w-28 h-28 rounded-full shadow-xl"
            />
          ) : (
            <img
              src={`${getStoredUserData()?.avatar}`}
              className=" w-28 h-28 rounded-full shadow-xl"
            />
          )}
        </div>
        <div className="w-1/2">
          <div className=" text-sm text-gray-500">
            Your profile photo will appear with your channel on Vtube in places
            like next to your comments and videos
          </div>
          <input
            type="file"
            id="imageInput"
            accept="image/png, image/gif, image/jpeg"
            className="hidden"
            onChange={handleImage}
            multiple={false}
          />
          {image == null ? (
            <label
              className="mt-3 text-blue-500 font-semibold hover:text-blue-700 cursor-pointer"
              htmlFor="imageInput"
            >
              Upload
            </label>
          ) : (
            <div className="flex space-x-3">
              <div
                className="mt-3 text-blue-500 font-semibold hover:text-blue-700 cursor-pointer"
                onClick={handleClickSave}
              >
                Save
              </div>
              <div
                className="mt-3 text-blue-500 font-semibold hover:text-blue-700 cursor-pointer"
                onClick={handleClickRemove}
              >
                Remove
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AvatarUser;
