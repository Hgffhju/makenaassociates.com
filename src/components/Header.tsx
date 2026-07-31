import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Building2, Calculator, Shield, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenCalculator: () => void;
  onOpenConsultation: () => void;
  onOpenPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCalculator, onOpenConsultation, onOpenPortal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Cost Calculator', href: '#estimator', onClick: onOpenCalculator },
    { name: 'Sectors', href: '#sectors' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Reviews & Offices', href: '#local-trust' },
    { name: 'AI Advisor', href: '#ai-advisor' },
    { name: 'Process', href: '#process' },
    { name: 'Team', href: '#team' },
    { name: 'Ad Campaigns & Share', href: '#campaigns' },
    { name: 'Careers', href: '#careers' },
    { name: 'Insights', href: '#insights' },
    { name: 'About', href: '#about' },
  ];

  return (
    <>
      {/* Top Notification / Contact Bar */}
      <div className="bg-[#1F2527] text-white/80 text-xs py-2 px-5 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#B76E4E]" />
              <a href="tel:0741222596" className="hover:text-white transition-colors">0741 222 596</a>
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#B76E4E]" />
              <a href="mailto:maingichristine1996@gmail.com" className="hover:text-white transition-colors">maingichristine1996@gmail.com</a>
            </span>
            <span className="text-white/40">|</span>
            <span className="text-[#D4916E] font-medium">Central Kenya & Environs</span>
            <span className="text-white/40">|</span>
            <span className="text-white/60">Ol Kalou, HQ</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#D4916E] font-medium">AAK & BORAQS Practice</span>
            <button 
              onClick={onOpenPortal}
              className="text-white bg-[#B76E4E] hover:bg-[#9A5B3C] px-2.5 py-0.5 font-medium transition-all flex items-center gap-1 text-[11px]"
            >
              <Shield className="w-3 h-3 text-white" />
              {isAdmin ? 'Admin Portal' : currentUser ? 'Client Portal' : 'Portal / Sign In'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header 
        className={`fixed top-0 md:top-[33px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[#1F2527]/10 py-3' 
            : 'bg-white/90 backdrop-blur-sm border-b border-[#1F2527]/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#1F2527] group-hover:bg-[#B76E4E] transition-colors flex items-center justify-center text-white rounded-none shadow-sm">
              <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5 stroke-current">
                <path d="M2 18L11 4L20 18H2Z" strokeWidth="1.5" />
                <path d="M7 18V13H15V18" strokeWidth="1.2" />
                <path d="M9 13V10H13V13" strokeWidth="1" />
              </svg>
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-[#1F2527] block leading-none group-hover:text-[#B76E4E] transition-colors">
                Makena & Associates
              </span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#B76E4E] block mt-1">
                Ltd — Architects & QS
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={link.onClick}
                className="text-xs font-medium text-[#4A5A6A] hover:text-[#1F2527] tracking-wide transition-colors py-1 border-b-2 border-transparent hover:border-[#B76E4E]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenPortal}
              className="text-xs font-semibold text-[#1F2527] border border-[#1F2527]/20 hover:border-[#1F2527] px-3 py-2 transition-all flex items-center gap-1.5"
            >
              <UserIcon className="w-3.5 h-3.5 text-[#B76E4E]" />
              <span>{isAdmin ? 'Admin' : currentUser ? 'Portal' : 'Portal / Sign In'}</span>
            </button>
            <button
              onClick={onOpenConsultation}
              className="text-xs font-semibold uppercase tracking-wider bg-[#B76E4E] hover:bg-[#9A5B3C] text-white px-4 py-2 transition-colors shadow-sm"
            >
              Consult Us
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#1F2527] p-2 hover:bg-black/5 rounded transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 pb-8 flex flex-col justify-between overflow-y-auto lg:hidden">
          <div className="space-y-3 divide-y divide-[#1F2527]/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link.onClick) link.onClick();
                }}
                className="block pt-3 font-serif text-lg text-[#1F2527] hover:text-[#B76E4E] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-6 space-y-3 border-t border-[#1F2527]/10 mt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full py-3 bg-[#1F2527] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <UserIcon className="w-4 h-4 text-[#D4916E]" />
              {isAdmin ? 'Admin Portal' : currentUser ? 'Client Portal' : 'Portal / Sign In'}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 bg-[#B76E4E] text-white font-semibold text-xs tracking-wider uppercase block text-center"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      )}
    </>
  );
};
