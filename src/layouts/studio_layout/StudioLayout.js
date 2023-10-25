import React, { useEffect, useState } from "react";
import Modal from "../../components/studio/common/modal/Modal";
import NavBar from "../commons/studio/navbar/NavBar";
import SideBar from "../commons/studio/sidebar/SideBar";
import {
  setIsModalSearch,
  setIsModalMenu,
  getIsModalSearch,
  getIsModalMenu,
  getIsModalUpload,
  setIsModalUpload,
} from "../../features/studio/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsVisibilityMenu } from "../../features/studio/visibilitySlice";
import {getStoredUserData} from "../../services/accountService";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";


function StudioLayout({ children }) {
  const navigate = useNavigate();

  const [contentHeight, setContentHeight] = useState(0);

  const isModalSearch = useSelector(getIsModalSearch);
  const isModalMenu = useSelector(getIsModalMenu);
  const isModalUpload = useSelector(getIsModalUpload);

  const dispatch = useDispatch();

  useEffect(() => {
    const calculateSidebarHeight = () => {
      setContentHeight(window.innerHeight - 68);
    };

    calculateSidebarHeight();
    window.addEventListener("resize", calculateSidebarHeight);

    return () => {
      window.removeEventListener("resize", calculateSidebarHeight);
    };
  }, []);

  if (getStoredUserData() == null) {
     Swal.fire({
       icon: "warning",
       title: "warning !",
       text: "You are not logged in, please log in!",
     });
     navigate("/login");
    return null;
  }

  return (
    <div className="flex flex-col flex-nowrap relative h-screen bg-[#FAFAFA]">
      
      <Modal
        isModal={isModalSearch}
        onClose={() => dispatch(setIsModalSearch(false))}
      />
      <Modal
        isModal={isModalMenu}
        onClose={() => {
          dispatch(setIsModalMenu(false));
          dispatch(setIsVisibilityMenu(true));
        }}
      />
      <Modal
        isModal={isModalUpload}
        onClose={() => {
          dispatch(setIsModalUpload(false));
        }}
      />

      <NavBar isModalMenu={isModalMenu} />

      <div
        className={`flex flex-row flex-nowrap  space-x-7 `}
        style={{ height: contentHeight }}
      >
        <SideBar contentHeight={contentHeight} />

        <div className="bg-[#FAFAFA] grow">
          <div
            className="flex flex-col overflow-y-scroll mr-1 grow flex-none overflow-x-scroll"
            style={{ height: contentHeight }}
          >
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudioLayout;
