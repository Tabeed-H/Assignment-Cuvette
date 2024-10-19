import React, { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { getUserInfo } from "../../../API/crudServices";
import { LucideArrowDown } from "lucide-react";
import AddJob from "./sections/AddJob";

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false); // State to control AddJob visibility
  const authUser = useAuthUser();
  const token = useAuthHeader();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo(token, authUser.id);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [authUser, token]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleAddJobClose = () => setShowAddJob(false); // Close AddJob form

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white w-full shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button className="md:hidden" onClick={toggleSidebar}>
            <svg
              className="w-8 h-8 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <img src={logo} alt="Cuvette Logo" className="w-24 h-auto" />
          <div className="relative">
            <button
              className="bg-white text-gray-700 font-bold py-2 px-4 rounded-15 border shadow-md hover:bg-gray-200"
              onClick={toggleMenu}
            >
              <div className="flex">
                {userInfo?.name || "NA"}
                <LucideArrowDown />
              </div>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                <ul className="py-1">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="#" className="text-gray-700">
                      Edit Profile
                    </a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="#" className="text-gray-700">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 w-34 md:w-28 lg:w-26 bg-white shadow-md p-4 h-auto md:h-screen transition-transform duration-300 ease-in-out z-20`}
        >
          <ul>
            <li className="mb-2">
              <a
                href="#"
                className="block py-2 px-4 rounded-md hover:bg-gray-300"
              >
                <svg
                  className="w-6 h-6 inline-block mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l-3.875-3.875M12 15l-3-3m0 0l3-3m-3 3h7.875"
                  ></path>
                </svg>
              </a>
            </li>
            {/* Add more sidebar items here */}
          </ul>
        </aside>

        {/* Content Area */}
        <main className="flex-1  p-6 md:p-8">
          {!showAddJob && (
            <div className="flex justify-end mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg"
                onClick={() => setShowAddJob(true)} // Show AddJob form
              >
                Create Interview
              </button>
            </div>
          )}

          {/* Show AddJob form if showAddJob is true */}
          {showAddJob && <AddJob onClose={handleAddJobClose} />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
