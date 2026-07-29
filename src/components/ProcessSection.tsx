import React from 'react';
import { CheckCircle } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'Inception & Brief Definition',
      desc: 'Defining client goals, spatial requirements, budget parameters, and initial feasibility constraints.',
    },
    {
      num: '2',
      title: 'Feasibility Study & Site Analysis',
      desc: 'Site topography check, soil assessment, county planning zoning review, and early QS cost planning.',
    },
    {
      num: '3',
      title: 'Concept & Schematic Design',
      desc: 'Architectural floor plans, elevation concepts, 3D renderings, and live material budget testing.',
    },
    {
      num: '4',
      title: 'Detailed Design & Permit Approvals',
      desc: 'Working drawings, structural engineering calculations, and County/NEMA/NCA permit submissions.',
    },
    {
      num: '5',
      title: 'Procurement & Tendering',
      desc: 'Preparation of Bills of Quantities (BQ), contractor tender invitations, and award recommendations.',
    },
    {
      num: '6',
      title: 'Construction Supervision',
      desc: 'On-site technical oversight, QA/QC testing, variation control, and interim payment valuations.',
    },
    {
      num: '7',
      title: 'Practical Completion & Handover',
      desc: 'Snagging inspections, final account agreement, occupation certificates, and post-completion support.',
    },
  ];

  return (
    <section id="process" className="py-16 md:py-24 bg-white border-b border-[#1F2527]/10">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-[2px] bg-[#B76E4E]"></div>
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B76E4E]">
              7-Stage Framework
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F2527] leading-tight">
            A Structured Process That Eliminates Surprises
          </h2>
          <p className="text-[#4A5A6A] text-xs sm:text-sm mt-3 leading-relaxed">
            Every project follows a defined lifecycle aligned with BORAQS and AAK stage gates — ensuring cost transparency and design precision from Day 1 to Handover.
          </p>
        </div>

        {/* Process Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#F5F2EB] border border-[#1F2527]/10 p-6 relative space-y-3 hover:border-[#B76E4E] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 bg-[#1F2527] text-white font-mono font-bold text-sm flex items-center justify-center">
                  {step.num}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B76E4E]">
                  Stage 0{step.num}
                </span>
              </div>

              <h3 className="font-serif text-base font-semibold text-[#1F2527]">
                {step.title}
              </h3>

              <p className="text-xs text-[#4A5A6A] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
