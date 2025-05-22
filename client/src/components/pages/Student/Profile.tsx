import {
  Home,
  CalendarDays,
  ClipboardList,
  LogOut,
  Sun,
  Moon,
  User2,
  Edit,
  Save,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState({
    name: "Reben",
    email: "rebenn@example.com",
    role: "SUPER SAIYAN",
    grade: "2ND YEAR",
    subject: "CPE",
    bio: "HAN"
  });

  // Load dark mode setting from localStorage on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setDarkMode(savedMode === "true");
    }
  }, []);

  // Save dark mode setting to localStorage and update body class when changed
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setSaveMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Mock a successful API response - remove this when your real API is ready
      // and uncomment the fetch code below
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Success path - no actual API call
      setIsEditing(false);
      setSaveMessage("Profile updated successfully!");
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveMessage(""), 3000);
      
      /* UNCOMMENT THIS WHEN YOUR API IS READY
      // Replace with your actual API endpoint
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        // Toggle back to view mode
        setIsEditing(false);
        setSaveMessage("Profile updated successfully!");
        
        // Hide success message after 3 seconds
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        // Handle error
        setSaveMessage("Failed to update profile. Please try again.");
      }
      */
      
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveMessage("An error occurred while saving. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}>
      {/* Sidebar */}
      <div className={`w-60 ${darkMode ? "bg-gray-800" : "bg-[#11175D]"} text-white p-6 flex flex-col justify-between`}>
        <div>
          <div className="text-2xl font-bold mb-10">Classto</div>
          <nav className="space-y-6">
            <div
              className="flex items-center gap-4 cursor-pointer hover:text-blue-300"
              onClick={() => navigate("/student-dashboard")}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </div>
            <div
              className="flex items-center gap-4 cursor-pointer hover:text-blue-300"
              onClick={() => navigate("/todo")}
            >
              <ClipboardList size={20} />
              <span>To-Do</span>
            </div>
            <div
              className="flex items-center gap-4 cursor-pointer hover:text-blue-300"
              onClick={() => navigate("/calendar")}
            >
              <CalendarDays size={20} />
              <span>Calendar</span>
            </div>
            <div
              className="flex items-center gap-4 text-blue-300"
              onClick={() => navigate("/profile")}
            >
              <User2 size={20} />
              <span>Profile</span>
            </div>
          </nav>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-4 cursor-pointer hover:text-blue-300">
            <LogOut size={20} />
            <span>Logout</span>
          </div>
          <div 
            className="flex items-center gap-4 cursor-pointer hover:text-blue-300"
            onClick={toggleDarkMode}
          >
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-8 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-[#11175D]"}`}>Profile</h1>
          <div className="flex items-center gap-4">
            {saveMessage && (
              <span className={`text-sm ${saveMessage.includes("success") ? "text-green-500" : "text-red-500"}`}>
                {saveMessage}
              </span>
            )}
            <div className="flex gap-2">
              {isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setSaveMessage("");
                  }}
                  className={`flex items-center gap-2 ${
                    darkMode 
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  } px-4 py-2 rounded-md`}
                >
                  <X size={16} /> Cancel
                </button>
              )}
              <button 
                onClick={isEditing ? handleSave : handleEdit}
                className={`flex items-center gap-2 ${
                  darkMode
                    ? "bg-blue-700 hover:bg-blue-600" 
                    : "bg-[#11175D] hover:bg-blue-700"
                } text-white px-4 py-2 rounded-md`}
                disabled={isSaving}
              >
                {isEditing 
                  ? isSaving 
                    ? <span className="flex items-center gap-2"><span className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></span> Saving...</span>
                    : <><Save size={16} /> Save</> 
                  : <><Edit size={16} /> Edit Profile</>}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-md rounded-lg overflow-hidden`}>
          <div className={`${darkMode ? "bg-gray-700" : "bg-[#11175D]"} h-32`}></div>
          <div className="relative px-6 pb-6">
            <div className="absolute -top-16 left-6">
              <div className={`${
                darkMode ? "bg-gray-600 border-gray-800" : "bg-gray-200 border-white"
              } w-32 h-32 rounded-full flex items-center justify-center border-4 ${
                darkMode ? "text-white" : "text-[#11175D]"
              } text-4xl font-bold`}>
                {userData.name.charAt(0)}
              </div>
            </div>
            
            <div className="pt-20 grid md:grid-cols-2 gap-6">
              <div>
                <h2 className={`text-xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"} mb-6`}>
                  Personal Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Full Name</label>
                    {isEditing ? (
                      <input
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className={`w-full ${
                          darkMode 
                            ? "bg-gray-700 border-gray-600 text-white" 
                            : "bg-white border-gray-300"
                        } border rounded-md px-3 py-2 mt-1`}
                      />
                    ) : (
                      <p className="font-medium">{userData.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Email Address</label>
                    {isEditing ? (
                      <input
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className={`w-full ${
                          darkMode 
                            ? "bg-gray-700 border-gray-600 text-white" 
                            : "bg-white border-gray-300"
                        } border rounded-md px-3 py-2 mt-1`}
                      />
                    ) : (
                      <p className="font-medium">{userData.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Role</label>
                    {isEditing ? (
                      <input
                        name="role"
                        value={userData.role}
                        onChange={handleChange}
                        className={`w-full ${
                          darkMode 
                            ? "bg-gray-700 border-gray-600 text-white" 
                            : "bg-white border-gray-300"
                        } border rounded-md px-3 py-2 mt-1`}
                      />
                    ) : (
                      <p className="font-medium">{userData.role}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className={`text-xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"} mb-6`}>
                  Academic Details
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Grade/Year</label>
                    {isEditing ? (
                      <input
                        name="grade"
                        value={userData.grade}
                        onChange={handleChange}
                        className={`w-full ${
                          darkMode 
                            ? "bg-gray-700 border-gray-600 text-white" 
                            : "bg-white border-gray-300"
                        } border rounded-md px-3 py-2 mt-1`}
                      />
                    ) : (
                      <p className="font-medium">{userData.grade}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Primary Subject</label>
                    {isEditing ? (
                      <input
                        name="subject"
                        value={userData.subject}
                        onChange={handleChange}
                        className={`w-full ${
                          darkMode 
                            ? "bg-gray-700 border-gray-600 text-white" 
                            : "bg-white border-gray-300"
                        } border rounded-md px-3 py-2 mt-1`}
                      />
                    ) : (
                      <p className="font-medium">{userData.subject}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Bio</label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={userData.bio}
                        onChange={handleChange}
                        className={`w-full ${
                          darkMode 
                            ? "bg-gray-700 border-gray-600 text-white" 
                            : "bg-white border-gray-300"
                        } border rounded-md px-3 py-2 mt-1 h-24`}
                      />
                    ) : (
                      <p className="font-medium">{userData.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>      
      </div>
    </div>
  );
};

export default Profile;