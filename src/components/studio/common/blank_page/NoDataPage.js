import React from 'react'

function NoDataPage({ title }) {
  return (
    <div className="py-4">
      <div className="w-full flex justify-center mt-20">
        <img src="https://www.gstatic.com/youtube/img/creator/no_match_illustration_v3.svg" />
      </div>
      <div className="text-center mt-3">{title}</div>
    </div>
  );
}

export default NoDataPage