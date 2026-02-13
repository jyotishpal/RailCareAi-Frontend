import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function FileComplaint() {
  const navigate = useNavigate();

  // Initial state define ki hai taaki reset karna aasaan ho
  const initialState = {
    pnr: "",
    trainNo: "",
    coach: "",
    seatNo: "",
    description: "",
  };

  const [form, setForm] = useState(initialState);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    // Form fields add kar rahe hain
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    // Files add kar rahe hain
    for (let file of files) {
      formData.append("media", file);
    }

    try {
      await API.post("/complaints/create", formData);
      
      alert("✅ Complaint submitted successfully! Redirecting to tracking...");

      // 1. Sabhi fields ko khali (reset) karna
      setForm(initialState);
      setFiles([]);

      // 2. Track Complaint page par redirect karna
      navigate("/track-complaint");

    } catch (err) {
      console.error(err);
      alert("❌ Error submitting complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Input change handler to keep code clean
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="bg-[#f8faff] min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#1a202c]">File a Complaint</h2>
          <p className="text-gray-500 mt-2">
            Enter your journey details. Our AI will analyze your issue for faster resolution.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Step 1: Journey Details */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <h3 className="text-xl font-bold text-gray-800">Journey Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">PNR Number</label>
                <input
                  type="text"
                  name="pnr"
                  value={form.pnr}
                  placeholder="10-digit PNR"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition bg-gray-50/50"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Train Number</label>
                <input
                  type="text"
                  name="trainNo"
                  value={form.trainNo}
                  placeholder="e.g. 12401"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition bg-gray-50/50"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Coach</label>
                <input
                  type="text"
                  name="coach"
                  value={form.coach}
                  placeholder="e.g. B1 or S4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition bg-gray-50/50"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Seat Number</label>
                <input
                  type="text"
                  name="seatNo"
                  value={form.seatNo}
                  placeholder="e.g. 42"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition bg-gray-50/50"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Step 2: Issue Details */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <h3 className="text-xl font-bold text-gray-800">Describe the Issue</h3>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Complaint Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  placeholder="Explain the problem in detail (e.g., Unclean coach, water issue, etc.)..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition bg-gray-50/50 min-h-[120px]"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Upload Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Evidence (Optional)</label>
                <div className="relative group">
                  <input
                    type="file"
                    multiple
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => setFiles(e.target.files)}
                  />
                  <div className="border-2 border-dashed border-gray-200 rounded-xl py-8 px-4 text-center group-hover:border-blue-400 transition bg-gray-50/30">
                    <span className="text-3xl text-gray-400">📸</span>
                    <p className="text-sm text-gray-500 mt-2 font-medium">
                      {files.length > 0 ? `${files.length} files selected` : "Click or drag photos here"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1a202c] hover:bg-gray-800 text-white active:scale-[0.98]'}`}
          >
            {loading ? "AI is processing your complaint..." : "Submit Complaint"}
            {!loading && <span className="text-xl">🚀</span>}
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default FileComplaint;