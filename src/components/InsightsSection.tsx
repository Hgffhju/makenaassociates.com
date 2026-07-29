import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, X, User } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES_DATA } from '../data/mockData';

export const InsightsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="insights" className="py-16 md:py-24 bg-white border-b border-[#1F2527]/10">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-[2px] bg-[#B76E4E]"></div>
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B76E4E]">
                Industry Insights
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F2527] leading-tight">
              Practice Notes & Knowledge from the Field
            </h2>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES_DATA.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className={`border border-[#1F2527]/10 group hover:border-[#B76E4E] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between ${
                article.featured ? 'bg-[#1F2527] text-white' : 'bg-[#F5F2EB] text-[#1F2527]'
              }`}
            >
              <div>
                <div className="aspect-[16/9] overflow-hidden bg-[#1F2527] relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#B76E4E] text-white text-[10px] font-bold tracking-widest uppercase px-2 py-0.5">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] opacity-70 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#B76E4E]" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B76E4E]" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className={`font-serif text-lg font-semibold leading-snug group-hover:text-[#B76E4E] transition-colors ${
                    article.featured ? 'text-white' : 'text-[#1F2527]'
                  }`}>
                    {article.title}
                  </h3>

                  <p className={`text-xs line-clamp-3 leading-relaxed ${
                    article.featured ? 'text-white/70' : 'text-[#4A5A6A]'
                  }`}>
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-current/10 mt-4 flex items-center justify-between text-xs font-semibold text-[#B76E4E]">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-[#1F2527]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="bg-white text-[#1F2527] max-w-3xl w-full border border-[#1F2527]/20 shadow-2xl relative my-8 overflow-hidden">
              
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/60 hover:bg-[#1F2527] text-white flex items-center justify-center transition-colors"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[21/9] bg-[#1F2527] relative overflow-hidden">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2527] via-[#1F2527]/30 to-transparent"></div>
                
                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <span className="bg-[#B76E4E] text-white text-[10px] font-bold tracking-widest uppercase px-2 py-0.5">
                    {selectedArticle.category}
                  </span>
                  <h3 className="font-serif text-2xl font-medium leading-tight">
                    {selectedArticle.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-white/70 font-mono pt-1">
                    <span>By {selectedArticle.author}</span>
                    <span>•</span>
                    <span>{selectedArticle.date}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto text-xs sm:text-sm text-[#2E3A40] leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </div>

              <div className="bg-[#F5F2EB] p-4 sm:p-6 border-t border-[#1F2527]/10 flex justify-between items-center text-xs">
                <span className="text-[#6B7D8A]">Makena & Associates Ltd Insights</span>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 bg-[#1F2527] text-white font-semibold uppercase tracking-wider"
                >
                  Close Reader
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
