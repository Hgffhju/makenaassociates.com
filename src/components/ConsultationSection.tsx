import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Calculator, ShieldCheck, User as UserIcon } from 'lucide-react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

interface ConsultationSectionProps {
  attachedEstimateNote?: string;
  onClearAttachedEstimate?: () => void;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
  attachedEstimateNote,
  onClearAttachedEstimate,
}) => {
  const { currentUser, loginWithGoogle } = useAuth();
  const [firstName, setFirstName] = useState(currentUser?.displayName?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(currentUser?.displayName?.split(' ').slice(1).join(' ') || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [sector, setSector] = useState('Residential — Country Villa / Custom House');
  const [location, setLocation] = useState('Central Highlands (Ol Kalou / Nyahururu)');
  const [areaSqm, setAreaSqm] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim() || !phone.trim()) return;

    setLoading(true);
    setErrorMessage(null);

    const refCode = `MA-${Math.floor(100000 + Math.random() * 900000)}`;
    const consultationId = `c_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const projectScope = message.trim() || `Inquiry for ${sector} in ${location}. ${areaSqm ? `Area: ${areaSqm}` : ''}`;

    const payload = {
      fullName,
      email: email.trim(),
      phone: phone.trim(),
      serviceType: sector,
      county: location,
      projectScope,
      estimatedBudget: 'Standard',
      preferredDate: new Date().toISOString().split('T')[0],
      attachedEstimate: attachedEstimateNote || 'None',
      status: 'Pending',
      userId: currentUser?.uid || '',
      createdAt: new Date().toISOString(),
    };

    try {
      // 1. Save to Firestore DB
      const consultationRef = doc(db, 'consultations', consultationId);
      await setDoc(consultationRef, payload);

      // 2. Fallback / Server sync endpoint
      try {
        await fetch('/api/consultation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, referenceCode: refCode }),
        });
      } catch (apiErr) {
        console.warn('API sync endpoint notice:', apiErr);
      }

      setSubmittedRef(refCode);
    } catch (err) {
      console.error('Firestore Consultation submission error:', err);
      try {
        handleFirestoreError(err, OperationType.CREATE, `consultations/${consultationId}`);
      } catch (formattedErr) {
        setErrorMessage('Failed to submit consultation request. Please check your network and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-[2px] bg-[#B76E4E]"></div>
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B76E4E]">
                Get in Touch
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F2527] leading-tight">
              Begin with a Structured Practice Consultation
            </h2>

            <p className="text-[#4A5A6A] text-xs sm:text-sm leading-relaxed">
              Every project starts with a structured consultation — not a sales call. We review your brief, site parameters, and budget together and provide an honest assessment of feasibility.
            </p>

            <p className="text-xs sm:text-sm text-[#4A5A6A] leading-relaxed">
              Call us directly on <a href="tel:0741222596" className="font-bold text-[#B76E4E] hover:underline">0741 222 596</a> or complete the form and our team will respond within one business day.
            </p>

            {/* Direct Contact Details */}
            <div className="space-y-4 pt-4 border-t border-[#1F2527]/10 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border border-[#1F2527]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#B76E4E]" />
                </div>
                <div>
                  <strong className="block text-[#1F2527] font-semibold uppercase tracking-wider text-[10px]">Main Practice Office</strong>
                  <span className="text-[#4A5A6A]">Ol Kalou Town, Nyandarua County, Kenya</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border border-[#1F2527]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#B76E4E]" />
                </div>
                <div>
                  <strong className="block text-[#1F2527] font-semibold uppercase tracking-wider text-[10px]">Phone Contact</strong>
                  <a href="tel:0741222596" className="text-[#B76E4E] font-medium hover:underline">0741 222 596</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border border-[#1F2527]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#B76E4E]" />
                </div>
                <div>
                  <strong className="block text-[#1F2527] font-semibold uppercase tracking-wider text-[10px]">Email Address</strong>
                  <a href="mailto:info@makenaassociates.com" className="text-[#B76E4E] font-medium hover:underline">info@makenaassociates.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border border-[#1F2527]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#B76E4E]" />
                </div>
                <div>
                  <strong className="block text-[#1F2527] font-semibold uppercase tracking-wider text-[10px]">Office Hours</strong>
                  <span className="text-[#4A5A6A]">Mon – Fri: 8:00am – 5:00pm · Sat: 8:00am – 12:00pm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form or Submission Confirmation */}
          <div className="lg:col-span-7 bg-[#F5F2EB] p-6 sm:p-10 border border-[#1F2527]/10 shadow-sm relative">
            
            {submittedRef ? (
              <div className="bg-white p-8 border-2 border-[#5A7C5E] space-y-4 text-center">
                <div className="w-14 h-14 bg-[#5A7C5E]/20 text-[#5A7C5E] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-serif text-2xl font-semibold text-[#1F2527]">
                  Consultation Request Saved to Database
                </h3>

                <p className="text-xs sm:text-sm text-[#4A5A6A] leading-relaxed max-w-md mx-auto">
                  Thank you, <strong className="text-[#1F2527]">{firstName}</strong>. Your consultation inquiry has been recorded in our secure Firebase database and sent to our directors.
                </p>

                <div className="bg-[#F5F2EB] p-4 font-mono text-xs text-[#1F2527] inline-block border border-[#1F2527]/10">
                  Reference Code: <strong className="text-[#B76E4E]">{submittedRef}</strong>
                </div>

                <p className="text-xs text-[#6B7D8A]">
                  Our team will review your brief and call or email you within one business day.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSubmittedRef(null);
                    setFirstName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                    if (onClearAttachedEstimate) onClearAttachedEstimate();
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#1F2527] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1F2527]/10 pb-3">
                  <h3 className="font-serif text-xl font-semibold text-[#1F2527]">
                    Request a Consultation
                  </h3>
                  {currentUser ? (
                    <div className="flex items-center gap-2 text-xs text-[#5A7C5E] font-medium">
                      <UserIcon className="w-3.5 h-3.5" />
                      <span>Signed in as {currentUser.displayName || currentUser.email}</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={loginWithGoogle}
                      className="text-xs font-semibold text-[#B76E4E] hover:underline flex items-center gap-1"
                    >
                      <span>Sign in with Google</span>
                    </button>
                  )}
                </div>

                {errorMessage && (
                  <div className="bg-red-50 text-red-800 p-3 text-xs border border-red-200">
                    {errorMessage}
                  </div>
                )}

                {/* Attached Estimate Alert Banner */}
                {attachedEstimateNote && (
                  <div className="bg-[#1F2527] text-white p-3 text-xs flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-[#D4916E] font-medium">
                      <Calculator className="w-4 h-4 shrink-0" />
                      Cost Estimate Attached to Request
                    </span>
                    <button
                      type="button"
                      onClick={onClearAttachedEstimate}
                      className="text-[10px] uppercase underline text-white/70 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mwangi"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0741 222 596"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                      Project Type
                    </label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E]"
                    >
                      <option>Residential — Country Villa / Custom House</option>
                      <option>Residential — Apartment Block</option>
                      <option>Commercial Plaza / Office Tower</option>
                      <option>Mixed-Use Development</option>
                      <option>Institutional / Educational Facility</option>
                      <option>Infrastructure / Water Supply Works</option>
                      <option>Agri-Business Facility</option>
                      <option>Feasibility Study Only</option>
                      <option>Quantity Surveying / BQ Services Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                      Target Location
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E]"
                    >
                      <option>Central Highlands (Ol Kalou / Nyahururu)</option>
                      <option>Nairobi Metro & Environs</option>
                      <option>Rift Valley (Nakuru / Naivasha)</option>
                      <option>Coast Region</option>
                      <option>Other Kenya Location</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                    Estimated Floor Area (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 350 sq.m or 4 floors"
                    value={areaSqm}
                    onChange={(e) => setAreaSqm(e.target.value)}
                    className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                    Tell us about your project brief & timeline
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your site location, key requirements, target timeline, or specific architectural/QS questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-[#1F2527]/20 p-3 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#1F2527] hover:bg-[#B76E4E] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  {loading ? (
                    <span>Submitting Request to Firebase...</span>
                  ) : (
                    <>
                      <span>Submit Consultation Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-[#6B7D8A] text-center">
                  We respect your privacy. Submissions are securely encrypted and stored in Firebase Firestore.
                </p>
              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
