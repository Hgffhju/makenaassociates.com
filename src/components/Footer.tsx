import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1F2527] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#B76E4E] flex items-center justify-center text-white font-bold shadow-md">
                <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5 stroke-current">
                  <path d="M2 18L11 4L20 18H2Z" strokeWidth="1.5" />
                  <path d="M7 18V13H15V18" strokeWidth="1.2" />
                  <path d="M9 13V10H13V13" strokeWidth="1" />
                </svg>
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white block leading-none">
                  Makena & Associates
                </span>
                <span className="text-[9px] font-semibold tracking-widest uppercase text-[#D4916E] block mt-1">
                  Ltd — Architects & QS
                </span>
              </div>
            </div>

            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Integrated architectural design, quantity surveying, and construction management across Kenya — where bold vision meets structural certainty and fiscal discipline.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#5A7C5E]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>AAK, BORAQS, NCA & NEMA Accredited Practice</span>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#D4916E]">
              Practice Services
            </h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li><a href="#services" className="hover:text-white transition-colors">Architectural Design</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Quantity Surveying & BQs</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Feasibility Studies</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Construction Supervision</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Environmental & EIA Permits</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Value Engineering</a></li>
            </ul>
          </div>

          {/* Navigation Col */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#D4916E]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li><a href="#estimator" className="hover:text-white transition-colors">Cost Estimator Tool</a></li>
              <li><a href="#sectors" className="hover:text-white transition-colors">Sectors Served</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Featured Portfolio</a></li>
              <li><a href="#ai-advisor" className="hover:text-white transition-colors">AI Building Assistant</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">7-Stage Framework</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Practice Leadership</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Practice</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#D4916E]">
              Contact Office
            </h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B76E4E]" />
                <a href="tel:0741222596" className="hover:text-white">0741 222 596</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B76E4E]" />
                <a href="mailto:info@makenaassociates.com" className="hover:text-white">info@makenaassociates.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B76E4E] shrink-0 mt-0.5" />
                <span>Ol Kalou, Nyandarua, Kenya</span>
              </li>
              <li className="pt-2 text-[11px] text-white/40">
                Mon – Fri: 8:00am – 5:00pm<br />
                Sat: 8:00am – 12:00pm
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Makena & Associates Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>AAK & BORAQS Registered</span>
            <button
              onClick={scrollToTop}
              className="p-2 bg-white/5 hover:bg-[#B76E4E] text-white transition-colors flex items-center gap-1.5"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-bold">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
