import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ServicesSection } from './components/ServicesSection';
import { CostCalculator } from './components/CostCalculator';
import { PortfolioSection } from './components/PortfolioSection';
import { ProjectModal } from './components/ProjectModal';
import { AiAdvisor } from './components/AiAdvisor';
import { SectorsSection } from './components/SectorsSection';
import { ProcessSection } from './components/ProcessSection';
import { TeamSection } from './components/TeamSection';
import { InsightsSection } from './components/InsightsSection';
import { FaqSection } from './components/FaqSection';
import { ConsultationSection } from './components/ConsultationSection';
import { Footer } from './components/Footer';
import { WhatsAppFab } from './components/WhatsAppFab';
import { PortalModal } from './components/PortalModal';
import { AuthProvider } from './context/AuthContext';
import { testFirebaseConnection } from './lib/firebase';
import { Project } from './types';

function MainApp() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [attachedEstimateNote, setAttachedEstimateNote] = useState<string | undefined>(undefined);
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  useEffect(() => {
    testFirebaseConnection();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCalculator = () => {
    scrollToSection('#estimator');
  };

  const handleOpenConsultation = (projectTitle?: string) => {
    scrollToSection('#contact');
    if (projectTitle && !attachedEstimateNote) {
      setAttachedEstimateNote(projectTitle);
    }
  };

  const handleAttachEstimate = (summary: string) => {
    setAttachedEstimateNote(summary);
    scrollToSection('#contact');
  };

  return (
    <div className="min-h-screen bg-white text-[#2E3A40] font-sans antialiased selection:bg-[#B76E4E] selection:text-white">
      
      {/* Navbar */}
      <Header
        onOpenCalculator={handleOpenCalculator}
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenPortal={() => setIsPortalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenCalculator={handleOpenCalculator}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Trust & Accreditations Bar */}
      <TrustBar />

      {/* Core Services */}
      <ServicesSection
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Construction Cost Estimator */}
      <CostCalculator
        onAttachToConsultation={handleAttachEstimate}
      />

      {/* Portfolio Showcase */}
      <PortfolioSection
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* AI Feasibility Advisor */}
      <AiAdvisor />

      {/* Sectors Grid */}
      <SectorsSection
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* 7-Stage Process Framework */}
      <ProcessSection />

      {/* Leadership & Team */}
      <TeamSection />

      {/* Insights & Articles */}
      <InsightsSection />

      {/* FAQs */}
      <FaqSection />

      {/* Consultation Request Form */}
      <ConsultationSection
        attachedEstimateNote={attachedEstimateNote}
        onClearAttachedEstimate={() => setAttachedEstimateNote(undefined)}
      />

      {/* Footer */}
      <Footer />

      {/* WhatsApp & Top Floating FAB */}
      <WhatsAppFab />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenConsultation={(title) => handleOpenConsultation(title)}
      />

      {/* Firebase Client / Admin Portal Modal */}
      <PortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
