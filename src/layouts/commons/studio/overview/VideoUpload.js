import React from 'react'
import { Link } from 'react-router-dom';

function VideoUpload({data}) {
  return (
    <div className="w-[40%] p-2 ">
      <div className="bg-gray-100 rounded-lg ">
        <video
          className="rounded-t-lg h-[430px] w-full"
          src={data.videoUrl}
          controls
        />
        <div className="p-3">
          <div className="text-xs text-gray-500">video link</div>
          <Link to={`/watching/${data.id}`} className="text-blue-700 truncate block">
            {new URL(window.location.href).origin}/watching/{data.id}
          </Link>
          <div className="text-xs mt-2 text-gray-500">File name</div>
          <div className="text-md font-medium block truncate">
           {data.title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoUpload