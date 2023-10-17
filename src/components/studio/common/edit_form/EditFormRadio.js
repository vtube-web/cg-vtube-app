import React from 'react'

function EditFormRadio({
  isChecked,
  value,
  handleValue,
  handleClickVisibilityChecked,
  handleClickSave,
  label,
}) {
  return (
    <div className="bg-black text-white flex justify-between px-3 py-2 items-center relative">
      <div className="flex justify-between items-center">
        <div className="border-r-[1px] py-2 px-4 border-gray-600 cursor-default">
          Selected {isChecked?.length}
        </div>
      </div>
      <div className="px-4 py-1 rounded-md border-2 border-white w-1/2 space-x-3 flex ">
        <div className="w-1/4">{label}</div>
        <div className="flex justify-between w-1/3">
          <div className="flex items-center space-x-5">
            <input
              type="radio"
              className=""
              value="public"
              checked={value === "public"}
              onChange={(e) => handleValue(e)}
            />
            <label>public</label>
          </div>
          <div className="flex items-center space-x-5">
            <input
              type="radio"
              className=""
              value="private"
              checked={value === "private"}
              onChange={(e) => handleValue(e)}
            />
            <label>private</label>
          </div>
        </div>
      </div>
      <div className="px-3 flex space-x-4 text-sm items-center">
        <div
          className="text-blue-500 hover:cursor-pointer uppercase font-semibold"
          onClick={handleClickVisibilityChecked}
        >
          cancel
        </div>
        <div
          className={`uppercase px-3 py-1 rounded-md font-semibold text-gray-900 ${
            value != ""
              ? "bg-blue-500 hover:cursor-pointer"
              : " bg-gray-300 cursor-default pointer-events-none"
          }`}
          onClick={handleClickSave}
        >
          update
        </div>
      </div>
    </div>
  );
}

export default EditFormRadio