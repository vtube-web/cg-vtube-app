import React from "react";

function DescribeSection({
  isValidateDescribe,
  isDescribeFocus,
  handleChange,
  setIsDescribeFocus,
  isDescribeLengthMax,
  describe,
}) {
  return (
    <div className="relative mt-4">
      <div
        className={`border-[1px] rounded-md p-3 w-full truncate overflow-y-auto max-h-[400px] min-h-[180px]  ${
          isValidateDescribe ? "" : "border-red-600"
        } ${isDescribeFocus && isValidateDescribe ? "border-blue-600" : ""}`}
      >
        <div
          className={`text-xs mb-1 ${
            isValidateDescribe ? "" : "text-red-600"
          } ${isDescribeFocus && isValidateDescribe ? "text-blue-600" : ""}`}
        >
          Describe
        </div>
        <textarea
          className="h-24 focus:border-none focus:outline-none w-full resize-none"
          placeholder="Introduce your video to viewers (enter the # character to mention the name of a hashtag)"
          name="describe"
          onChange={(e) => handleChange(e, "describe")}
          onFocus={() => setIsDescribeFocus(true)}
          onBlur={() => setIsDescribeFocus(false)}
          value={describe}
        />
        <div
          className={`text-end text-sm  ${
            isValidateDescribe ? "text-gray-500" : "text-red-600"
          } `}
        >
          {describe.length}/5000
        </div>
      </div>
      <div className={`absolute ${isDescribeLengthMax ? "block" : "hidden"}`}>
        <div className="leading-[11px] ml-3 text-gray-700">▲</div>
        <div className=" bg-gray-700  p-2 rounded-lg">
          <div className="text-white ">Describe is too long</div>
        </div>
      </div>
    </div>
  );
}

export default DescribeSection;
