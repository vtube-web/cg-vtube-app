import React, { useEffect, useRef, useState } from "react";
import { BsFilter } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";

function Video() {
  const [value, setValue] = useState("");
  const [isTitle, setIsTitle] = useState(false);
  const [menuFilter, setMenuFilter] = useState(false);
  const [isSubForm, setIsSubForm] = useState(false);
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

  const handleClickFilter = (val) => {
    if (val == "Title" && value == "") {
      setMenuFilter(false);
      setIsSubForm(true);
    } else if (val == "Display mode") {
      const arr = [...filters, menus[1]];
      menus[1].hiden = true;
      setFilters(arr);
    } else if (val == "Number of views") {
      const arr = [...filters, menus[2]];
      menus[2].hiden = true;
      setFilters(arr);
    }
  };
  const handleClickApply = () => {
    const arr = [...filters, menus[0]];
    setFilters(arr);
    menus[0].value = `title contains "${value}"`;
    menus[0].hiden = true;
    setValue("");
    setIsSubForm(false);
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
  };

  return (
    <div>
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
                    onClick={(e) => handleClickFilter(menus[0].title)}
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
            {isSubForm ? (
              <div className="absolute top-0 border-[1px]  z-20 bg-white rounded-md">
                <div className="">
                  <div className="flex justify-between bg-black text-white px-4 py-2 relative">
                    <div>Title</div>
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => setIsSubForm(false)}
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
                      onClick={handleClickApply}
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
      <div>body</div>
    </div>
  );
}

export default Video;
