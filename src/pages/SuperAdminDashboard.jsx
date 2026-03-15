import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

function SuperAdminDashboard() {

  const [processingId, setProcessingId] = useState(null);
  const [showEscalated, setShowEscalated] = useState(false);
  const [escalatedComplaints, setEscalatedComplaints] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState("All");
  const [regionData, setRegionData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [resolutionData, setResolutionData] = useState([]);

  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    region: "",
  });

  useEffect(() => {
    fetchAnalytics();
  }, [selectedRegion]);

  const fetchAnalytics = async () => {
    const region = await API.get(
      `/api/superadmin/analytics/region?region=${selectedRegion}`
    );

    const department = await API.get(
      `/api/superadmin/analytics/department?region=${selectedRegion}`
    );

    const priority = await API.get(
      `/api/superadmin/analytics/priority?region=${selectedRegion}`
    );

    const resolution = await API.get(
      `/api/superadmin/analytics/resolution-time?region=${selectedRegion}`
    );

    setRegionData(region.data);
    setDepartmentData(department.data);
    setPriorityData(priority.data);
    setResolutionData(resolution.data);
  };

  const createAdmin = async () => {
    try {
      await API.post("/api/superadmin/create-admin", adminForm);
      alert("Admin Created Successfully");
      setAdminForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        region: "",
      });
    } catch (err) {
      alert("Error creating admin");
    }
  };

  const handleReceive = async (id) => {
    try {
      setProcessingId(id);

      await API.put(`/api/superadmin/receive/${id}`);

      setEscalatedComplaints(prev =>
        prev.map(c =>
          c.complaintId === id
            ? { ...c, superAdminStatus: "Received" }
            : c
        )
      );

    } catch (err) {
      alert("Error receiving complaint");
    } finally {
      setProcessingId(null);
    }
  };

  const handleSolve = async (id) => {
    try {
      setProcessingId(id);

      await API.put(`/api/superadmin/solve/${id}`);

      // Remove from escalated list after solve
      setEscalatedComplaints(prev =>
        prev.filter(c => c.complaintId !== id)
      );

    } catch (err) {
      alert("Error solving complaint");
    } finally {
      setProcessingId(null);
    }
  };

  const avgTime =
    resolutionData.length > 0
      ? resolutionData[0].avgTime.toFixed(2)
      : 0;

  return (
    <div className="p-6">

      {/* Escalated Button */}
      <button
        className="bg-red-600 text-white px-4 py-2 rounded mb-6"
        onClick={async () => {
          const { data } = await API.get("/api/superadmin/escalated");
          setEscalatedComplaints(data);
          setShowEscalated(true);
        }}
      >
        🚨 Escalated Complaints
      </button>

      {/* Create Admin */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h4 className="font-bold mb-4">Create Region Admin</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["name", "email", "phone", "password", "region"].map((field) => (
            <input
              key={field}
              placeholder={field}
              className="border p-2 rounded"
              value={adminForm[field]}
              onChange={(e) =>
                setAdminForm({ ...adminForm, [field]: e.target.value })
              }
            />
          ))}
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
          onClick={createAdmin}
        >
          Create Admin
        </button>
      </div>

      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        Super Admin Analytics
      </h2>

      {/* Region Filter */}
      <select
        className="border p-2 mb-4 rounded"
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        <option value="All">All Regions</option>
        <option value="Northern Railway">Northern Railway</option>
        <option value="Eastern Railway">Eastern Railway</option>
        <option value="Western Railway">Western Railway</option>
        <option value="Southern Railway">Southern Railway</option>
      </select>

      {/* Avg Resolution */}
      <div className="bg-indigo-500 text-white p-4 rounded-xl shadow mb-6 w-64">
        <h4>Avg Resolution Time</h4>
        <p className="text-2xl font-bold">{avgTime} mins</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Region Pie */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h4 className="mb-4 font-semibold">Region Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={regionData} dataKey="count" nameKey="_id" outerRadius={100}>
                {regionData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Department Bar */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h4 className="mb-4 font-semibold">Department Complaints</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Pie */}
        <div className="bg-white p-4 rounded-xl shadow md:col-span-2">
          <h4 className="mb-4 font-semibold">Priority Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={priorityData} dataKey="count" nameKey="_id" outerRadius={120}>
                {priorityData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Escalated Modal */}
      {showEscalated && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-3/4 p-6 rounded-xl overflow-y-auto max-h-[80vh]">

            <h3 className="text-2xl font-bold text-red-600 mb-4">
              Escalated Complaints
            </h3>

            {escalatedComplaints.length === 0 && (
              <p>No escalated complaints.</p>
            )}

            {escalatedComplaints.map((complaint) => (
              <div key={complaint._id} className="border p-4 mb-4 rounded">

                <p><strong>ID:</strong> {complaint.complaintId}</p>
                <p><strong>Status:</strong> {complaint.superAdminStatus}</p>
                <p><strong>Description:</strong> {complaint.description}</p>

                {complaint.superAdminStatus === "Pending" && (
                  <button
                    className="btn btn-primary me-2"
                    disabled={processingId === complaint.complaintId}
                    onClick={() => handleReceive(complaint.complaintId)}
                  >
                    {processingId === complaint.complaintId
                      ? "Processing..."
                      : "Receive"}
                  </button>
                )}

                {complaint.superAdminStatus === "Received" && (
                  <button
                    className="btn btn-success"
                    disabled={processingId === complaint.complaintId}
                    onClick={() => handleSolve(complaint.complaintId)}
                  >
                    {processingId === complaint.complaintId
                      ? "Processing..."
                      : "Solve"}
                  </button>
                )}

              </div>
            ))}

            <button
              className="btn btn-secondary mt-4"
              onClick={() => setShowEscalated(false)}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default SuperAdminDashboard;
