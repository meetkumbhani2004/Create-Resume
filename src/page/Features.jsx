import React from "react";
import { BarChart, ShieldCheck, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 bg-gradient-to-b from-white to-purple-50 text-gray-800 pt-20" id="features">
      {/* Header */}
      <div className="text-center mb-12 px-2">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium text-xs sm:text-sm mb-3">
          ⚡ Simple Process
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Build your resume
        </h1>
        <p className="max-w-2xl text-gray-600 mx-auto text-base sm:text-lg">
          Our streamlined process helps you create a professional resume in
          minutes with intelligent AI-powered tools and features.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16 max-w-6xl w-full">
        {/* Left Side: Image */}
        <div className="flex justify-center w-full md:w-1/2">
          <img
            src="group-image-1.png"
            alt="Person working"
            className="rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto "
          />
        </div>

        {/* Right Side: Features */}
        <div className="space-y-5 sm:space-y-6 w-full md:w-1/2">
          {/* Card 1 */}
          <div className="p-5 sm:p-6 border border-purple-200 rounded-xl bg-purple-50 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-2">
              <BarChart className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                Real-Time Analytics
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              Get instant insights into your performance with live dashboards.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 sm:p-6 border border-green-200 rounded-xl bg-green-50 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                Bank-Grade Security
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              End-to-end encryption, 2FA, and GDPR compliance for maximum
              safety.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 sm:p-6 border border-orange-200 rounded-xl bg-orange-50 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="text-orange-600 w-5 h-5 sm:w-6 sm:h-6" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                Customizable Reports
              </h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600">
              Export professional, audit-ready reports for internal or external
              use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
