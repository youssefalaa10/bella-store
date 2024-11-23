import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/SidebarDash";
import { GiHamburgerMenu } from "react-icons/gi"; // Assuming you have this icon in your project

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-full flex md:flex-row transition-all duration-300">
      {/* Sidebar toggle icon */}
      <GiHamburgerMenu
        onClick={toggleSidebar}
        className="cursor-pointer text-hovermain mt-10 ml-2"
        size={28}
      />

      {/* Sidebar */}
      <div
        className={`bg-white w-0 overflow-hidden transition-all duration-300 md:w-0 ${
          isSidebarOpen ? "w-[250px] md:w-[250px]" : "w-0"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
