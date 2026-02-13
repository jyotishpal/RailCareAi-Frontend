import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#1a202c] text-white pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          
          {/* Column 1: Brand & AI Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <span className="text-xl">🚂</span>
              </div>
              <span className="font-bold text-2xl tracking-tight">
                RailCare<span className="text-blue-500">AI</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Leveraging Artificial Intelligence to transform passenger grievance 
              redressal into a seamless, fast, and transparent experience.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Navigation</h4>
            <ul className="space-y-2 list-none p-0 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition no-underline">Home</Link></li>
              <li><Link to="/file-complaint" className="hover:text-blue-400 transition no-underline">File Complaint</Link></li>
              <li><Link to="/track-complaint" className="hover:text-blue-400 transition no-underline">Track Status</Link></li>
            </ul>
          </div>

          {/* Column 3: Important Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Official Links</h4>
            <ul className="space-y-2 list-none p-0 text-gray-400 text-sm">
              <li className="hover:text-blue-400 cursor-pointer">RailMadad Portal</li>
              <li className="hover:text-blue-400 cursor-pointer">Indian Railways</li>
              <li className="hover:text-blue-400 cursor-pointer">IRCTC Official</li>
              <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Column 4: Contact & Help */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Emergency Help</h4>
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <p className="text-xs text-gray-500 uppercase font-bold mb-1">Security/Medical Helpline</p>
              <p className="text-2xl font-black text-blue-500">9999 0000 8888</p>
              <p className="text-xs text-gray-400 mt-2 italic">Available 24/7 for passenger support</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © 2026 Ministry of Railways. Developed as a Final Year Academic Project.
          </p>
          <div className="flex gap-4">
            {/* Simple Social Icons/Placeholders */}
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">
              <span className="text-xs font-bold">𝕏</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">
              <span className="text-xs font-bold">f</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;