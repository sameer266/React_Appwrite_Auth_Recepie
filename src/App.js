import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { GetLoginStatusAuth } from './config/auth';
import Dashboard from './pages/Dashboard';

import AddData from './pages/crude_page/AddData';
import DeleteData from './pages/crude_page/DeleteData';
import UpdateData from './pages/crude_page/UpdateData';

// -------loading --------
import { Loading } from './assets/loading/loading';
import Recepies from './pages/Recepies';
import Contact from './pages/Contact';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Check user login status when component mounts
    const fetchUser = async () => {
      setLoading(true); // Start loading
      try {
        const status = await GetLoginStatusAuth(); // returns true or false
        if (status.success) {
          setUser(status.status);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error in getting user status", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchUser();
  }, [navigate]); // The effect runs once when the component is mounted.

  // Show a loading spinner or message while fetching user status
  if (loading) {
    return Loading()  // Replace with a spinner component if available
  }

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Conditional Routes */}
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!user ? <Signup setUser={setUser} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard/add-post/:userId" element={!user ? <Home/>:<AddData/>} />
        <Route path="/dashboard/delete-post" element={!user?<Home/>:<DeleteData/>} />
        <Route path="/dashboard/update-post/:postId" element={!user? <Home/>:<UpdateData/>} />
        <Route path="/recepies" element={<Recepies/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
      <Footer />
    </div>
  );
}


export default App;
