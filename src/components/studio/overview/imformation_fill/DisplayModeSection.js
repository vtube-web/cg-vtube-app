import React from "react";

function DisplayModeSection({
  selectedOption,
  handleOptionChange,
  selectedOptionSaveChill,
  handleOptionChillChange,
  date,
  handleDate,
  time,
  handleTime,
}) {
  return (
    <div className="mt-4 pb-3 w-[60%]">
      <div className="font-semibold text-gray-700">Display mode</div>
      <div className="whitespace-pre-line text-sm text-gray-500 mt-1 mb-3">
        Choose when you publish and who can see your video
      </div>
      <div>
        <div className="border-[1px] px-2 py-3 rounded-lg flex mb-3">
          <div className="mr-2">
            <input
              className="w-5 h-5 accent-black"
              type="radio"
              value="save"
              name="check"
              id="saveOrPublish"
              checked={selectedOption === "save"}
              onChange={handleOptionChange}
            />
          </div>
          <label htmlFor="saveOrPublish">
            <div className="text-gray-700 font-semibold text-sm">
              Save or Publish
            </div>
            <div className="text-xs text-gray-500 ">
              Make your video public or private
            </div>
            <div
              className={`flex mt-3 ${
                selectedOption === "save" ? "block" : "hidden"
              }`}
            >
              <div className="mr-2">
                <input
                  className="w-5 h-5 accent-black"
                  type="radio"
                  value="private"
                  name="save-chill"
                  id="private"
                  checked={selectedOptionSaveChill === "private"}
                  onChange={handleOptionChillChange}
                />
              </div>
              <label htmlFor="private">
                <div className="text-gray-700  text-sm">Private</div>
                <div className="text-xs text-gray-500 mb-3">
                  Only you can see your video
                </div>
              </label>
            </div>
            <div
              className={`flex ${
                selectedOption === "save" ? "block" : "hidden"
              }`}
            >
              <div className="mr-2">
                <input
                  className="w-5 h-5 accent-black"
                  type="radio"
                  value="public"
                  name="save-chill"
                  id="public"
                  checked={selectedOptionSaveChill === "public"}
                  onChange={handleOptionChillChange}
                />
              </div>
              <label htmlFor="public">
                <div className="text-gray-700  text-sm">Public</div>
                <div className="text-xs text-gray-500 mb-3">
                  Everyone can see your videos
                </div>
              </label>
            </div>
          </label>
        </div>

        <div className="border-[1px] px-2 py-3 rounded-lg flex  ">
          <div className="mr-2">
            <input
              className="w-5 h-5 accent-black "
              type="radio"
              value="schedule"
              name="check"
              id="schedule"
              checked={selectedOption === "schedule"}
              onChange={handleOptionChange}
            />
          </div>
          <label htmlFor="schedule">
            <div className="text-gray-700 font-semibold text-sm">Schedule</div>
            <div className="text-xs text-gray-500 ">
              Choose a date to make your video
              <span className="font-bold"> public</span>
            </div>

            <div
              className={`flex flex-col space-y-3 mt-3 ${
                selectedOption === "schedule" ? "block" : "hidden"
              }`}
            >
              <input
                className="p-3 border rounded-lg"
                type="date"
                value={date}
                onChange={handleDate}
              />
              <input
                className="p-3 border rounded-lg"
                type="time"
                value={time}
                onChange={handleTime}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default DisplayModeSection;
