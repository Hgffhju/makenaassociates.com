import React from 'react';
import { Home, Building2, GraduationCap, Droplets, Factory, Sprout, Stethoscope, Hotel } from 'lucide-react';

interface SectorsSectionProps {
  onOpenConsultation: () => void;
}

export const SectorsSection: React.FC<SectorsSectionProps> = ({ onOpenConsultation }) => {
  const sectors = [
    {
      title: 'Residential Estates',
      desc: 'Custom country homes, multi-story apartments, affordable housing schemes, and luxury highland villas.',
      icon: Home,
    },
    {
      title: 'Commercial & Mixed-Use',
      desc: 'CBD office towers, retail complexes, banking halls, and mixed-use commercial developments.',
      icon: Building2,
    },
    {
      title: 'Institutional & Education',
      desc: 'Schools, colleges, vocational centers, public community hubs, and government administrative facilities.',
      icon: GraduationCap,
    },
    {
      title: 'Water & WASH Infrastructure',
      desc: 'Water treatment plants, reinforced concrete storage tanks, pump stations, and distribution pipelines.',
      icon: Droplets,
    },
    {
      title: 'Industrial & Warehousing',
      desc: 'Manufacturing go-downs, cold storage facilities, processing plants, and industrial park structures.',
      icon: Factory,
    },
    {
      title: 'Agri-Business Facilities',
      desc: 'Farm structures, crop processing facilities, dairy cooling plants, and greenhouse infrastructure.',
      icon: Sprout,
    },
    {
      title: 'Healthcare & Medical',
      desc: 'Hospitals, outpatient clinics, and medical suites designed strictly to MOH health facility standards.',
      icon: Stethoscope,
    },
    {
      title: 'Hospitality & Tourism',
      desc: 'Safari lodges, boutique hotels, eco-resorts, and restaurant developments in natural Kenyan landscapes.',
      icon: Hotel,
    },
  ];

  return (
    <section id="sectors" className="py-16 md:py-24 bg-[#F5F2EB]">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-[2px] bg-[#B76E4E]"></div>
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B76E4E]">
              Sectors Served
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F2527] leading-tight">
            Specialized Practice Across Key Growth Sectors
          </h2>
          <p className="text-[#4A5A6A] text-xs sm:text-sm mt-3 leading-relaxed">
            Every sector has unique regulatory parameters, structural requirements, and tenant absorption dynamics. We bring tailored expertise across all major building categories.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#1F2527]/10 p-6 space-y-4 hover:border-[#B76E4E] hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div className="w-10 h-10 border border-[#1F2527]/10 flex items-center justify-center bg-[#F5F2EB]">
                  <IconComponent className="w-5 h-5 text-[#B76E4E]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1F2527]">
                  {s.title}
                </h3>
                <p className="text-xs text-[#4A5A6A] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 bg-white p-6 border border-[#1F2527]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-base font-semibold text-[#1F2527]">
              Have a specialized sector project in mind?
            </h4>
            <p className="text-xs text-[#6B7D8A] mt-0.5">
              Our registered architects and quantity surveyors are ready to review your project brief.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-6 py-2.5 bg-[#1F2527] hover:bg-[#B76E4E] text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 shadow-sm"
          >
            Consult Our Team
          </button>
        </div>

      </div>
    </section>
  );
};
