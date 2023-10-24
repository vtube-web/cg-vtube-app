import React from 'react';
import { ToastContainer } from 'react-toastify';
import ProfileChannel from '../../layouts/commons/studio/customize/ProfileChannel';
import ImgChannel from '../../layouts/commons/studio/customize/ImgChannel';

function CustomizeChannelsScreen() {
  return (
    <div className="text-black w-full">
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

      <>
        <div className="pl-6 pt-4 text-2xl font-bold flex">
          Customize channel
        </div>

        <div className="flex flex-nowrap justify-between items-start  py-4 bg-white rounded-lg mt-2">
          <div className="px-4 py-2 w-1/2 border-r-[1px]">
            <ProfileChannel />
          </div>
          <div className="px-4 py-2 w-1/2">
            <ImgChannel />
          </div>
        </div>
      </>
    </div>
  );
}

export default CustomizeChannelsScreen;