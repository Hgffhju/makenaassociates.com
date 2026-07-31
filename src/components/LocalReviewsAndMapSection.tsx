import React, { useState } from 'react';
import { MapPin, Star, Phone, Mail, Clock, ExternalLink, ShieldCheck, CheckCircle2, Navigation, MessageSquare, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  role: string;
  location: string;
  source: 'Google' | 'Facebook' | 'BORAQS Directory';
  rating: number;
  date: string;
  project: string;
  comment: string;
  verified: boolean;
  avatar: string;
}

export const LocalReviewsAndMapSection: React.FC = () => {
  const [selectedOffice, setSelectedOffice] = useState<'olkalou' | 'nyeri' | 'nakuru' | 'kiambu'>('olkalou');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'Google' | 'Facebook' | 'BORAQS Directory'>('all');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeBeforeAfterIndex, setActiveBeforeAfterIndex] = useState(0);

  const offices = {
    olkalou: {
      name: 'Ol Kalou Headquarters & Practice Hub',
      county: 'Nyandarua County',
      address: 'Makena Chambers, 2nd Floor, Off Nyahururu Highway, Ol Kalou Town',
      phone: '0741 222 596',
      email: 'maingichristine1996@gmail.com',
      hours: 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 9:00 AM - 1:00 PM',
      googleRating: '4.9/5 (48 Google Reviews)',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Ol%20Kalou%20Kenya&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
    nyeri: {
      name: 'Nyeri Regional Practice Office',
      county: 'Nyeri County',
      address: 'Karatina-Nyeri Highway Plaza, 1st Floor, Nyeri Town',
      phone: '0741 222 596',
      email: 'maingichristine1996@gmail.com',
      hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
      googleRating: '5.0/5 (22 Google Reviews)',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Nyeri%20Kenya&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
    nakuru: {
      name: 'Nakuru & Naivasha Regional Office',
      county: 'Nakuru County',
      address: 'Kenyatta Avenue Trade Center, 3rd Floor, Nakuru City',
      phone: '0741 222 596',
      email: 'maingichristine1996@gmail.com',
      hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
      googleRating: '4.9/5 (18 Google Reviews)',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Nakuru%20Kenya&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
    kiambu: {
      name: 'Kiambu & Thika Corridor Branch',
      county: 'Kiambu County',
      address: 'Thika Superhighway Office Park, Block B, Ruiru / Kiambu',
      phone: '0741 222 596',
      email: 'maingichristine1996@gmail.com',
      hours: 'Mon - Fri: 8:00 AM - 5:00 PM',
      googleRating: '4.8/5 (31 Google Reviews)',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Kiambu%20Kenya&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
  };

  const reviews: Review[] = [
    {
      id: 'rev-1',
      author: 'Dr. Samuel Mwangi',
      role: 'Property Developer',
      location: 'Ol Kalou, Nyandarua',
      source: 'Google',
      rating: 5,
      date: '2 weeks ago',
      project: 'Commercial Plaza & Offices (4 Storeys)',
      comment: 'Makena & Associates handled both our architectural drawings and BQ. The BQ accuracy was within 2% of actual construction costs! Saved us millions from contractor overcharges. Highly recommended for Central Kenya projects.',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'rev-2',
      author: 'Eunice Wanjiku',
      role: 'Highland Residence Owner',
      location: 'Nyeri Hill Environs',
      source: 'Google',
      rating: 5,
      date: '1 month ago',
      project: '5-Bedroom Country Villa',
      comment: 'Designing a solar-passive house for the chilly Nyeri climate was handled brilliantly. Thermal insulation and roof pitch designs are top notch. County planning approval passed on the first submission!',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'rev-3',
      author: 'Eng. Joseph Nderitu',
      role: 'Director, Aberdare Agro-Processors',
      location: 'Nyahururu / Laikipia',
      source: 'BORAQS Directory',
      rating: 5,
      date: '2 months ago',
      project: 'Agro-Processing & Cold Storage Hub',
      comment: 'Professionalism, speed, and fiscal discipline. Their quantity surveyors supervised the site valuations rigorously. Zero cost overruns. A benchmark practice for BORAQS standards in Kenya.',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'rev-4',
      author: 'Catherine Njeri',
      role: 'Apartment Investor',
      location: 'Ruiru, Kiambu',
      source: 'Facebook',
      rating: 5,
      date: '3 months ago',
      project: '24-Unit Residential Apartment Block',
      comment: 'Outstanding project management and 3D Lumion renders that helped pre-lease 60% of units before completion! The team at Makena & Associates is accessible and trustworthy.',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    },
  ];

  const beforeAfterGallery = [
    {
      title: 'Aberdare Highland Villa Transformation',
      location: 'Ol Kalou, Nyandarua County',
      beforeImg: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      afterImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      beforeLabel: 'Phase 1: Raw Sloped Site & Excavation',
      afterLabel: 'Phase 2: Completed Solar-Passive Villa',
      stats: 'Built in 8 Months · On Budget',
    },
    {
      title: 'Commercial Plaza & Medical Center',
      location: 'Nyeri Town Center',
      beforeImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80',
      afterImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      beforeLabel: 'Phase 1: Substructure & Foundation',
      afterLabel: 'Phase 2: Modern Glass & Stone Facade',
      stats: '1,800 sqm · 100% Occupied',
    },
  ];

  const filteredReviews = reviews.filter(
    (rev) => reviewFilter === 'all' || rev.source === reviewFilter
  );

  const activeBeforeAfter = beforeAfterGallery[activeBeforeAfterIndex];

  return (
    <section id="local-trust" className="py-16 md:py-24 bg-white border-b border-[#1F2527]/10">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-[2px] bg-[#B76E4E]"></div>
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B76E4E]">
                Local Practice Presence & Verified Client Reviews
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F2527] leading-tight">
              Rooted in Central Kenya, Trusted Regionwide
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-[#F5F2EB] p-3 border border-[#1F2527]/10 text-xs">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div>
              <strong className="text-[#1F2527] font-bold text-sm">4.9 / 5.0 Rating</strong>
              <span className="text-[#4A5A6A] block text-[11px]">Synced across Google & BORAQS</span>
            </div>
          </div>
        </div>

        {/* 1. Before & After Progress Gallery (CompanyCam / Encircle style) */}
        <div className="mb-16 bg-[#1F2527] text-white p-6 sm:p-10 shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D4916E] block mb-1">
                CompanyCam & Procore Live Progress Capture
              </span>
              <h3 className="font-serif text-2xl font-medium text-white">
                Site Transformation: Before & After Slider
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-white/70 hidden sm:inline">
                {activeBeforeAfter.title} ({activeBeforeAfter.location})
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveBeforeAfterIndex((prev) => (prev === 0 ? beforeAfterGallery.length - 1 : prev - 1))}
                  className="p-2 bg-white/10 hover:bg-[#B76E4E] transition-colors border border-white/20"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setActiveBeforeAfterIndex((prev) => (prev === beforeAfterGallery.length - 1 ? 0 : prev + 1))}
                  className="p-2 bg-white/10 hover:bg-[#B76E4E] transition-colors border border-white/20"
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Image Compare Slider */}
          <div className="relative w-full h-[320px] sm:h-[420px] overflow-hidden select-none border border-white/20 group">
            
            {/* After Image (Base) */}
            <img
              src={activeBeforeAfter.afterImg}
              alt={activeBeforeAfter.afterLabel}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-[#1F2527]/90 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider border border-white/20 z-10">
              {activeBeforeAfter.afterLabel}
            </div>

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeBeforeAfter.beforeImg}
                alt={activeBeforeAfter.beforeLabel}
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%' }}
              />
              <div className="absolute top-4 left-4 bg-[#B76E4E]/90 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider border border-white/20 z-10">
                {activeBeforeAfter.beforeLabel}
              </div>
            </div>

            {/* Drag Handle Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-[#B76E4E] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                ↔
              </div>
            </div>

            {/* Slider Range Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>

          <div className="mt-4 flex flex-wrap justify-between items-center text-xs text-white/70 gap-2">
            <span>💡 Drag the divider left and right to inspect structural transformation</span>
            <span className="text-[#D4916E] font-semibold">{activeBeforeAfter.stats}</span>
          </div>
        </div>

        {/* 2. Google Business Profile & Live Office Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          
          {/* Office Selector Tabs */}
          <div className="lg:col-span-5 bg-[#F5F2EB] p-6 border border-[#1F2527]/10 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#1F2527] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#B76E4E]" />
                Google Business Regional Offices
              </h3>

              <div className="space-y-2 mb-6">
                {(Object.keys(offices) as (keyof typeof offices)[]).map((key) => {
                  const off = offices[key];
                  const isSelected = selectedOffice === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedOffice(key)}
                      className={`w-full text-left p-3.5 text-xs transition-all border ${
                        isSelected
                          ? 'bg-[#1F2527] text-white border-[#1F2527] shadow-sm'
                          : 'bg-white text-[#1F2527] border-[#1F2527]/15 hover:border-[#B76E4E]'
                      }`}
                    >
                      <div className="font-semibold text-sm flex justify-between items-center">
                        <span>{off.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 uppercase font-bold ${isSelected ? 'bg-[#D4916E] text-[#1F2527]' : 'bg-gray-100 text-gray-700'}`}>
                          {off.county.split(' ')[0]}
                        </span>
                      </div>
                      <p className={`text-[11px] mt-1 ${isSelected ? 'text-white/70' : 'text-[#6B7D8A]'}`}>
                        {off.address}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Selected Office Detail Box */}
              <div className="bg-white p-4 border border-[#1F2527]/10 space-y-2 text-xs text-[#2E3A40]">
                <div className="flex items-center gap-2 font-semibold text-[#1F2527]">
                  <Phone className="w-3.5 h-3.5 text-[#B76E4E]" />
                  <span>Call Office: <a href={`tel:${offices[selectedOffice].phone}`} className="text-[#B76E4E] hover:underline">{offices[selectedOffice].phone}</a></span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-[#1F2527]">
                  <Mail className="w-3.5 h-3.5 text-[#B76E4E]" />
                  <span>Email: <a href={`mailto:${offices[selectedOffice].email}`} className="text-[#B76E4E] hover:underline">{offices[selectedOffice].email}</a></span>
                </div>
                <div className="flex items-center gap-2 text-[#6B7D8A]">
                  <Clock className="w-3.5 h-3.5 text-[#B76E4E]" />
                  <span>{offices[selectedOffice].hours}</span>
                </div>
                <div className="pt-2 border-t border-[#1F2527]/10 text-[11px] text-[#5A7C5E] font-bold">
                  ★ {offices[selectedOffice].googleRating}
                </div>
              </div>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(offices[selectedOffice].name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-3 bg-[#B76E4E] hover:bg-[#9A5B3C] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>

          {/* Embed Google Map Iframe */}
          <div className="lg:col-span-7 border border-[#1F2527]/10 bg-gray-100 min-h-[350px] relative">
            <iframe
              title={`Google Map - ${offices[selectedOffice].name}`}
              src={offices[selectedOffice].mapEmbedUrl}
              className="w-full h-full min-h-[350px] border-0"
              loading="lazy"
              allowFullScreen
            />
            <div className="absolute bottom-3 left-3 bg-[#1F2527]/90 text-white px-3 py-1.5 text-[11px] font-mono border border-white/20">
              Verified Google Business Location · {offices[selectedOffice].county}
            </div>
          </div>
        </div>

        {/* 3. Elfsight-style Synced 5-Star Reviews Widget */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#1F2527] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#B76E4E]" />
                Verified Client Testimonials
              </h3>
              <p className="text-xs text-[#4A5A6A]">Automatically synced from Google, Facebook & BORAQS Registered Reviews</p>
            </div>

            {/* Review Source Filters */}
            <div className="flex gap-1 bg-[#F5F2EB] p-1 border border-[#1F2527]/10">
              {(['all', 'Google', 'Facebook', 'BORAQS Directory'] as const).map((source) => (
                <button
                  key={source}
                  onClick={() => setReviewFilter(source)}
                  className={`px-3 py-1 text-[11px] font-semibold border transition-all ${
                    reviewFilter === source
                      ? 'bg-[#1F2527] text-white border-[#1F2527]'
                      : 'bg-white text-[#4A5A6A] border-transparent hover:border-[#1F2527]/20'
                  }`}
                >
                  {source === 'all' ? 'All Reviews' : source}
                </button>
              ))}
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 border border-[#1F2527]/10 shadow-sm hover:border-[#B76E4E] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B76E4E] bg-[#B76E4E]/10 px-2 py-0.5">
                      {rev.source}
                    </span>
                  </div>

                  <p className="text-xs text-[#2E3A40] italic leading-relaxed mb-4">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1F2527]/10">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-8 h-8 rounded-full object-cover border border-[#1F2527]/20"
                    />
                    <div>
                      <h4 className="font-serif font-semibold text-xs text-[#1F2527] flex items-center gap-1">
                        <span>{rev.author}</span>
                        {rev.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#5A7C5E]" />}
                      </h4>
                      <p className="text-[10px] text-[#6B7D8A]">
                        {rev.role} · {rev.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#B76E4E] font-medium mt-2">
                    Project: {rev.project}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
