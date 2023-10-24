import React from 'react'
import ComingSoom from '../../components/studio/common/blank_page/ComingSoom'
import { ToastContainer } from 'react-toastify';

function AnalyticalDataScreen() {
  return (
    <div className="text-black">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="pl-2 pt-4 text-2xl font-bold flex">
        Analytical channel page
      </div>
      <div className="flex flex-nowrap space-x-3 pt-4 rounded-xl ">
        <div className="w-full py-4 bg-white">
          <ComingSoom />
        </div>
      </div>
    </div>
  );
}

export default AnalyticalDataScreen