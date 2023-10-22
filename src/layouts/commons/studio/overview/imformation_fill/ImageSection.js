import React from "react";
import { LuImagePlus } from "react-icons/lu";
import {FcCancel} from "react-icons/fc";

function ImageSection({
  image,
  handleImage,
  handleChangeImg,
  isValidateImage,
  mouseImg,
  onMouseOver,
  onMouseOut,
}) {
  return (
    <div className="mt-4 pb-3 w-[40%] px-2">
      <div className="font-semibold text-gray-700">Small picture</div>
      <div className="whitespace-pre-line text-sm text-gray-500 mt-1 mb-3">
        Choose or upload an image to represent what's in your video. Attractive
        thumbnails will highlight your video and attract viewers.
      </div>
      <div
        className={`mb-1 ${
          isValidateImage ? "text-gray-500 invisible" : "ml-2 text-red-500"
        }`}
      >
        (required)
      </div>

      <div className="flex">
        <input
          type="file"
          id="imageInput"
          accept="image/png, image/gif, image/jpeg"
          className="hidden"
          onChange={handleImage}
          multiple={false}
        />

        {image == null || image == "" ? (
          <>
            <label htmlFor="imageInput">
              <div className="border-[1px] border-dashed  p-3 text-gray-500 hover:cursor-pointer border-red-300 hover:border-red-600 w-64 h-40">
                <div className="flex justify-center h-1/2 items-end">
                  <LuImagePlus className="w-8 h-8 " />
                </div>
                <div className="text-sm mt-2 text-center">
                  Upload thumbnails
                </div>
              </div>
            </label>
          </>
        ) : (
          <div
            className="shadow-sm border-[1px] border-black rounded-sm hover:cursor-pointer relative"
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          >
            <img
              src={`${image}`}
              className=" object-cover object-top w-64 h-40 rounded-sm shadow-sm"
            />
            <div
              className={`absolute bg-black w-64 h-40 top-0 bg-opacity-50 z-50  flex flex-col space-y-3 justify-center hover:cursor-default ${
                mouseImg ? "block" : "hidden"
              }`}
            >
              <label
                htmlFor="imageInput"
                className="text-white flex items-center justify-center mx-5 py-2 rounded-lg space-x-3 z-50 hover:bg-gray-100 hover:bg-opacity-30 hover:cursor-pointer"
              >
                <LuImagePlus className="w-6 h-6  " />
                <div className="text-sm mt-2 ">Change</div>
              </label>
              <div
                onClick={handleChangeImg}
                className="text-white flex items-center justify-center mx-5 py-2 rounded-lg space-x-3 z-50 hover:bg-gray-100 hover:bg-opacity-30 hover:cursor-pointer"
              >
                <FcCancel className="w-6 h-6" />
                <div className="text-sm mt-2 ">Cancel</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageSection;
