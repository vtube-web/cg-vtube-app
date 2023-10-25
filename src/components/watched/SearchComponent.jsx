import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import style from "../../assets/scss/main_screen/watched_video/_watchedVideo.module.scss";

const SearchComponent = ({
  searchKeyword,
  handleSearchChange,
  performSearch,
  setSearchKeyword,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  };
  const clearSearchKeyword = () => {
    setSearchKeyword("");
    performSearch();
  };
  return (
    <div className={`${style.input__wrapper} row`}>
      <div className="col-1">
        <button onClick={performSearch}>
          <AiOutlineSearch size={22} />
        </button>
      </div>
      <div className="col-10">
        <input
          type="text"
          placeholder="Search watch history"
          value={searchKeyword}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        {searchKeyword && (
          <button className={style.exit__search} onClick={clearSearchKeyword}>
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
