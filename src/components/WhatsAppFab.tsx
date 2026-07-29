import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp } from 'lucide-react';

export const WhatsAppFab: React.FC = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/254741222596?text=${encodeURIComponent("Hello, I'm inquiring about architectural design and quantity surveying services with Makena & Associates Ltd.")}`;

  return (
    <>
      {/* Floating WhatsApp Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 group">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 relative"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M11.998 2.003C6.477 2.003 2 6.477 2 12c0 1.764.46 3.416 1.268 4.849L2 22l5.316-1.246A9.961 9.961 0 0012 22c5.523 0 10-4.477 10-10s-4.477-9.997-10-9.997zm0 18.35a8.31 8.31 0 01-4.235-1.15l-.303-.18-3.155.737.762-3.077-.197-.316A8.347 8.347 0 013.65 12c0-4.604 3.746-8.348 8.348-8.348 4.604 0 8.35 3.744 8.35 8.348-.001 4.602-3.746 8.353-8.35 8.353z"/>
          </svg>

          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping -z-10"></span>
        </a>
      </div>

      {/* Floating Back To Top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-40 w-10 h-10 bg-[#1F2527] hover:bg-[#B76E4E] text-white flex items-center justify-center shadow-lg transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
};
