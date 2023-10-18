import React, { useState } from "react";

function PaginationItem({ pageIcon, datas, handleNextPage }) {
  const [isMouse, setIsMouse] = useState(false);

  const handleMouseOut = () => {
    setIsMouse(false);
  };
  const handleMouseOver = () => {
    setIsMouse(true);
  };

  return (
    <div
      className={`flex items-center hover:cursor-pointer relative justify-center`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => handleNextPage(pageIcon?.label)}
    >
      {pageIcon?.before ? <span>|</span> : <></>}
      {React.createElement(pageIcon?.icon)}

      {pageIcon?.after ? <span>|</span> : <></>}

      {isMouse ? (
        <div className="absolute bg-black opacity-60 text-white text-xs top-8 px-2 py-1 rounded-md whitespace-nowrap">
          {pageIcon.label}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PaginationItem;
