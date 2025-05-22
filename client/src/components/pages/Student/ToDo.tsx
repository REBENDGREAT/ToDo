import {
  Home,
  CalendarDays,
  ClipboardList,
  LogOut,
  Sun,
  Moon,
  User2,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  deadline: string;
  status: string;
}

const Todo: React.FC = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("Ongoing");
  const tabs = ["Ongoing", "Missing", "Done"];
  const [darkMode, setDarkMode] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    date: "",
    time: ""
  });
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Math Assignment", deadline: "Today at 11:59 PM", status: "Ongoing" },
    { id: 2, title: "Physics Lab Report", deadline: "Tomorrow at 5:00 PM", status: "Ongoing" },
    { id: 3, title: "Literature Essay", deadline: "Yesterday at 11:59 PM", status: "Missing" },
    { id: 4, title: "History Project", deadline: "May 15 at 3:00 PM", status: "Done" }
  ]);

  // Check system preference on initial load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const deadline = `${newTask.date} ${newTask.time ? 'at ' + newTask.time : ''}`;
      const task: Task = {
        id: tasks.length + 1,
        title: newTask.title,
        deadline: deadline.trim() ? deadline : "No deadline",
        status: "Ongoing"
      };
      
      setTasks([...tasks, task]);
      setNewTask({ title: "", date: "", time: "" });
      setShowAddTask(false);
    }
  };

  const filteredTasks = tasks.filter(task => task.status === currentTab);

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-60'} ${darkMode ? 'bg-gray-800' : 'bg-[#11175D]'} text-white p-6 flex flex-col justify-between transition-all duration-300 relative`}>
        <div>
          <div className={`text-2xl font-bold mb-10 ${sidebarCollapsed ? 'text-center' : ''}`}>
            {sidebarCollapsed ? 'C' : 'Classto'}
          </div>
          <nav className="space-y-6">
            <div
              className="flex items-center gap-4 cursor-pointer hover:text-blue-300 transition-colors"
              onClick={() => navigate("/student-dashboard")}
            >
              <Home size={20} />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </div>
            <div className="flex items-center gap-4 cursor-pointer hover:text-blue-300 transition-colors text-blue-300">
              <ClipboardList size={20} />
              {!sidebarCollapsed && <span>To-Do</span>}
            </div>
            <div 
              className="flex items-center gap-4 cursor-pointer hover:text-blue-300 transition-colors"
              onClick={() => navigate("/calendar")}
            >
              <CalendarDays size={20} />
              {!sidebarCollapsed && <span>Calendar</span>}
            </div>
            <div
              className="flex items-center gap-4 cursor-pointer hover:text-blue-300 transition-colors"
              onClick={() => navigate("/profile")}
            >
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

      {/* Main Content */}
      <div className={`flex-1 p-8 ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">To-Do Lists</h2>
          <button 
            className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#11175D] hover:bg-[#1B237E]'} text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200`}
            onClick={() => setShowAddTask(true)}
          >
            <Plus size={18} />
            <span>To-do</span>
          </button>
        </div>

        {/* Tabs */}
        <div className={`flex gap-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b mb-6`}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`py-2 px-4 border-b-2 transition-colors duration-200 ${
                currentTab === tab
                  ? darkMode 
                    ? "border-blue-500 text-blue-400 font-semibold" 
                    : "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          <p className="text-lg mb-4">
            Showing tasks for: <strong>{currentTab}</strong>
          </p>
          
          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <div 
                  key={task.id} 
                  className={`${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } border rounded-lg p-4 flex justify-between items-center shadow-sm transition-colors duration-300`}
                >
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Due: {task.deadline}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-2 rounded-full transition-colors duration-200`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-500'} p-8 text-center rounded-lg transition-colors duration-300`}>
                No {currentTab.toLowerCase()} tasks found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-[#8A90E2]'} rounded-lg p-6 w-full max-w-md transition-colors duration-300`}>
            <h2 className="text-xl font-bold mb-4 text-white">Add task</h2>
            
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              placeholder="Enter to-do"
              className="w-full p-3 rounded-lg mb-4 bg-white text-gray-800"
            />
            
            <div className="mb-4">
              <label className="block text-white mb-2">Deadline</label>
              <div className="flex gap-4">
                <input
                  type="date"
                  value={newTask.date}
                  onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white text-gray-800"
                  placeholder="Select Date"
                />
                <input
                  type="time"
                  value={newTask.time}
                  onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white text-gray-800"
                  placeholder="Select Time"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <button 
                className="px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                onClick={() => setShowAddTask(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                onClick={handleAddTask}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;