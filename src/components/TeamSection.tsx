import React from 'react';
import { Mail, Linkedin, Award, ShieldCheck, UserCheck } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/mockData';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-16 md:py-24 bg-[#F5F2EB]">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-[2px] bg-[#B76E4E]"></div>
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B76E4E]">
              Leadership
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F2527] leading-tight">
            Registered Professionals & Practice Leadership
          </h2>
          <p className="text-[#4A5A6A] text-xs sm:text-sm mt-3 leading-relaxed">
            Our multidisciplinary practice is led by registered architects, quantity surveyors, and project managers with proven records across Kenya.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-[#1F2527]/10 overflow-hidden hover:border-[#B76E4E] transition-all duration-300 shadow-sm flex flex-col justify-between"
            >
              {/* Profile Avatar Graphic */}
              <div
                className="aspect-square relative flex flex-col items-center justify-center p-6 text-center text-white"
                style={{ backgroundColor: member.imageBgColor }}
              >
                <div className="w-20 h-20 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center mb-3">
                  <UserCheck className="w-10 h-10 text-white/80" />
                </div>
                <span className="bg-[#B76E4E] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5">
                  {member.badge}
                </span>
              </div>

              {/* Info Container */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#1F2527]">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#B76E4E] uppercase tracking-wider mb-2">
                    {member.title}
                  </div>
                  <div className="text-[11px] text-[#6B7D8A] font-mono border-b border-[#1F2527]/10 pb-2 mb-3">
                    {member.credentials}
                  </div>
                  <p className="text-xs text-[#4A5A6A] leading-relaxed line-clamp-4">
                    {member.bio}
                  </p>
                </div>

                {/* Email Contact */}
                <div className="pt-3 border-t border-[#1F2527]/10">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-xs text-[#1F2527] hover:text-[#B76E4E] font-medium flex items-center gap-1.5 transition-colors truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#B76E4E] shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
