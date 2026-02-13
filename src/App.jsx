import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FileComplaint from "./pages/FileComplaint";
import TrackComplaint from "./pages/TrackComplaint";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/file-complaint"
  element={
    <ProtectedRoute>
      <FileComplaint />
    </ProtectedRoute>
  }
/>
<Route
  path="/track-complaint"
  element={
    <ProtectedRoute>
      <TrackComplaint />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/superadmin"
  element={
    <ProtectedRoute role="superadmin">
      <SuperAdminDashboard />
    </ProtectedRoute>
  }
/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
