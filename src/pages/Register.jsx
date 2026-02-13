import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="bg-[#f8faff] min-h-screen flex flex-col justify-center py-12 px-6">
      <div className="max-w-lg w-full mx-auto bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#1a202c]">Join RailCare AI</h2>
          <p className="text-gray-500 mt-2">Create your account to start filing complaints</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["name", "email", "phone", "password"].map((field) => (
            <div key={field} className="col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{field}</label>
              <input
                type={field === "password" ? "password" : "text"}
                placeholder={`Your ${field}`}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                required
              />
            </div>
          ))}

          <div className="md:col-span-2 mt-4">
            <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
              Register Now
            </button>
          </div>
        </form>

        <p className="text-center mt-8 text-gray-500">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold no-underline hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
export default Register;