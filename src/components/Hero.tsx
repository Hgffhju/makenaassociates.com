import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, ShieldCheck, Compass, DollarSign } from 'lucide-react';

interface HeroProps {
  onOpenCalculator: () => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCalculator, onOpenConsultation }) => {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 lg:pb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5">
              <div className="w-8 h-[2px] bg-[#B76E4E]"></div>
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B76E4E]">
                Kenya · Central Highlands & Nationwide
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1F2527] leading-[1.15] tracking-tight">
              Architecture Held to Account by <em className="italic text-[#B76E4E] not-italic">Precision Cost Control</em>
            </h1>

            <p className="text-[#4A5A6A] text-base sm:text-lg leading-relaxed max-w-xl">
              Integrated architectural design and quantity surveying practice in Kenya — delivering inspiring highland spaces with structural certainty and fiscal discipline, from concept through handover.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2 items-center">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3.5 bg-[#1F2527] hover:bg-[#B76E4E] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D4916E]" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="px-6 py-3.5 border border-[#1F2527]/30 hover:border-[#1F2527] text-[#1F2527] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 bg-stone-50/50"
              >
                <Calculator className="w-4 h-4 text-[#B76E4E]" />
                <span>Estimate Construction Cost</span>
              </button>
            </div>

            {/* Metric Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#1F2527]/10">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2527]">12+</div>
                <div className="text-[11px] uppercase tracking-wider text-[#6B7D8A] mt-1 font-medium">Years in Practice</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2527]">150+</div>
                <div className="text-[11px] uppercase tracking-wider text-[#6B7D8A] mt-1 font-medium">Projects Delivered</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2527]">4.8%</div>
                <div className="text-[11px] uppercase tracking-wider text-[#6B7D8A] mt-1 font-medium">Avg Cost Variance</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2527]">94%</div>
                <div className="text-[11px] uppercase tracking-wider text-[#6B7D8A] mt-1 font-medium">On-Time Delivery</div>
              </div>
            </div>
          </div>

          {/* Right Column Showcase Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-none overflow-hidden bg-[#1F2527] shadow-xl aspect-[4/5] max-w-md mx-auto lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Highlands View Residences by Makena & Associates"
                className="w-full h-full object-cover object-center opacity-90 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2527]/90 via-[#1F2527]/20 to-transparent"></div>

              {/* Floating Architectural Badge */}
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-3.5 py-2 shadow-md border-l-2 border-[#B76E4E]">
                <div className="text-[10px] font-bold tracking-widest uppercase text-[#B76E4E]">Featured Project</div>
                <div className="font-serif text-sm font-semibold text-[#1F2527]">Highlands View Villa</div>
              </div>

              {/* Integrated QS + Architect Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="inline-flex items-center gap-2 bg-[#B76E4E] px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase">
                  <CheckCircle2 className="w-3 h-3" /> Integrated Design & QS
                </div>
                <h3 className="font-serif text-xl font-medium leading-snug">
                  4.2% Below Initial Cost Estimates
                </h3>
                <p className="text-xs text-white/70 line-clamp-2">
                  Multi-level estate in Ol Kalou engineered with local highland dressed quarry stone & thermal cavity insulation.
                </p>
              </div>
            </div>

            {/* Decorative Corner Offset Accent */}
            <div className="absolute -bottom-4 -right-4 w-28 h-28 border-r-2 border-b-2 border-[#B76E4E] -z-10 hidden sm:block"></div>
          </div>

        </div>
      </div>
    </section>
  );
};
