import React, { useEffect, useRef, useState } from "react";
import { BsFilter } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import VideoItemCommon from "../../../../components/studio/common/video/VideoItem";
import Pagination from "../../../../components/studio/common/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoList,
  findChannelVideo,
  setDataReq,
  getDataReq,
  editFormVideo,
  removeListVideo,
} from "../../../../features/studio/videoContentSlice";

import { BiSolidDownArrow } from "react-icons/bi";
import { MdOutlineRemoveFromQueue } from "react-icons/md";
import EditFormText from "../../../../components/studio/common/edit_form/EditIFormText";
import EditFormRadio from "../../../../components/studio/common/edit_form/EditFormRadio";
import { toast } from "react-toastify";

function VideoSubContent() {
  const [value, setValue] = useState("");
  const [displayRadio, setDisplayRadio] = useState("public");
  const [operatorViews, setOperatorViews] = useState("max");
  const [numberValue, setNumberValue] = useState("");
  const [isTitle, setIsTitle] = useState(false);
  const [menuFilter, setMenuFilter] = useState(false);
  const [isSubFormTitle, setIsSubFormTitle] = useState(false);
  const [isSubFormDisplay, setIsSubFormDisplay] = useState(false);
  const [isSubFormNumber, setIsSubFormNumber] = useState(false);
  const [isHoverClose, setIsHoverClose] = useState(false);
  const [filters, setFilters] = useState([]);
  const [menus, setMenus] = useState([
    {
      title: "Title",
      value: "",
      hiden: false,
    },
    { title: "Display mode", value: "Display mode", hiden: false },
    { title: "Number of views", value: "Number of views", hiden: false },
  ]);

  const [isChecked, setIsChecked] = useState([]);
  const handleCheckboxChange = (isChecked) => {
    if (isChecked) {
      // setIsChecked(datas?.content);
      let temp = [];
      for (let i = 0; i < datas?.content?.length; i++) {
        temp.push(datas?.content[i].id);
      }
      setIsChecked(temp);
    } else {
      setIsChecked([]);
    }
  };
  const handleChildCheckboxChange = (id, isChecked) => {
    if (isChecked) {
      setIsChecked((prevState) => [...prevState, id]);
    } else {
      setIsChecked((prevState) => prevState.filter((i) => i !== id));
    }
  };
  const handleDisplayRadio = (e) => {
    setDisplayRadio(e.target.value);
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    const isNumber = /^[0-9]*$/;

    if (isNumber.test(value)) {
      setNumberValue(value);
    }
  };
  const [datas, setDatas] = useState(null);
  const dispatch = useDispatch();
  const dataList = useSelector(getVideoList);

  const [isSelectEdit, setIsSelectEdit] = useState(false);
  const refEdit = useRef(null);
  const [mouseOverRemoveLabel, setMouseOverRemoveLabel] = useState(false);
  const handleClickSelectEdit = () => {
    setIsSelectEdit(true);
  };
  useEffect(() => {
    const handleClickOutsideEdit = (event) => {
      if (refEdit.current && !refEdit.current.contains(event.target)) {
        setIsSelectEdit(false);
      }
    };
    document.addEventListener("click", handleClickOutsideEdit);
    return () => {
      document.removeEventListener("click", handleClickOutsideEdit);
    };
  }, []);
  useEffect(() => {
    if (dataList == null) {
      dispatch(findChannelVideo());
    } else {
      setDatas(dataList);
    }
  }, [dataList]);

  const handleMenuFilter = () => {
    if (value == "") {
      setMenuFilter(!menuFilter);
    } else {
      setMenuFilter(false);
      setIsTitle(!isTitle);
    }
  };
  const handleFilterFocus = (e) => {
    if (value == "") {
      setMenuFilter(true);
    } else {
      setMenuFilter(false);
      setIsTitle(true);
    }
  };
  const handleOnChange = (e) => {
    setValue(e.target.value);
    setIsTitle(true);
  };

  useEffect(() => {
    if (value != "") {
      setMenuFilter(false);
    } else {
      setIsTitle(false);
    }
  }, [value, menus, filters, isHoverClose]);

  const myRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (myRef.current && !myRef.current.contains(event.target)) {
        setMenuFilter(false);
        setIsTitle(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickFilter = (label) => {
    if (label == "Title" && value == "") {
      setMenuFilter(false);
      setIsSubFormTitle(true);
    } else if (label == "Display mode") {
      setMenuFilter(false);
      setIsSubFormDisplay(true);
    } else if (label == "Number of views") {
      setMenuFilter(false);
      setIsSubFormNumber(true);
    } else if (label == "Title" && value != "") {
      handleClickApply("Title");
    }
  };

  const [tempTitleValue,setTempTitleValue] = useState("");

  const handleClickApply = (label) => {

    if (label == "Title" && value == "") {
      const arr = [...filters, menus[0]];
      setFilters(arr);
      menus[0].value = `title contains "${value}"`;
      menus[0].hiden = true;
      setIsSubFormTitle(false);
     
    } else if (label == "Display mode") {
      const arr = [...filters, menus[1]];
      menus[1].value = `Display mode: ${displayRadio}`;
      menus[1].hiden = true;
      setFilters(arr);
      setIsSubFormDisplay(false);
    } else if (label == "Number of views") {
      const arr = [...filters, menus[2]];
      menus[2].value = `Number of views: ${
        operatorViews == "max" ? ">=" : "<="
      } ${numberValue}`;
      menus[2].hiden = true;
      setFilters(arr);
      setIsSubFormNumber(false);
    } else if (label == "Title" && value != "") {
      const arr = [...filters, menus[0]];
      setFilters(arr);
      menus[0].value = `title contains "${value}"`;
      menus[0].hiden = true;
      setIsSubFormTitle(false);
       setTempTitleValue(value);
       setValue("");
    }
  };

  const handleRemoveFilter = (title) => {
    for (let i = 0; i < menus.length; i++) {
      if (title == menus[i].title) {
        menus[i].hiden = false;   
      }
    }
    let index = -1;
    for (let i = 0; i < filters.length; i++) {
      if (title == filters[i].title) {
        index = i;
      }
    }
    let temp = [...filters];
    temp.splice(index, 1);
    setFilters(temp);
    if(title == menus[1].title){
      setDisplayRadio("public");
    }
    if(title == menus[0].title){
      setTempTitleValue("");
    }
  };
  useEffect(() => {
    const dataReq = {
      displayMode: null,
      titles: null,
      numberOfViews: null,
    };
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].title == "Title") {
        dataReq.titles = tempTitleValue;
      } else if (filters[i].title == "Display mode") {
        dataReq.displayMode = displayRadio;
        
      } else {
        dataReq.numberOfViews = `${operatorViews}-${numberValue}`;
      }
    }
    dispatch(setDataReq(dataReq));
    dispatch(
      findChannelVideo({
        dataReq
      })
    );
  }, [filters]);

  const dataReq = useSelector(getDataReq);
  const handleNextPage = (label) => {
    const currentPageNumber = datas?.currentPageNumber;
    const totalPages = datas?.totalPages;
    if (label == "Next page" && datas?.hasNext) {
      if (currentPageNumber < totalPages) {
        dispatch(
          findChannelVideo({
            currentPageNumber: currentPageNumber + 1,
            dataReq: dataReq,
          })
        );
      }
    } else if (label == "Previous page" && datas?.hasPrevious) {
      if (currentPageNumber > 0) {
        dispatch(
          findChannelVideo({
            currentPageNumber: currentPageNumber - 1,
            dataReq: dataReq,
          })
        );
      }
    } else if (label == "First page") {
      dispatch(findChannelVideo({ currentPageNumber: 0, dataReq: dataReq }));
    } else if (label == "Last page") {
      dispatch(
        findChannelVideo({
          currentPageNumber: totalPages - 1,
          dataReq: dataReq,
        })
      );
    }
  };

  const handleClickCloseSelectChecked = () => {
    setIsChecked([]);
  };
  const [visibilityCheck, setVisibilityCheck] = useState(false);

  const [visibilityTitle, setVisibilityTitle] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [maxLengthTitle, setMaxLengthTitle] = useState(0);

  const [visibilityDescription, setVisibilityDescription] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [maxLengthDescription, setMaxLengthDescription] = useState(0);

  const [visibilityHashtag, setVisibilityHashtag] = useState(false);
  const [hashtagValue, setHashtagValue] = useState("");
  const [maxLengthHashtag, setMaxLengthHashtag] = useState(0);

  const [visibilityDisplayMode, setVisibilityDisplayMode] = useState(false);
  const [displayModeValue, setDisplayModeValue] = useState("public");

  const editFormLabel = {
    title: { name: "title", label: "Title" },
    description: { name: "description", label: "Description" },
    hashtag: { name: "hashtag", label: "Hashtag" },
    displayMode: { name: "displayMode", label: "Display Mode" },
  };

  const handleEditValue = (e, label) => {
    if (label == editFormLabel.title.name) {
      setTitleValue(e.target.value);
    } else if (label == editFormLabel.description.name) {
      setDescriptionValue(e.target.value);
    } else if (label == editFormLabel.hashtag.name) {
      setHashtagValue(e.target.value);
    } else if (label == editFormLabel.displayMode.name) {
      setDisplayModeValue(e.target.value);
    }
  };

  const handleVisibilityEdit = (label) => {
    if (label == editFormLabel.title.name) {
      setVisibilityTitle(true);
    } else if (label == editFormLabel.description.name) {
      setVisibilityDescription(true);
    } else if (label == editFormLabel.hashtag.name) {
      setVisibilityHashtag(true);
    } else if (label == editFormLabel.displayMode.name) {
      setVisibilityDisplayMode(true);
    }
    setVisibilityCheck(true);
  };

  const handleClickEditSave = (label) => {
    const idList = isChecked;
    let value;
    if (label == editFormLabel.title.name) {
      value = titleValue;
    } else if (label == editFormLabel.description.name) {
      value = descriptionValue;
    } else if (label == editFormLabel.hashtag.name) {
      value = hashtagValue;
    } else if (label == editFormLabel.displayMode.name) {
      value = displayModeValue;
    }
    const request = { param: label, value, idList };
    dispatch(editFormVideo(request)).then(() => {
      toast.success("Edit success");
      setTitleValue("");
      setDescriptionValue("");
      setHashtagValue("");
      setDisplayModeValue("");
      setIsChecked([]);
      handleClickVisibilityChecked();
      dispatch(findChannelVideo());
    });
  };

  useEffect(() => {
    setMaxLengthTitle(titleValue?.length);
    setMaxLengthDescription(descriptionValue?.length);
    setMaxLengthHashtag(hashtagValue?.length);
  }, [titleValue, descriptionValue, hashtagValue]);

  const handleClickVisibilityChecked = () => {
    setVisibilityTitle(false);
    setVisibilityDescription(false);
    setVisibilityHashtag(false);
    setVisibilityDisplayMode(false);
    setVisibilityCheck(false);
  };

  const handleClickRemove = () => {
    const idList = isChecked;
    dispatch(removeListVideo(idList)).then(() => {
      toast.success("delete success");
      setIsChecked([]);
      setVisibilityCheck(false);
      dispatch(findChannelVideo());
    });
  };
  return (
    <div className="">
      <div className="border-b-[1px]">
        <div className="d-flex px-4 space-x-6 items-center py-2" ref={myRef}>
          <div className="relative" onClick={handleMenuFilter}>
            <BsFilter className="w-7 h-8 text-gray-400" />
          </div>
          {filters?.map((element, i) => (
            <div
              className="flex px-2 w-auto break-normal justify-between bg-gray-100 rounded-full items-center text-sm py-1"
              key={i}
            >
              <div>{element.value}</div>
              <TiDeleteOutline
                className="ml-2 w-5 h-5 text-gray-400 hover:text-gray-600 hover:cursor-pointer"
                onClick={() => handleRemoveFilter(element?.title)}
              />
            </div>
          ))}
          <div className="w-auto grow shrink relative">
            <input
              type="text"
              className="w-full grow focus:border-none"
              placeholder="Filter"
              onFocus={handleFilterFocus}
              onChange={handleOnChange}
              value={value}
            />
            {isTitle ? (
              <div className="absolute top-9 border-[1px] py-2 z-20 bg-white rounded-md shadow-sm">
                {menus[0].hiden && menus[1].hiden && menus[2].hiden ? (
                  <div className="px-3  cursor-default text-gray-400">
                    No filters matched
                  </div>
                ) : (
                  <div
                    className="px-3 text-gray-700 hover:bg-gray-100 py-1 hover:cursor-pointer"
                    onClick={() => handleClickFilter(menus[0].title)}
                  >
                    Title contains "
                    <span className="text-gray-900 font-semibold">{value}</span>
                    "
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
            {menuFilter ? (
              <div className="absolute top-9 border-[1px] py-2 z-20 bg-white rounded-md">
                {menus.map((menu, i) => (
                  <div
                    key={i}
                    className={`px-3 hover:bg-gray-100 py-1 hover:cursor-pointer ${
                      menu.hiden ? " hidden" : "block"
                    }`}
                    onClick={() => handleClickFilter(menu.title)}
                  >
                    {menu.title}
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
            {isSubFormTitle ? (
              <div className="absolute top-0 border-[1px]  z-20 bg-white rounded-md">
                <div className="">
                  <div className="flex justify-between bg-black text-white px-4 py-2 relative">
                    <div>Title</div>
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        setIsSubFormTitle(false);
                        setIsHoverClose(false);
                      }}
                      onMouseOver={() => setIsHoverClose(true)}
                      onMouseOut={() => setIsHoverClose(false)}
                    >
                      ✖
                    </div>

                    {isHoverClose ? (
                      <div className="absolute right-1 top-11 bg-black opacity-60 px-2 text-sm py-1 rounded-md">
                        close
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="mt-3 mb-2 mx-4 text-gray-600">contains</div>
                  <input
                    type="text"
                    className=" mx-4 mb-2 border-b-[1px] focus:border-t-[0px] focus:border-l-[0px] focus:border-r-[0px] focus:border-b-[2px] border-black"
                    placeholder="value"
                    value={value}
                    onChange={handleOnChange}
                  />
                  <div className="border-t-[1px] py-3">
                    <div
                      className={`text-end mr-5 cursor-default  font-semibold ${
                        value != ""
                          ? " hover:cursor-pointer text-blue-600"
                          : "text-gray-400"
                      }`}
                      onClick={() => handleClickApply(menus[0].title)}
                    >
                      Apply
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            {isSubFormDisplay ? (
              <div className="absolute top-0 border-[1px] w-64 z-20 bg-white rounded-md">
                <div className="">
                  <div className="flex justify-between bg-black text-white px-4 py-2 relative">
                    <div>Display mode</div>
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        setIsSubFormDisplay(false);
                        setIsHoverClose(false);
                      }}
                      onMouseOver={() => setIsHoverClose(true)}
                      onMouseOut={() => setIsHoverClose(false)}
                    >
                      ✖
                    </div>

                    {isHoverClose ? (
                      <div className="absolute right-1 top-11 bg-black opacity-60 px-2 text-sm py-1 rounded-md">
                        close
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="my-3">
                    <label className=" mx-4 mb-2 flex space-x-4 text-sm items-center">
                      <input
                        type="radio"
                        value="public"
                        name="displayRadio"
                        checked={displayRadio == "public"}
                        onChange={handleDisplayRadio}
                      />
                      <div>Public</div>
                    </label>
                    <label className=" mx-4 mb-2 flex space-x-4 text-sm items-center">
                      <input
                        type="radio"
                        value="private"
                        name="displayRadio"
                        checked={displayRadio == "private"}
                        onChange={handleDisplayRadio}
                      />
                      <div>Private</div>
                    </label>
                  </div>

                  <div className="border-t-[1px] py-3">
                    <div
                      className={`text-end mr-5 cursor-default  font-semibold ${
                        displayRadio != ""
                          ? " hover:cursor-pointer text-blue-600"
                          : "text-gray-400"
                      }`}
                      onClick={() => handleClickApply(menus[1].title)}
                    >
                      Apply
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            {isSubFormNumber ? (
              <div className="absolute top-0 border-[1px] w-64 z-20 bg-white rounded-md">
                <div className="">
                  <div className="flex justify-between bg-black text-white px-4 py-2 relative">
                    <div>Number of views</div>
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        setIsSubFormNumber(false);
                        setIsHoverClose(false);
                      }}
                      onMouseOver={() => setIsHoverClose(true)}
                      onMouseOut={() => setIsHoverClose(false)}
                    >
                      ✖
                    </div>

                    {isHoverClose ? (
                      <div className="absolute right-1 top-11 bg-black opacity-60 px-2 text-sm py-1 rounded-md">
                        close
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="my-3 mx-3 flex justify-between space-x-2">
                    <select
                      className="w-1/2 border-b-[1px] border-gray-600 focus:outline-none focus:border-b-2 focus:border-gray-900 select-none"
                      value={operatorViews}
                      onChange={(e) => setOperatorViews(e.target.value)}
                    >
                      <option value="max">&gt;=</option>
                      <option value="min">&lt;=</option>
                    </select>
                    <input
                      className="appearance-none hover:appearance-none focus:appearance-none w-1/2 border-b-[1px] border-gray-600 focus:border-l-0 focus:border-t-0 focus:border-r-0 focus:border-b-2 focus:border-gray-900"
                      value={numberValue}
                      type="text"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="border-t-[1px] py-3">
                    <div
                      className={`text-end mr-5 cursor-default  font-semibold ${
                        displayRadio != ""
                          ? " hover:cursor-pointer text-blue-600"
                          : "text-gray-400"
                      }`}
                      onClick={() => handleClickApply(menus[2].title)}
                    >
                      Apply
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {isChecked?.length > 0 && visibilityCheck == false ? (
        <div className="bg-black text-white flex justify-between px-3 py-2 items-center relative">
          <div className="flex justify-between w-1/4 items-center">
            <div className="border-r-[1px] py-2 px-4 border-gray-600 cursor-default">
              Selected {isChecked?.length}
            </div>
            <div
              className="flex space-x-4 items-center  hover:text-white relative hover:cursor-pointer"
              onClick={handleClickSelectEdit}
              ref={refEdit}
            >
              <div>Edit</div>
              <BiSolidDownArrow className="text-gray-300 hover:text-white" />
              {isSelectEdit ? (
                <div className="bg-white absolute text-black py-3 top-0 -left-12  border-[1px] shadow-sm rounded-md w-44">
                  <div
                    className="px-4 hover:bg-gray-100 py-2 hover:cursor-pointer"
                    onClick={() => handleVisibilityEdit("title")}
                  >
                    Title
                  </div>
                  <div
                    className="px-4 hover:bg-gray-100 py-2 hover:cursor-pointer"
                    onClick={() => handleVisibilityEdit("description")}
                  >
                    Description
                  </div>
                  <div
                    className="px-4 hover:bg-gray-100 py-2 hover:cursor-pointer"
                    onClick={() => handleVisibilityEdit("hashtag")}
                  >
                    Hastag
                  </div>
                  <div
                    className="whitespace-nowrap px-4 hover:bg-gray-100 py-2 hover:cursor-pointer"
                    onClick={() => handleVisibilityEdit("displayMode")}
                  >
                    Display mode
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div
              className="flex space-x-4 items-center hover:cursor-pointer hover:text-white"
              onClick={() => handleClickRemove()}
            >
              <div>Remove</div>
              <MdOutlineRemoveFromQueue className="text-gray-300 " />
            </div>
          </div>
          <div
            className="relative px-3"
            onMouseOver={() => setMouseOverRemoveLabel(true)}
            onMouseOut={() => setMouseOverRemoveLabel(false)}
          >
            <div
              className="text-xl text-gray-300 hover:cursor-pointer"
              onClick={handleClickCloseSelectChecked}
            >
              ✖
            </div>
            {mouseOverRemoveLabel ? (
              <div className="absolute top-[48px] px-2 py-1 rounded-md -right-1 text-xs text-white bg-gray-700">
                Close
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      {visibilityTitle ? (
        <EditFormText
          isChecked={isChecked}
          value={titleValue}
          maxLength={maxLengthTitle}
          handleValue={(e) => handleEditValue(e, editFormLabel.title.name)}
          handleClickVisibilityChecked={handleClickVisibilityChecked}
          handleClickSave={() => handleClickEditSave(editFormLabel.title.name)}
          label={editFormLabel.title.label}
          max={100}
        />
      ) : (
        <></>
      )}

      {visibilityDescription ? (
        <EditFormText
          isChecked={isChecked}
          value={descriptionValue}
          maxLength={maxLengthDescription}
          handleValue={(e) =>
            handleEditValue(e, editFormLabel.description.name)
          }
          handleClickVisibilityChecked={handleClickVisibilityChecked}
          handleClickSave={() =>
            handleClickEditSave(editFormLabel.description.name)
          }
          label={editFormLabel.description.label}
          max={5000}
        />
      ) : (
        <></>
      )}

      {visibilityHashtag ? (
        <EditFormText
          isChecked={isChecked}
          value={hashtagValue}
          maxLength={maxLengthHashtag}
          handleValue={(e) => handleEditValue(e, editFormLabel.hashtag.name)}
          handleClickVisibilityChecked={handleClickVisibilityChecked}
          handleClickSave={() =>
            handleClickEditSave(editFormLabel.hashtag.name)
          }
          label={editFormLabel.hashtag.label}
          max={200}
        />
      ) : (
        <></>
      )}

      {visibilityDisplayMode ? (
        <EditFormRadio
          isChecked={isChecked}
          value={displayModeValue}
          handleValue={(e) =>
            handleEditValue(e, editFormLabel.displayMode.name)
          }
          handleClickVisibilityChecked={handleClickVisibilityChecked}
          handleClickSave={() =>
            handleClickEditSave(editFormLabel.displayMode.name)
          }
          label={editFormLabel.displayMode.label}
        />
      ) : (
        <></>
      )}

      <div className=" min-w-[1558] overflow-x-auto  ">
        <div className="flex flex-col justify-center text-sm ">
          <div className="flex border-b-[1px]  justify-between text-gray-600 py-2">
            <div className=" px-3 text-center  ">
              <input
                type="checkbox"
                checked={isChecked.length === datas?.content.length}
                onChange={(e) => handleCheckboxChange(e.target.checked)}
              />
            </div>
            <div className="w-[20%]  grow" style={{ width: 220 }}>
              Video
            </div>
            <div className="text-center   col-1">Display mode</div>
            <div className=" col-1 text-center  ">Day</div>
            <div className="text-end   col-2">Number of views</div>
            <div className="text-end   col-2">Number of comment</div>
            <div className="text-end   col-2 pr-3">Number of like</div>
          </div>
          {datas?.content?.map((item, i) => (
            <VideoItemCommon
              isChecked={isChecked.includes(item?.id)}
              onChangeItem={(isChecked) =>
                handleChildCheckboxChange(item?.id, isChecked)
              }
              key={i}
              item={item}
            />
          ))}
        </div>
        <Pagination datas={datas} handleNextPage={handleNextPage} />
        <div className="py-4"></div>
      </div>
    </div>
  );
}

export default VideoSubContent;
