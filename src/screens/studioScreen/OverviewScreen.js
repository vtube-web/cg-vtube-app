import React, { useEffect, useState } from "react";


function OverviewScreen() {
  return (
    <div className="text-black">
      <div className="pl-9 pt-4 text-2xl font-bold flex">
        Overview channel page
      </div>
      <div className="flex space-x-3 pt-4">
        <div className="col-4 h-96 bg-white col-">a</div>
        <div className="col-4 h-96 bg-white col-">b</div>
      </div>
    </div>
  );
}

export default OverviewScreen;
