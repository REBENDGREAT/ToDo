import {
  Home,
  CalendarDays,
  ClipboardList,
  LogOut,
  Sun,
  Moon,
  User2,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const todoItems = [
    { id: 1, title: "Math Assignment", due: "Today", status: "ongoing" },
    { id: 2, title: "Physics Lab Report", due: "Tomorrow", status: "ongoing" },
    { id: 3, title: "Literature Essay", due: "Yesterday", status: "missing" },
  ];

  const reminders = [
    { id: 1, title: "Group Study Session", time: "3:00 PM Today" },
    { id: 2, title: "Meet Professor Johnson", time: "11:30 AM Tomorrow" },
  ];

  const calendarEvents = [
    { id: 1, title: "Chemistry Quiz", date: "May 21" },
    { id: 2, title: "Club Meeting", date: "May 22" },
  ];

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } transition-colors duration-300`}
    >
      {/* Sidebar */}
      <div
        className={`${
          sidebarCollapsed ? "w-16" : "w-60"
        } ${darkMode ? "bg-gray-800" : "bg-[#11175D]"} text-white p-6 flex flex-col justify-between transition-all duration-300 relative`}
      >
        <div>
          <div
            className={`text-2xl font-bold mb-10 ${
              sidebarCollapsed ? "text-center" : ""
            }`}
          >
            {sidebarCollapsed ? "C" : "Classto"}
          </div>
          <nav className="space-y-6">
            <div
              className="flex items-center gap-4 cursor-pointer hover:text-blue-300 transition-colors"
              onClick={() => navigate("/student-dashboard")}
            >
              <Home size={20} />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </div>
            <div
              className="flex items-center gap-4 cursor-pointer hover:text-blue-300 transition-colors"
              onClick={() => navigate("/todo")}
            >
              <ClipboardList size={20} />
              {!sidebarCollapsed && <span>To-Do</span>}
            </div>
            <div className="flex items-center gap-4 cursor-pointer hover:text-blue-300 transition-colors">
              <CalendarDays size={20} />
              {!sidebarCollapsed && <span>Calendar</span>}
            </div>
            <div className="flex items-center gap-4 cursor-pointer hover:text-blue-300 transition-colors">
              <User2 size={20} />
              {!sidebarCollapsed && <span>Profile</span>}
            </div>
          </nav>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-4 cursor-pointer hover:text-blue-300 transition-colors">
            <LogOut size={20} />
            {!sidebarCollapsed && <span>Logout</span>}
          </div>
          <div
            className="flex items-center gap-4 cursor-pointer hover:text-blue-300 transition-colors"
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            {!sidebarCollapsed && <span>Theme</span>}
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 bg-blue-500 rounded-full p-1 text-white shadow-lg hover:bg-blue-600 transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Main content */}
      <main
        className={`flex-1 p-10 transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="grid grid-cols-2 gap-6">
          {/* To-Do */}
          <div
            className={`${
              darkMode ? "bg-gray-800 text-white" : "bg-[#11175D] text-white"
            } rounded-3xl p-6 shadow-lg transition-colors duration-300`}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <ClipboardList size={20} className="mr-2" />
              To-Do
            </h2>

            <div className="space-y-4">
              <button
                className={`block w-full ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-[#1B237E] hover:bg-[#2A32A0]"
                } py-2 px-4 rounded-xl transition-colors duration-200`}
              >
                Ongoing
              </button>

              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-[#1B237E]"
                } rounded-xl p-4 mt-2`}
              >
                {todoItems
                  .filter((item) => item.status === "ongoing")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-2 text-sm border-b border-gray-600 pb-2"
                    >
                      <span>{item.title}</span>
                      <span className="text-blue-300">{item.due}</span>
                    </div>
                  ))}
              </div>

              <button
                className={`block w-full ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-[#1B237E] hover:bg-[#2A32A0]"
                } py-2 px-4 rounded-xl transition-colors duration-200`}
              >
                Missing
              </button>

              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-[#1B237E]"
                } rounded-xl p-4 mt-2`}
              >
                {todoItems
                  .filter((item) => item.status === "missing")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-2 text-sm border-b border-gray-600 pb-2"
                    >
                      <span>{item.title}</span>
                      <span className="text-red-400">{item.due}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="text-right mt-4 text-sm">
              <button className="text-blue-300 hover:text-blue-100 underline transition-colors cursor-pointer">
                See more...
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div
            className={`${
              darkMode ? "bg-gray-800 text-white" : "bg-[#11175D] text-white"
            } rounded-3xl p-6 shadow-lg transition-colors duration-300`}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <CalendarDays size={20} className="mr-2" />
              Calendar
            </h2>

            <div
              className={`${
                darkMode ? "bg-gray-700" : "bg-[#1B237E]"
              } rounded-xl p-4`}
            >
              <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-full ${
                      i + 1 === 20
                        ? darkMode
                          ? "bg-blue-400"
                          : "bg-blue-500"
                        : ""
                    } cursor-pointer hover:bg-blue-400 transition-colors`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Upcoming Events</h3>
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-[#1B237E]"
                } rounded-xl p-4`}
              >
                {calendarEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex justify-between items-center mb-2 text-sm border-b border-gray-600 pb-2"
                  >
                    <span>{event.title}</span>
                    <span className="text-blue-300">{event.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reminders */}
          <div
            className={`col-span-2 ${
              darkMode ? "bg-gray-800 text-white" : "bg-[#11175D] text-white"
            } rounded-3xl p-6 shadow-lg transition-colors duration-300`}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Bell size={20} className="mr-2" />
              Reminders
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`${
                    darkMode ? "bg-gray-700" : "bg-[#1B237E]"
                  } rounded-xl p-4 transition-colors duration-200`}
                >
                  <h3 className="font-semibold">{reminder.title}</h3>
                  <p className="text-sm text-blue-300 mt-1">{reminder.time}</p>
                </div>
              ))}

              <div
                className={`${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-[#1B237E] hover:bg-[#2A32A0]"
                } rounded-xl p-4 flex items-center justify-center cursor-pointer transition-colors duration-200`}
              >
                <span className="text-blue-300">+ Add Reminder</span>
              </div>
            </div>

            <div className="text-right mt-4 text-sm">
              <button className="text-blue-300 hover:text-blue-100 underline transition-colors cursor-pointer">
                See more...
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
