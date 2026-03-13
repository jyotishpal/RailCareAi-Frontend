import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FileComplaint() {

  const navigate = useNavigate();

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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [aiDepartment, setAIDepartment] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    for (let file of files) {
      formData.append("media", file);
    }

    try {

      const res = await API.post("/api/complaints/create", formData, {
        onUploadProgress: (progressEvent) => {

          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          setUploadProgress(percent);
        },
      });

      toast.success("Complaint submitted successfully 🚀");

      setAIDepartment(res.data.department);

      setForm(initialState);
      setFiles([]);

      setTimeout(() => {
        navigate("/track-complaint");
      }, 2000);

    } catch (error) {

      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error. Please try again.");
      }

    } finally {

      setLoading(false);
      setUploadProgress(0);

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="bg-[#f8faff] min-h-screen py-12 px-6">

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#1a202c]">
            File a Complaint
          </h2>
          <p className="text-gray-500 mt-2">
            Enter your journey details. Our AI will analyze your issue for faster resolution.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Journey Info */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">

            <div className="flex items-center gap-3 mb-6">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                1
              </span>
              <h3 className="text-xl font-bold text-gray-800">
                Journey Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                type="text"
                name="pnr"
                value={form.pnr}
                placeholder="10-digit PNR"
                className="input w-full px-4 py-3 rounded-xl border border-gray-200"
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="trainNo"
                value={form.trainNo}
                placeholder="Train Number"
                className="input w-full px-4 py-3 rounded-xl border border-gray-200"
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="coach"
                value={form.coach}
                placeholder="Coach"
                className="input w-full px-4 py-3 rounded-xl border border-gray-200"
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="seatNo"
                value={form.seatNo}
                placeholder="Seat Number"
                className="input w-full px-4 py-3 rounded-xl border border-gray-200"
                onChange={handleChange}
                required
              />

            </div>
          </div>

          {/* Issue Section */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">

            <div className="flex items-center gap-3 mb-6">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </span>
              <h3 className="text-xl font-bold text-gray-800">
                Describe the Issue
              </h3>
            </div>

            <textarea
              name="description"
              value={form.description}
              placeholder="Describe the issue..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200"
              onChange={handleChange}
            />

            {/* Upload */}
            <div className="mt-6">

              <input
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
              />

              {files.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  {files.length} files selected
                </p>
              )}

              {/* Upload Progress */}
              {uploadProgress > 0 && (
                <div className="mt-4">

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>

                  <p className="text-xs mt-1 text-gray-500">
                    Uploading {uploadProgress}%
                  </p>

                </div>
              )}

            </div>

          </div>

          {/* AI Department Preview */}
          {aiDepartment && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl">
              🤖 AI detected department: <b>{aiDepartment}</b>
            </div>
          )}

          {/* Submit Button */}

          <button
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3
            ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#1a202c] hover:bg-gray-800 text-white"
            }`}
          >

            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                AI Processing...
              </>
            ) : (
              <>Submit Complaint 🚀</>
            )}

          </button>

        </form>

      </div>
    </div>
  );
}

export default FileComplaint;