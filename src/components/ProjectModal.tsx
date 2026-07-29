import React from 'react';
import { X, MapPin, Calendar, CheckCircle2, User, ShieldCheck, DollarSign, Building, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenConsultation: (projectTitle?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenConsultation }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1F2527]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white max-w-3xl w-full border border-[#1F2527]/20 shadow-2xl relative my-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/60 hover:bg-[#1F2527] text-white flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Image */}
        <div className="relative aspect-[21/9] bg-[#1F2527] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2527] via-[#1F2527]/30 to-transparent"></div>
          
          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <span className="bg-[#B76E4E] text-white text-[10px] font-bold tracking-widest uppercase px-2 py-0.5">
              {project.categoryName} · {project.status}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium leading-snug">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <MapPin className="w-3.5 h-3.5 text-[#D4916E]" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Performance Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F5F2EB] p-4 border border-[#1F2527]/10 text-xs">
            <div>
              <span className="text-[#6B7D8A] uppercase text-[10px] block font-semibold">Total Floor Plate</span>
              <span className="font-mono font-bold text-[#1F2527] text-sm block mt-0.5">{project.areaSqm} m²</span>
            </div>
            <div>
              <span className="text-[#6B7D8A] uppercase text-[10px] block font-semibold">Cost Variance</span>
              <span className="font-mono font-bold text-[#5A7C5E] text-sm block mt-0.5">{project.costVariance}</span>
            </div>
            <div>
              <span className="text-[#6B7D8A] uppercase text-[10px] block font-semibold">Construction Time</span>
              <span className="font-mono font-bold text-[#1F2527] text-sm block mt-0.5">{project.durationMonths} Months</span>
            </div>
            <div>
              <span className="text-[#6B7D8A] uppercase text-[10px] block font-semibold">Completion Year</span>
              <span className="font-mono font-bold text-[#1F2527] text-sm block mt-0.5">{project.completedYear}</span>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#1F2527] border-b border-[#1F2527]/10 pb-2">
              Project Overview & Engineering
            </h4>
            <p className="text-xs sm:text-sm text-[#4A5A6A] leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#1F2527]">
              Key Performance & Design Highlights
            </h4>
            <div className="space-y-2">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#2E3A40]">
                  <CheckCircle2 className="w-4 h-4 text-[#5A7C5E] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Team & Client info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-50 p-4 border border-[#1F2527]/10 text-xs">
            <div>
              <span className="text-[#6B7D8A] text-[10px] uppercase block font-semibold">Client / Developer</span>
              <span className="font-medium text-[#1F2527] block mt-0.5">{project.clientName}</span>
            </div>
            <div>
              <span className="text-[#6B7D8A] text-[10px] uppercase block font-semibold">Lead Architect</span>
              <span className="font-medium text-[#1F2527] block mt-0.5">{project.architect}</span>
            </div>
            <div>
              <span className="text-[#6B7D8A] text-[10px] uppercase block font-semibold">Quantity Surveyor Lead</span>
              <span className="font-medium text-[#1F2527] block mt-0.5">{project.qsLead}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="bg-[#F5F2EB] p-4 sm:p-6 border-t border-[#1F2527]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#4A5A6A]">
            Interested in building a similar project in Kenya? Request an integrated feasibility review.
          </p>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenConsultation(`Inquiry regarding: ${project.title}`);
            }}
            className="w-full sm:w-auto px-6 py-3 bg-[#B76E4E] hover:bg-[#9A5B3C] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm"
          >
            <span>Consult on Similar Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
