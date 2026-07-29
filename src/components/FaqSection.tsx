import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, Phone } from 'lucide-react';
import { FAQ_DATA } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F5F2EB]">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column Header */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-[2px] bg-[#B76E4E]"></div>
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B76E4E]">
                Frequently Asked Questions
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F2527] leading-tight">
              Direct Answers to Your Building & Cost Concerns
            </h2>

            <p className="text-[#4A5A6A] text-xs sm:text-sm leading-relaxed">
              We answer the most common questions clients bring to their first consultation. If your specific question isn't answered here, call us directly on 0741 222 596.
            </p>

            <div className="bg-white p-6 border border-[#1F2527]/10 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1F2527] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B76E4E]" />
                <span>Need Direct Assistance?</span>
              </div>
              <p className="text-xs text-[#6B7D8A] leading-relaxed">
                Speak with our registered architectural and quantity surveying leads today.
              </p>
              <a
                href="tel:0741222596"
                className="inline-block px-4 py-2 bg-[#1F2527] hover:bg-[#B76E4E] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Call 0741 222 596
              </a>
            </div>
          </div>

          {/* Right Column Accordion List */}
          <div className="lg:col-span-7 space-y-3">
            {FAQ_DATA.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-[#1F2527]/10 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif text-base font-semibold text-[#1F2527] hover:text-[#B76E4E] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <div className={`w-7 h-7 flex items-center justify-center border transition-all ${
                      isOpen ? 'bg-[#B76E4E] text-white border-[#B76E4E]' : 'border-[#1F2527]/20 text-[#1F2527]'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#4A5A6A] leading-relaxed border-t border-[#1F2527]/10 mt-1">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
