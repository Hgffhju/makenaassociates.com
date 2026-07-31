import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, Facebook, Linkedin, Twitter, Download, Megaphone, Sparkles, Tag, ExternalLink, Code, Layers } from 'lucide-react';

const adBannerImage = '/src/assets/images/makena_ad_banner_1785505020284.jpg';

interface AdCampaignSectionProps {
  onOpenConsultation?: () => void;
  onOpenCalculator?: () => void;
}

export const AdCampaignSection: React.FC<AdCampaignSectionProps> = ({
  onOpenConsultation,
  onOpenCalculator,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'whatsapp' | 'facebook' | 'linkedin' | 'x'>('whatsapp');

  const shareUrl = window.location.href;
  const shareTitle = 'Makena & Associates - Premier Architects & Quantity Surveyors (Kenya)';
  const shareText = `Build with Confidence! 🏛️ Makena & Associates offer BORAQS-certified Architectural Design, Quantity Surveying (BQ), and County Building Approval in Nyandarua, Nyeri, Nakuru & Kiambu. Get an instant project cost estimate online:`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const embedCode = `<iframe src="${shareUrl}" width="100%" height="600" frameborder="0" title="Makena & Associates Architects Cost Estimator"></iframe>`;

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    window.open(url, '_blank');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleLinkedinShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="campaigns" className="py-16 md:py-24 bg-[#F5F2EB] border-b border-[#1F2527]/10">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Header Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <Megaphone className="w-4 h-4 text-[#B76E4E]" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B76E4E]">
                Official Marketing & Media Showcase
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F2527] leading-tight">
              Promote & Share Practice Services
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 border border-[#1F2527]/10 shadow-sm text-xs">
            <Tag className="w-4 h-4 text-[#B76E4E]" />
            <div>
              <strong className="text-[#1F2527] block font-bold">Limited Offer: Free Initial Feasibility</strong>
              <span className="text-[#4A5A6A] text-[11px]">Valid for Central Kenya Residential & Commercial Builds</span>
            </div>
          </div>
        </div>

        {/* Featured Ad Banner & Share Suite Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Ad Visual Display */}
          <div className="lg:col-span-7 bg-[#1F2527] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl border border-[#1F2527]">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-[#B76E4E] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                  OFFICIAL PRACTICE CAMPAIGN 2026
                </span>
                <span className="text-xs font-mono text-white/70">Ref: MKN-AD-2026</span>
              </div>

              <div className="overflow-hidden border border-white/20 my-4 shadow-lg group">
                <img
                  src={adBannerImage}
                  alt="Makena & Associates Official Promotional Banner"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white leading-snug">
                "Build Smart, On Budget & Fully Compliant with Makena & Associates"
              </h3>

              <p className="text-xs text-white/80 leading-relaxed">
                Registered BORAQS Architectural Consultants & Quantity Surveyors delivering cost-optimized building designs, structural integrity, and guaranteed county planning approvals across Nyandarua, Nyeri, Nakuru, and Kiambu counties.
              </p>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-wrap gap-3 justify-between items-center">
              <div className="text-xs text-[#D4916E] font-medium flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>30-Second Online Cost Calculator & Calendly Booking</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onOpenCalculator}
                  className="px-4 py-2 bg-[#B76E4E] hover:bg-[#9A5B3C] text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  Estimate Cost
                </button>
                <button
                  onClick={onOpenConsultation}
                  className="px-4 py-2 bg-white text-[#1F2527] hover:bg-[#D4916E] font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>

          {/* Share & Campaign Tools */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#1F2527]/10 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#1F2527] mb-2 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#B76E4E]" />
                Direct 1-Click Social Sharing
              </h3>
              <p className="text-xs text-[#4A5A6A] mb-6 leading-relaxed">
                Spread the word or share our digital building cost estimator with clients, developers, and partners across social channels.
              </p>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={handleWhatsAppShare}
                  className="py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5A] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={handleFacebookShare}
                  className="py-3 px-4 bg-[#1877F2] hover:bg-[#0F65D6] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </button>

                <button
                  onClick={handleLinkedinShare}
                  className="py-3 px-4 bg-[#0A66C2] hover:bg-[#08529C] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </button>

                <button
                  onClick={handleTwitterShare}
                  className="py-3 px-4 bg-[#000000] hover:bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Twitter className="w-4 h-4" />
                  <span>X (Twitter)</span>
                </button>
              </div>

              {/* Copy URL Box */}
              <div className="space-y-2 mb-6">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527]">
                  Copy Web Link to Share
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 bg-[#F5F2EB] border border-[#1F2527]/20 px-3 py-2 text-xs font-mono text-[#1F2527] outline-none select-all"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-4 py-2 font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      copiedLink
                        ? 'bg-[#5A7C5E] text-white'
                        : 'bg-[#1F2527] text-white hover:bg-[#B76E4E]'
                    }`}
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Embed Code Widget */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#B76E4E]" />
                  <span>Embed Estimator Widget on Real Estate Website</span>
                </label>
                <div className="relative">
                  <textarea
                    readOnly
                    rows={2}
                    value={embedCode}
                    className="w-full bg-[#F5F2EB] border border-[#1F2527]/20 p-2.5 text-[11px] font-mono text-[#1F2527] outline-none resize-none"
                  />
                  <button
                    onClick={handleCopyEmbed}
                    className="absolute bottom-2 right-2 px-3 py-1 bg-[#1F2527] hover:bg-[#B76E4E] text-white text-[10px] font-bold uppercase tracking-wider transition-colors"
                  >
                    {copiedEmbed ? 'Code Copied!' : 'Copy iFrame HTML'}
                  </button>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-[#1F2527]/10 mt-6 text-[11px] text-[#6B7D8A]">
              📢 Need custom advertising banners or press kits for property magazines? Contact <a href="mailto:maingichristine1996@gmail.com" className="text-[#B76E4E] underline font-semibold">maingichristine1996@gmail.com</a>.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
