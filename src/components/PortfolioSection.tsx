import React, { useState, useMemo } from 'react';
import { Search, Filter, ExternalLink, Calendar, MapPin, Maximize2, DollarSign, CheckCircle2 } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS_DATA } from '../data/mockData';

interface PortfolioSectionProps {
  onSelectProject: (project: Project) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'institutional', label: 'Institutional' },
    { id: 'infrastructure', label: 'Infrastructure' },
  ];

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-[#F5F2EB]">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-[2px] bg-[#B76E4E]"></div>
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B76E4E]">
                Featured Works
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F2527] leading-tight">
              Built with Intention, Measured with Precision
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search projects or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#1F2527]/20 pl-9 pr-4 py-2.5 text-xs text-[#1F2527] placeholder:text-[#6B7D8A] outline-none focus:border-[#B76E4E] shadow-sm"
            />
            <Search className="w-4 h-4 text-[#6B7D8A] absolute left-3 top-3" />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap border ${
                activeCategory === cat.id
                  ? 'bg-[#1F2527] text-white border-[#1F2527]'
                  : 'bg-white text-[#4A5A6A] border-[#1F2527]/20 hover:border-[#1F2527] hover:text-[#1F2527]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white p-12 text-center border border-[#1F2527]/10 my-8">
            <p className="text-sm text-[#6B7D8A] font-medium">
              No projects matching "{searchQuery}" in this category. Try clearing search filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 text-xs font-semibold text-[#B76E4E] underline uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="bg-white border border-[#1F2527]/10 group hover:border-[#B76E4E] cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1F2527]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2527]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
                    <span className="bg-[#B76E4E] text-white px-2 py-0.5 shadow-sm">
                      {project.categoryName}
                    </span>
                    <span className={`px-2 py-0.5 shadow-sm ${
                      project.status === 'Completed' ? 'bg-[#5A7C5E] text-white' : 'bg-[#D4916E] text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Expand Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#1F2527]/40 backdrop-blur-[2px]">
                    <span className="bg-white text-[#1F2527] text-xs font-semibold px-3 py-1.5 uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <Maximize2 className="w-3.5 h-3.5 text-[#B76E4E]" />
                      View Project Specs
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#6B7D8A] font-medium mb-1">
                      <MapPin className="w-3 h-3 text-[#B76E4E]" />
                      <span>{project.location}</span>
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-[#1F2527] group-hover:text-[#B76E4E] transition-colors leading-snug mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs text-[#4A5A6A] line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Metrics Footer */}
                  <div className="border-t border-[#1F2527]/10 pt-3 grid grid-cols-3 gap-2 text-[11px]">
                    <div>
                      <span className="text-[#6B7D8A] block text-[9px] uppercase">Floor Area</span>
                      <span className="font-mono font-bold text-[#1F2527]">{project.areaSqm} m²</span>
                    </div>
                    <div>
                      <span className="text-[#6B7D8A] block text-[9px] uppercase">Cost Variance</span>
                      <span className="font-mono font-bold text-[#5A7C5E]">{project.costVariance}</span>
                    </div>
                    <div>
                      <span className="text-[#6B7D8A] block text-[9px] uppercase">Duration</span>
                      <span className="font-mono font-bold text-[#1F2527]">{project.durationMonths} Mo</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
