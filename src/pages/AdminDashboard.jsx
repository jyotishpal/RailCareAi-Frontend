import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedComplaint, setSelectedComplaint] = useState(null);


  const fetchComplaints = async () => {
    const { data } = await API.get("/admin/complaints");
    setComplaints(data);
  };
  const updateStatus = async (id, status) => {
  await API.put(`/admin/update/${id}`, {
    status,
    note: status,
  });
  fetchComplaints();
};


  useEffect(() => {
    fetchComplaints();
    const interval = setInterval(() => {
    fetchComplaints();
  }, 10000);

  return () => clearInterval(interval);
  }, []);

  const acceptComplaint = async (id) => {
    await API.put(`/admin/accept/${id}`);
    fetchComplaints();
  };

  const closeComplaint = async (id) => {
    await API.put(`/admin/close/${id}`);
    fetchComplaints();
  };

  const filteredComplaints =
    filter === "All"
      ? complaints
      : complaints.filter(c => c.department === filter);

  return (
    
    <div className="p-6">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">
        Admin Dashboard
      </h2>
        {/* Summary Cards */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

  <div className="bg-blue-500 text-white p-4 rounded-xl shadow">
    <h4>Total</h4>
    <p className="text-2xl font-bold">{complaints.length}</p>
  </div>

  <div className="bg-yellow-500 text-white p-4 rounded-xl shadow">
    <h4>In Progress</h4>
    <p className="text-2xl font-bold">
      {complaints.filter(c => c.status === "In Progress").length}
    </p>
  </div>

  <div className="bg-red-500 text-white p-4 rounded-xl shadow">
    <h4>Emergency</h4>
    <p className="text-2xl font-bold">
      {complaints.filter(c => c.priority === "Emergency").length}
    </p>
  </div>

  <div className="bg-green-500 text-white p-4 rounded-xl shadow">
    <h4>Closed</h4>
    <p className="text-2xl font-bold">
      {complaints.filter(c => c.status === "Closed").length}
    </p>
  </div>

</div>

      

      {/* Filter Dropdown */}
      <div className="mb-4">
        <select
          className="border p-2 rounded"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Medical">Medical</option>
          <option value="Security">Security</option>
          <option value="Technical">Technical</option>
          <option value="Catering">Catering</option>
          <option value="General">General</option>
        </select>
      </div>

      {/* Complaint Table */}
      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>PNR</th>
              <th>Department</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr key={complaint._id}   className={
    complaint.priority === "Emergency"
      ? "table-danger"
      : ""
  }>
                <td>{complaint.complaintId}</td>
                <td>{complaint.pnr}</td>
                <td>{complaint.department}</td>
                <td>
                  <span className={`badge ${
                    complaint.priority === "Emergency"
                      ? "bg-danger"
                      : complaint.priority === "Medium"
                      ? "bg-warning"
                      : "bg-success"
                  }`}>
                    {complaint.priority}
                  </span>
                </td>
                <td>{complaint.status}</td>
                <td>
                  {complaint.status === "Submitted" && (
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() =>
                        acceptComplaint(complaint.complaintId)
                      }
                    >
                      Accept
                    </button>
                  )}
                  <button
  className="btn btn-sm btn-info me-2"
  onClick={() => setSelectedComplaint(complaint)}
>
  View
</button>

                  {complaint.status !== "Closed" && (
                    <select
  className="form-select form-select-sm"
  onChange={(e) =>
    updateStatus(complaint.complaintId, e.target.value)
  }
>
  <option value="">Update</option>
  <option value="In Progress">In Progress</option>
  <option value="Escalated">Escalated</option>
  <option value="Closed">Closed</option>
</select>

                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedComplaint && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-xl w-1/2">
      <h3 className="text-xl font-bold mb-4">
        Complaint Details
      </h3>

      <p><strong>ID:</strong> {selectedComplaint.complaintId}</p>
      <p><strong>Description:</strong> {selectedComplaint.description}</p>
      <p><strong>PNR:</strong> {selectedComplaint.pnr}</p>
      <p><strong>Status:</strong> {selectedComplaint.status}</p>

      <button
        className="btn btn-danger mt-4"
        onClick={() => setSelectedComplaint(null)}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}


export default AdminDashboard;
