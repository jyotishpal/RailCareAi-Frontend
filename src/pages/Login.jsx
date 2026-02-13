import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      login(data);
      if (data.user.role === "admin") navigate("/admin");
      else if (data.user.role === "superadmin") navigate("/superadmin");
      else navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="bg-[#f8faff] min-h-[90vh] flex flex-col justify-center py-12 px-6">
      <div className="max-w-md w-full mx-auto bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#1a202c]">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to your RailCare AI account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button className="w-full bg-[#1a202c] text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg mt-4">
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500">
          New user? <Link to="/register" className="text-blue-600 font-bold no-underline hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;