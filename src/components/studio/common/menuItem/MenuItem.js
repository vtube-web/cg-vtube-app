import React from 'react'
import { NavLink,useMatch } from "react-router-dom";
function MenuItem({to,label,icon}) {
    const match = useMatch({
        path: to,
        exact:true
    });  
    const isActive = match !== null;
  return (
    <NavLink
      to={to}
      className={
        isActive
          ? "border-red-500 text-red-500 py-3 flex space-x-6 items-center border-l-4 bg-gray-100"
          : "py-3 flex space-x-6 items-center pl-1 hover:bg-gray-100"
      }
    >
      {icon}
      <div className="col-auto font-[550]">{label}</div>
    </NavLink>
  );
}

export default MenuItem