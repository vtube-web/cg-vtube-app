import React, { useState } from "react";
import { firebaseStorage } from "../../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import { getStoredUserData } from "../../../../services/accountService";
import { useNavigate } from "react-router-dom";
import { VTUBE_API } from "../../.././../app/constants";

function BannerChannel() {
  const [imageBanner, setImageBanner] = useState(null);
  const [tempImage, setTempImage] = useState(false);
  const navigate = useNavigate();
  const handleImage = (e) => {
    const img = e.target.files[0];
    const imageRef = ref(
      firebaseStorage,
      `images/banner/${img.name + uuidv4()}`
    );
    uploadBytes(imageRef, img).then((snapshort) => {
      getDownloadURL(snapshort.ref).then((url) => {
        setImageBanner(url);
        setTempImage(true);
      });
    });
  };
  const handleClickSave = () => {
    const user = getStoredUserData();

    axios
      .put(
        `${VTUBE_API}/users/edit-banner`,
        { id: user?.id, banner: imageBanner },
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
          userLocal.banner = imageBanner;
          window.localStorage.removeItem("user");
          window.localStorage.setItem("user", JSON.stringify(userLocal));
          setImageBanner(null);
          setTempImage(false);
          navigate();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const handleClickRemove = () => {
    setTempImage(false);
    setImageBanner(null);
  };

  return (
    <div>
      <div className="mb-2 font-semibold">Banner image</div>
      <div className=" flex justify-between space-x-3">
        <div className="w-[45%] bg-gray-100 rounded-sm flex justify-center py-2 shadow-xs border">
          {tempImage ? (
            <img
              src={`${imageBanner}`}
              className=" w-[92%] h-28 rounded-sm shadow-xl object-cover object-top"
            />
          ) : (
            <img
              src={`${getStoredUserData()?.banner}`}
              className=" w-[92%] h-28 rounded-sm shadow-xl object-cover object-top"
            />
          )}
        </div>
        <div className="w-1/2">
          <div className=" text-sm text-gray-500">
            This image will appear at the top of your channel
          </div>
          <input
            type="file"
            id="imageInputBanner"
            accept="image/png, image/gif, image/jpeg"
            className="hidden"
            onChange={handleImage}
            multiple={false}
          />
          {imageBanner == null ? (
            <label
              className="mt-3 text-blue-500 font-semibold hover:text-blue-700 cursor-pointer"
              htmlFor="imageInputBanner"
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

export default BannerChannel;
