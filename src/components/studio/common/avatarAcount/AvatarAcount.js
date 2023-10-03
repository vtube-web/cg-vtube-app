import React, { useState } from 'react'

function AvatarAcount() {
  const [mouseAvatar, setMouseAvatar] = useState(false);

  return (
    <>
      <img
        className="w-9 h-9 border rounded-full flex-none hover:cursor-pointer"
        src="https://antimatter.vn/wp-content/uploads/2022/11/hinh-anh-gai-xinh-trung-quoc.jpg"
        alt="avatar"
      />
      {mouseAvatar == false ? (
        <></>
      ) : (
        <div className="absolute z-10 top-[70px] whitespace-nowrap left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#7D7C7C] text-white px-2 py-1 text-[10px]">
          Acount
        </div>
      )}
    </>
  );
}

export default AvatarAcount