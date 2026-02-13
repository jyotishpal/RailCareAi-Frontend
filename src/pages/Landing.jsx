import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Landing() {
  const { t, i18n } = useTranslation();
  return (
    <div className="bg-[#f8faff] min-h-screen font-sans">
      {/* 1. Hero Section */}
      <section className="pt-16 pb-8 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#1a202c] mb-4 tracking-tight">
            
            {t("WelcometoRailMadad")}
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            AI powered railway complaint management system. Smart, fast, and transparent 
            grievance redressal for a better journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/file-complaint" className="bg-[#1a202c] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg no-underline">
              
              {t("fileComplaint")}
            </Link>
            <Link to="/track-complaint" className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-3.5 rounded-xl font-bold hover:border-blue-600 hover:text-blue-600 transition no-underline">
             {t("complaintStatus")} 
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Key Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-center gap-4 mb-8">
           <div className="h-[1px] w-12 bg-gray-200"></div>
           <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest text-center">Key Features</h2>
           <div className="h-[1px] w-12 bg-gray-200"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard emoji="🤖" title="AI Categorization" desc="Complaints are auto categorized using AI for faster department routing." />
          <FeatureCard emoji="📡" title="Real Time Updates" desc="Track complaint status live with automated notification alerts." />
          <FeatureCard emoji="🌍" title="Multilingual Support" desc="Support in multiple Indian languages for inclusive accessibility." />
        </div>
      </section>

      {/* 3. How It Works Section - ISKO TIGHT KIYA HAI */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">How It Works</h2>
        
        <div className="relative">
          {/* Background Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-100 -z-10"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <StepCard num="1" title="File Complaint" desc="User submits issue with details" />
            <StepCard num="2" title="AI Processing" desc="NLP model analyzes & tags issue" />
            <StepCard num="3" title="Dept. Assignment" desc="Auto-routed to correct department" />
            <StepCard num="4" title="Resolution" desc="Status updated in real-time" />
          </div>
        </div>
      </section>
    </div>
  );
}

// Sub-components to keep code clean
const FeatureCard = ({ emoji, title, desc }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
    <div className="text-3xl mb-3">{emoji}</div>
    <h3 className="text-lg font-bold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const StepCard = ({ num, title, desc }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:border-blue-200 transition group">
    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3 shadow-md shadow-blue-100 group-hover:scale-110 transition-transform">
      {num}
    </div>
    <h4 className="font-bold text-gray-800 mb-1">{title}</h4>
    <p className="text-xs text-gray-400 leading-tight">{desc}</p>
  </div>
);

export default Landing;