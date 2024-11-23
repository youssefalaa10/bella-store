/* eslint-disable no-unused-vars */
// Sidebar.js
import { NavLink, Link, useNavigate } from "react-router-dom";
import { CiUser, CiSettings } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { logoutUser } from "../../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { CgSmartHomeHeat } from "react-icons/cg";

function SidebarDash() {
  const [activeLink, setActiveLink] = useState("productsdash");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="w-[100%]  p-5 relative h-[100vh]">
      <div className="flex justify-center gap-2 mb-8">
        {/* <CgSmartHomeHeat className="text-mainColor mt-1" size={28} /> */}
        <h2 className="text-3xl text-mainColor justify-center flex font-semibold">
          BELLA
        </h2>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {/* <NavLink
            to="/profileUser/"
            className={`ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full ${
              activeLink === "userInfo"
                ? "bg-mainColor text-white"
                : "hover:bg-mainColor hover:text-white"
            } p-2 rounded-md`}
            onClick={() => setActiveLink("userInfo")}
          >
            <CiSettings size={20} />
            Dashboard
          </NavLink> */}

        <NavLink
          to="/dashboard/productsDash"
          className={`ml-1 text-mainColor font-montserrat transition-colors flex gap-2 items-center w-full ${
            activeLink === "productsdash"
              ? "bg-mainColor text-white"
              : "hover:bg-mainColor hover:text-white"
          } p-2 rounded-md`}
          onClick={() => setActiveLink("productsdash")}
        >
          <HiOutlineShoppingBag />
          Products
        </NavLink>
        <NavLink
          to="/dashboard/users"
          className={`ml-1  text-mainColor  font-montserrat transition-colors flex gap-2 items-center w-full ${
            activeLink === "users"
              ? "bg-mainColor text-white"
              : "hover:bg-mainColor hover:text-white"
          } p-2 rounded-md`}
          onClick={() => setActiveLink("users")}
        >
          <CiUser size={20} />
          Users
        </NavLink>
        <NavLink
          to="/dashboard/orders"
          className={`ml-1  text-mainColor  font-montserrat transition-colors flex gap-2 items-center w-full ${
            activeLink === "orders"
              ? "bg-mainColor text-white"
              : "hover:bg-mainColor hover:text-white"
          } p-2 rounded-md`}
          onClick={() => setActiveLink("orders")}
        >
          <CiUser size={20} />
          Orders
        </NavLink>
      </div>

      <div className="mt-8 flex items-center font-montserrat text-gray-700 hover:text-red-600 cursor-pointer absolute bottom-2 w-full text-center ">
        <FaSignOutAlt />
        <Link onClick={logOut} className=" m-3 text-titleColor">
          LogOut
        </Link>
      </div>
    </div>
  );
}

export default SidebarDash;
