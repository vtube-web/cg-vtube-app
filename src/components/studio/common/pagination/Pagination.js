import React from "react";
import PaginationItem from "./PaginationItem";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

function Pagination({datas,handleNextPage}) {
  console.log(datas);
  const pageIcons = [
    { icon: MdArrowBackIosNew, label: "First page", before: true },
    { icon: MdArrowBackIosNew, label: "Previous page" },
    { icon: MdArrowForwardIos, label: "Next page" },
    { icon: MdArrowForwardIos, label: "Last page", after: true },
  ];

  return (
    <div className="py-2 flex justify-end border-b-[1px] text-gray-600">
      <div className="flex items-center mr-6 space-x-6">
        <div className="text-sm mr-4">
          {datas?.currentPageNumber + 1}/{datas?.totalPages}
        </div>
        {pageIcons.map((pageIcon, i) => (
          <PaginationItem
            key={i}
            pageIcon={pageIcon}
            datas={datas}
            handleNextPage={handleNextPage}
          />
        ))}
      </div>
    </div>
  );
}

export default Pagination;
