import { useState } from 'react';
import { Search, User, Moon, Sun, } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  
  const students = [
    { id: 1, name: 'Ashley Pasco', lastLogin: '2 days ago', tasksCreated: 8, tasksCompleted: 5 },
    { id: 2, name: 'Raven Hernandez', lastLogin: '5 days ago', tasksCreated: 5, tasksCompleted: 3 },
    { id: 3, name: 'Ivan Kirk Gamit', lastLogin: '6 days ago', tasksCreated: 6, tasksCompleted: 5 },
  ];

  const weeklyData = [
    { name: 'Mon', value: 4 },
    { name: 'Tue', value: 3 },
    { name: 'Wed', value: 6 },
    { name: 'Thu', value: 2 },
    { name: 'Fri', value: 5 },
  ];

  const tabs = ['Overview', 'Student Management', 'To-Do Monitor', 'Scheduler'];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderOverview = () => (
    <>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Total Students</h2>
          <p className="text-4xl font-bold mt-2">3</p>
        </div>
        <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Task Created</h2>
          <p className="text-4xl font-bold mt-2">19</p>
        </div>
      </div>

      {/* Chart */}
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Weekly Activity</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: darkMode ? '#d1d5db' : '#4b5563' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: darkMode ? '#d1d5db' : '#4b5563' }}
              />
              <Bar dataKey="value" fill="#5d66bc" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );

  const renderStudentManagement = () => (
    <>
      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search students by name or ID"
          className={`w-full p-3 pl-4 pr-10 border rounded-lg ${
            darkMode 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Search size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
        </div>
      </div>

      {/* Students List */}
      <div className="space-y-4">
        {students.map((student) => (
          <div 
            key={student.id} 
            className={`rounded-lg p-4 flex justify-between items-center shadow ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <div>
              <h3 className="font-bold text-lg">{student.name}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Last login: {student.lastLogin}
              </p>
            </div>
            <button className={`px-4 py-2 rounded-lg border ${
              darkMode 
                ? 'border-indigo-400 text-indigo-400 hover:bg-indigo-900' 
                : 'border-indigo-700 text-indigo-700 hover:bg-indigo-50'
            }`}>
              View profile
            </button>
          </div>
        ))}
      </div>
    </>
  );
  
  const renderToDoMonitor = () => (
    <div className="space-y-4">
      {students.map((student) => (
        <div 
          key={student.id} 
          className={`rounded-lg p-4 flex justify-between items-center shadow ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div>
            <h3 className="font-bold text-lg">{student.name}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Created {student.tasksCreated} tasks
            </p>
          </div>
          <div className="font-bold text-lg text-indigo-700">
            {student.tasksCompleted}/{student.tasksCreated}
          </div>
        </div>
      ))}
    </div>
  );
  
  const renderScheduler = () => (
    <div className="grid grid-cols-1 gap-6">
      <div className={`p-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-bold mb-4">Announcement</h2>
        <div className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className="text-gray-500 italic">No announcements yet</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <header className="bg-indigo-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">ClassTo</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-indigo-800"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="p-2 rounded-full hover:bg-indigo-800">
            <User size={20} />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
        
        {/* Navigation Tabs */}
        <div className={`rounded-lg mb-6 flex p-1 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 px-4 rounded-md transition ${
                activeTab === tab 
                  ? darkMode 
                    ? 'bg-indigo-900 text-white' 
                    : 'bg-indigo-100 text-indigo-800'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Overview' && renderOverview()}
        {activeTab === 'Student Management' && renderStudentManagement()}
        {activeTab === 'To-Do Monitor' && renderToDoMonitor()}
        {activeTab === 'Scheduler' && renderScheduler()}
      </main>
    </div>
  );
}