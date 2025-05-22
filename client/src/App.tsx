import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import StudentDashboard from './components/pages/Student/StudentDashboard';
import Todo from './components/pages/Student/ToDo';
import Profile from './components/pages/Student/Profile';
import { ThemeProvider } from './components/pages/Student/Theme';
import AdminDashboard from './components/pages/Admin/AdminDashboard';



function App() {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path='/student-dashboard' element={<StudentDashboard />} />
        <Route path='/todo' element={<Todo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
