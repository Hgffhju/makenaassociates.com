import React, { useState } from 'react';
import { Bot, Send, Sparkles, Building, ShieldAlert, CheckCircle2, HelpCircle, Loader2 } from 'lucide-react';

export const AiAdvisor: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const sampleQuestions = [
    'What permits and approvals do I need for a 4-story commercial building in Nyahururu?',
    'How do highland soil conditions (red soil vs black cotton) affect foundation cost?',
    'What is the standard BORAQS / AAK professional fee percentage in Kenya?',
    'How does rainwater harvesting integration lower long-term building operating costs?',
  ];

  const handleAsk = async (questionText?: string) => {
    const textToSubmit = questionText || prompt;
    if (!textToSubmit.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSubmit,
          projectContext: {
            firmName: 'Makena & Associates Ltd',
            headquarters: 'Ol Kalou, Kenya',
          },
        }),
      });

      const data = await res.json();
      setResponse(data.response || 'Thank you for inquiring. Please submit a consultation form for a detailed review.');
    } catch (err) {
      console.error('AI Advisor error:', err);
      setResponse('Thank you for inquiring. Our team is available to discuss your specific project parameters directly via our consultation form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-advisor" className="py-16 md:py-24 bg-white border-b border-[#1F2527]/10">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-[2px] bg-[#B76E4E]"></div>
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B76E4E]">
              AI Building Assistant
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F2527] leading-tight">
            Kenya Building & Feasibility Advisor
          </h2>
          <p className="text-[#4A5A6A] text-xs sm:text-sm mt-3 leading-relaxed">
            Have questions about Kenyan building codes, NCA site permits, BORAQS fee scales, or highland construction materials? Ask our AI Building Assistant for instant structured guidance.
          </p>
        </div>

        {/* Advisor Box Container */}
        <div className="bg-[#1F2527] text-white p-6 sm:p-10 shadow-2xl border border-white/10 relative">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#B76E4E] flex items-center justify-center text-white shadow-md">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-white">
                    Makena AI Feasibility Assistant
                  </h3>
                  <p className="text-[11px] text-white/60">
                    Trained on Kenyan Building Regulations, NCA, NEMA & BORAQS Standards
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block bg-[#5A7C5E]/30 text-[#5A7C5E] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 border border-[#5A7C5E]/50">
                ● Live AI Support
              </span>
            </div>

            {/* Sample Prompts */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider block">
                Popular Feasibility Enquiries:
              </span>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPrompt(q);
                      handleAsk(q);
                    }}
                    className="text-xs text-white/80 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#B76E4E] px-3 py-1.5 transition-colors text-left"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input Box */}
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask about building costs in Kenya, NCA registration steps, highland stone masonry, soil foundation types..."
                className="w-full bg-white/10 border border-white/20 focus:border-[#B76E4E] p-4 text-xs sm:text-sm text-white placeholder:text-white/40 outline-none resize-none min-h-[100px]"
              />
              <button
                type="button"
                onClick={() => handleAsk()}
                disabled={loading || !prompt.trim()}
                className="absolute bottom-3 right-3 px-5 py-2 bg-[#B76E4E] hover:bg-[#9A5B3C] disabled:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Ask AI Assistant</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* AI Response Viewer */}
            {response && (
              <div className="bg-white/5 border border-white/10 p-6 space-y-3 mt-4 text-xs sm:text-sm leading-relaxed text-white/90">
                <div className="flex items-center gap-2 text-[#D4916E] font-serif font-semibold border-b border-white/10 pb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Advisor Analysis:</span>
                </div>
                <div className="whitespace-pre-line space-y-2">
                  {response}
                </div>
                <div className="pt-2 text-[11px] text-white/40 italic border-t border-white/10">
                  Disclaimer: AI guidance is for general feasibility orientation. Official project execution requires stamped drawings and certified BQs from our registered architects and quantity surveyors.
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
