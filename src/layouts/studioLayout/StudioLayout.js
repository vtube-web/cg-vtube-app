import React, { useEffect, useState } from 'react';
import Modal from '../../components/studio/common/modal/Modal';
import NavBar from '../../components/studio/navBar/NavBar';
import SiderBar from '../../components/studio/siderBar/SiderBar';

function StudioLayout({ children }) {
   const [contentHeight, setContentHeight] = useState(0);

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

   return (
     <div className="flex flex-col flex-nowrap">
       <Modal />
       <NavBar />

       <div className="flex flex-row" style={{ height: contentHeight }}>
         <SiderBar />

         <div className="bg-[#FFFFF] col-10">
           <div
             className="flex flex-col overflow-y-scroll mr-1"
             style={{ height: contentHeight }}
           >
           <div>{children}</div>
           </div>
         </div>
       </div>
     </div>
   );
}

export default StudioLayout