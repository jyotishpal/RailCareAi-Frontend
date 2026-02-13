import { useEffect, useState } from "react";
import API from "../api/axios";

function TrackComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchComplaints();
    // Har minute time update karenge taki button active ho jaye automatically
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const fetchComplaints = async () => {
    try {
      const { data } = await API.get("/complaints/my");
      setComplaints(data);
    } catch (err) {
      console.error("Error fetching complaints", err);
    }
  };

  const escalateComplaint = async (complaintId) => {
    try {
      await API.put("/complaints/escalate", { complaintId });
      alert("🚀 Escalated to Super Admin successfully!");
      fetchComplaints();
    } catch (err) {
      alert("Failed to escalate");
    }
  };

  // Helper logic for escalation timer (30 minutes)
  const getEscalationStatus = (createdAt) => {
    const createdDate = new Date(createdAt);
    const diffInMinutes = Math.floor((currentTime - createdDate) / 60000);
    const remains = 30 - diffInMinutes;
    return { isReady: remains <= 0, minutesLeft: remains };
  };

  return (
    <div className="bg-[#f8faff] min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#1a202c]">My Complaints</h2>
          <p className="text-gray-500 mt-2">Monitor your grievance status and AI-driven resolution timeline.</p>
        </div>

        {complaints.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center shadow-sm border border-gray-100">
            <span className="text-5xl">📂</span>
            <p className="text-gray-500 mt-4 font-medium">No complaints found in your history.</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {complaints.map((complaint) => {
              const { isReady, minutesLeft } = getEscalationStatus(complaint.createdAt);
              
              return (
                <div key={complaint._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                  {/* Top Header Section */}
                  <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-50 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          ID: {complaint.complaintId}
                        </span>
                        <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                          complaint.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'
                        }`}>
                          {complaint.priority} Priority
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">PNR: {complaint.pnr}</h3>
                      <p className="text-sm text-gray-400 font-medium">Department: <span className="text-gray-700">{complaint.department}</span></p>
                    </div>

                    <div className={`px-4 py-2 rounded-xl font-bold text-sm shadow-sm ${
                      complaint.status === "Closed" ? "bg-green-100 text-green-700" :
                      complaint.status === "In Progress" ? "bg-yellow-100 text-yellow-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      ● {complaint.status}
                    </div>
                  </div>

                  {/* Timeline Section */}
                  <div className="p-6 md:p-8 bg-gray-50/30">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Resolution Journey</h4>
                    <div className="relative pl-6 border-l-2 border-blue-100 space-y-8">
                      {complaint.timeline.map((event, index) => (
                        <div key={index} className="relative">
                          {/* Dot */}
                          <div className={`absolute -left-[31px] w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                            index === 0 ? "bg-blue-600" : "bg-blue-200"
                          }`}></div>
                          <div>
                            <p className="text-sm font-bold text-gray-800">{event.status}</p>
                            <p className="text-xs text-gray-400">{new Date(event.timestamp).toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Footer */}
                    {complaint.status !== "Closed" && (
                      <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                        {!isReady ? (
                          <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg font-medium">
                            ⏱️ Escalation will be available in {minutesLeft} minutes
                          </p>
                        ) : (
                          <p className="text-xs text-green-600 font-medium">✓ Ready for escalation if unresolved</p>
                        )}
                        
                        <button
                          disabled={!isReady}
                          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
                            isReady 
                            ? "bg-[#1a202c] text-white hover:bg-gray-800 active:scale-95" 
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                          onClick={() => escalateComplaint(complaint.complaintId)}
                        >
                          Escalate to Super Admin
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackComplaint;