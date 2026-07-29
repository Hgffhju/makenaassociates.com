import React from 'react';
import { ShieldCheck, Award, FileCheck, CheckCircle } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const credentials = [
    { title: 'AAK Registered', desc: 'Architectural Association of Kenya' },
    { title: 'BORAQS Certified', desc: 'Board of Registration of Architects & QS' },
    { title: 'NCA Licensed', desc: 'National Construction Authority Grade 1' },
    { title: 'NEMA Accredited', desc: 'Environmental Impact Assessment Experts' },
    { title: 'ISO 9001:2015', desc: 'Quality Management System Certified' },
  ];

  return (
    <div className="bg-[#F5F2EB] border-y border-[#1F2527]/10 py-5 px-5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center lg:justify-between gap-6">
        <div className="text-xs font-bold uppercase tracking-wider text-[#1F2527]/70 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#5A7C5E]" />
          <span>Professional Accreditations & Compliance</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {credentials.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 group">
              <CheckCircle className="w-4 h-4 text-[#5A7C5E] group-hover:text-[#B76E4E] transition-colors" />
              <div>
                <span className="text-xs font-semibold text-[#1F2527] block leading-none">
                  {item.title}
                </span>
                <span className="text-[10px] text-[#6B7D8A] font-medium hidden sm:block mt-0.5">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
