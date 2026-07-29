import React, { useState } from 'react';
import { Compass, Calculator, FileText, HardHat, ShieldCheck, TrendingDown, CheckCircle, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';

interface ServicesSectionProps {
  onOpenConsultation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'comparison'>('all');

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-[2px] bg-[#B76E4E]"></div>
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B76E4E]">
                Core Disciplines
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F2527] leading-tight">
              Integrated Architectural & Cost Management Services
            </h2>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-[#F5F2EB] p-1 border border-[#1F2527]/10 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'all'
                  ? 'bg-[#1F2527] text-white shadow-sm'
                  : 'text-[#4A5A6A] hover:text-[#1F2527]'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'comparison'
                  ? 'bg-[#1F2527] text-white shadow-sm'
                  : 'text-[#4A5A6A] hover:text-[#1F2527]'
              }`}
            >
              Why Integration Saves Money
            </button>
          </div>
        </div>

        {/* Tab 1: All Services Grid */}
        {activeTab === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((service, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#1F2527]/10 p-6 sm:p-8 relative group hover:border-[#B76E4E] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono text-xs font-bold text-[#B76E4E] tracking-wider">
                      {service.number}
                    </span>
                    <div className="w-10 h-10 border border-[#1F2527]/10 group-hover:border-[#B76E4E] group-hover:bg-[#B76E4E]/10 flex items-center justify-center transition-colors">
                      {idx === 0 && <Compass className="w-5 h-5 text-[#B76E4E]" />}
                      {idx === 1 && <Calculator className="w-5 h-5 text-[#B76E4E]" />}
                      {idx === 2 && <FileText className="w-5 h-5 text-[#B76E4E]" />}
                      {idx === 3 && <HardHat className="w-5 h-5 text-[#B76E4E]" />}
                      {idx === 4 && <ShieldCheck className="w-5 h-5 text-[#B76E4E]" />}
                      {idx === 5 && <TrendingDown className="w-5 h-5 text-[#B76E4E]" />}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[#1F2527] mb-3 group-hover:text-[#B76E4E] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-[#4A5A6A] text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="border-t border-[#1F2527]/10 pt-4 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1F2527]/60 block mb-1">
                      Key Deliverables:
                    </span>
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-[#2E3A40]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#5A7C5E] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1F2527]/10">
                  <button
                    onClick={onOpenConsultation}
                    className="text-xs font-semibold text-[#B76E4E] hover:text-[#9A5B3C] uppercase tracking-wider flex items-center gap-1 group/btn"
                  >
                    <span>Consult on this Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Integrated Model Comparison */}
        {activeTab === 'comparison' && (
          <div className="bg-[#1F2527] text-white p-8 lg:p-12 shadow-xl border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="inline-block bg-[#B76E4E] text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">
                  The Makena & Associates Integrated Approach
                </span>
                
                <h3 className="font-serif text-2xl sm:text-3xl font-medium leading-snug">
                  Why Separating Architecture & Quantity Surveying Costs You Money
                </h3>

                <p className="text-white/70 text-sm leading-relaxed">
                  When a property owner hires an architect from Firm A and a Quantity Surveyor from Firm B, communication happens asynchronously after drawings are finalized. Cost overruns are discovered late, causing redesign delays and contractor disputes.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="bg-white/5 p-4 border-l-2 border-[#B76E4E] space-y-1">
                    <div className="font-semibold text-sm text-[#D4916E]">Traditional Separate Consultants Model:</div>
                    <p className="text-xs text-white/60">
                      Architect designs first ➔ QS measures BQ later ➔ Budget exceeded ➔ Redesign delays & variation claims during construction.
                    </p>
                  </div>

                  <div className="bg-[#5A7C5E]/20 p-4 border-l-2 border-[#5A7C5E] space-y-1">
                    <div className="font-semibold text-sm text-[#5A7C5E]">Makena & Associates Integrated Model:</div>
                    <p className="text-xs text-white/80">
                      Architect & QS test material costs together at every design stage ➔ BQ matches budget before tendering ➔ Zero variation surprises.
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparative Feature Matrix */}
              <div className="lg:col-span-6 bg-white/5 p-6 border border-white/10 space-y-4">
                <h4 className="font-serif text-lg font-semibold text-[#D4916E] border-b border-white/10 pb-3">
                  Integrated Model Benefits at a Glance
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-3 py-2 border-b border-white/10 font-semibold text-white/80">
                    <span>Feature</span>
                    <span>Separate Consultants</span>
                    <span className="text-[#D4916E]">Makena & Associates</span>
                  </div>

                  <div className="grid grid-cols-3 py-2 border-b border-white/10 text-white/70">
                    <span className="font-medium text-white">Cost Control</span>
                    <span className="text-red-300">Late BQ Review</span>
                    <span className="text-emerald-300 font-semibold">Continuous Real-Time</span>
                  </div>

                  <div className="grid grid-cols-3 py-2 border-b border-white/10 text-white/70">
                    <span className="font-medium text-white">Variation Risk</span>
                    <span className="text-red-300">High (8% - 15%)</span>
                    <span className="text-emerald-300 font-semibold">Minimal (Under 4%)</span>
                  </div>

                  <div className="grid grid-cols-3 py-2 border-b border-white/10 text-white/70">
                    <span className="font-medium text-white">Pre-Const. Delay</span>
                    <span className="text-red-300">4-8 Weeks Redesign</span>
                    <span className="text-emerald-300 font-semibold">Zero Redesign Delay</span>
                  </div>

                  <div className="grid grid-cols-3 py-2 border-b border-white/10 text-white/70">
                    <span className="font-medium text-white">Accountability</span>
                    <span className="text-red-300">Split Between 2 Firms</span>
                    <span className="text-emerald-300 font-semibold">Single Point Responsibility</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={onOpenConsultation}
                    className="w-full py-3 bg-[#B76E4E] hover:bg-[#9A5B3C] text-white text-xs font-semibold uppercase tracking-wider transition-colors text-center block"
                  >
                    Experience the Integrated Advantage — Consult Us
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
