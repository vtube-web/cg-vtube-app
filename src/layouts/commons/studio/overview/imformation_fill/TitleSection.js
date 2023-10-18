import React from "react";

function TitleSection({
  isValidateTitle,
  isTitleFocus,
  handleChange,
  setIsTitleFocus,
  title,
  isTitleLengthMax,
}) 
{

  return (
        <div className="relative mt-2">
          <div
            className={`border-[1px] rounded-md p-3 w-full truncate overflow-y-auto max-h-[400px] min-h-[100px]  ${
              isValidateTitle ? "" : "border-red-600"
            } ${isTitleFocus && isValidateTitle ? "border-blue-600" : ""}`}
          >
            <div
              className={`text-xs mb-1 ${
                isValidateTitle ? "" : "text-red-600"
              } ${isTitleFocus && isValidateTitle ? "text-blue-600" : ""}`}
            >
              Title (required)
            </div>
            <textarea
              className="h-8 focus:border-none focus:outline-none w-full resize-none"
              placeholder="Add a title to describe your video"
              name="title"
              onChange={(e) => handleChange(e, "title")}
              onFocus={() => setIsTitleFocus(true)}
              onBlur={() => setIsTitleFocus(false)}
              value={title}
            />
            <div
              className={`text-end text-sm  ${
                isValidateTitle ? "text-gray-500" : "text-red-600"
              } `}
            >
              {title?.length||0}/100
            </div>
          </div>
          <div className={`absolute ${isTitleLengthMax ? "block" : "hidden"}`}>
            <div className="leading-[11px] ml-3 text-gray-700">▲</div>
            <div className=" bg-gray-700  p-2 rounded-lg">
              <div className="text-white ">title is too long</div>
            </div>
          </div>
        </div>

  );
}

export default TitleSection;
