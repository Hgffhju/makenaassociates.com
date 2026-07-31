import React, { useState } from 'react';
import { Briefcase, CheckCircle2, ShieldAlert, ArrowRight, Send, RefreshCcw, DollarSign, Award, MapPin, Building, FileCheck, Info, User as UserIcon } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

export const CareersSection: React.FC = () => {
  const { currentUser, loginWithGoogle } = useAuth();

  const [fullName, setFullName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('Senior / Project Architect (BORAQS Registered)');
  const [registrationDetails, setRegistrationDetails] = useState('');
  const [experienceYears, setExperienceYears] = useState('3-5 Years');
  const [county, setCounty] = useState('Nyandarua (Ol Kalou / HQ)');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [mpesaTransactionCode, setMpesaTransactionCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const positionsList = [
    {
      title: 'Senior / Project Architect',
      type: 'Full-time / Associate',
      reg: 'BORAQS / AAK Registered',
      location: 'Ol Kalou HQ / Field Operations',
      desc: 'Lead highland architectural design, client briefings, county planning approvals, and site supervision.',
    },
    {
      title: 'Senior Quantity Surveyor & Cost Planner',
      type: 'Full-time',
      reg: 'BORAQS Registered',
      location: 'Central Kenya & Environs',
      desc: 'Prepare Bills of Quantities (BQ), cost plans, tender documents, and monthly valuation certificates.',
    },
    {
      title: 'Graduate Quantity Surveyor / Assistant QS',
      type: 'Graduate Trainee',
      reg: 'BSc QS (BORAQS Candidate)',
      location: 'Ol Kalou / Nyeri',
      desc: 'Assist senior QS team in material take-offs, site measurements, and sub-contractor bill analysis.',
    },
    {
      title: 'Architectural Drafter & 3D Visualizer',
      type: 'Full-time / Contract',
      reg: 'Diploma / BSc Architecture',
      location: 'Hybrid / Ol Kalou',
      desc: 'Produce high-detail working drawings, ArchiCAD/Revit BIM models, and photorealistic 3D Lumion renders.',
    },
    {
      title: 'Civil & Structural Engineer',
      type: 'Project-based Consultant',
      reg: 'EBK Licensed / IEK Member',
      location: 'Central Kenya Sites',
      desc: 'Structural modeling, foundation engineering for highland clay soils, and site reinforcement checks.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !mpesaTransactionCode.trim()) {
      setErrorMsg('Please complete all required fields including your M-Pesa Transaction Code.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const refCode = `JOB-${Math.floor(100000 + Math.random() * 900000)}`;
    const applicationId = `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const payload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      position,
      registrationDetails: registrationDetails.trim() || 'N/A',
      experienceYears,
      county,
      portfolioUrl: portfolioUrl.trim() || 'N/A',
      coverNote: coverNote.trim() || 'N/A',
      mpesaTransactionCode: mpesaTransactionCode.trim().toUpperCase(),
      feeAmountKes: 350,
      status: 'Pending Verification',
      userId: currentUser?.uid || '',
      createdAt: new Date().toISOString(),
    };

    try {
      // 1. Save to Firestore DB
      await setDoc(doc(db, 'job_applications', applicationId), payload);

      // 2. Fallback backend sync call
      try {
        await fetch('/api/careers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, referenceCode: refCode }),
        });
      } catch (apiErr) {
        console.warn('API careers endpoint notice:', apiErr);
      }

      setSubmittedRef(refCode);
    } catch (err) {
      console.error('Job application submission error:', err);
      try {
        handleFirestoreError(err, OperationType.CREATE, `job_applications/${applicationId}`);
      } catch (formattedErr) {
        setErrorMsg('Failed to submit application. Please check your connection and retry.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="careers" className="py-16 md:py-24 bg-[#F5F2EB] border-b border-[#1F2527]/10">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-[2px] bg-[#B76E4E]"></div>
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B76E4E]">
              Careers & Practice Recruitment
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F2527] leading-tight">
            Join Our Practice Team in Central Kenya & Environs
          </h2>

          <p className="text-[#4A5A6A] text-sm sm:text-base mt-3 leading-relaxed">
            Makena & Associates is actively expanding its architectural and quantity surveying capacity across Nyandarua, Nyeri, Kiambu, Nakuru, Kirinyaga, Murang'a, Laikipia, and Nairobi. We welcome qualified professionals and talented graduates committed to structural excellence.
          </p>
        </div>

        {/* Available Roles Grid */}
        <div className="mb-14">
          <h3 className="font-serif text-xl font-semibold text-[#1F2527] mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#B76E4E]" />
            Current Professional Openings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positionsList.map((job, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 border border-[#1F2527]/10 hover:border-[#B76E4E] transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#B76E4E] bg-[#B76E4E]/10 px-2.5 py-1">
                      {job.type}
                    </span>
                    <span className="text-[10px] text-[#4A5A6A] font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#B76E4E]" />
                      {job.location}
                    </span>
                  </div>

                  <h4 className="font-serif font-semibold text-lg text-[#1F2527] mb-1">
                    {job.title}
                  </h4>

                  <p className="text-[11px] font-medium text-[#5A7C5E] mb-3 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    {job.reg}
                  </p>

                  <p className="text-xs text-[#4A5A6A] leading-relaxed mb-4">
                    {job.desc}
                  </p>
                </div>

                <a
                  href="#application-form"
                  onClick={() => setPosition(job.title)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#1F2527] hover:text-[#B76E4E] uppercase tracking-wider pt-3 border-t border-[#1F2527]/10"
                >
                  <span>Apply for this role</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form & Refund Guarantee Section */}
        <div id="application-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: KES 350 Fee & Refund Policy Explanation */}
          <div className="lg:col-span-5 bg-[#1F2527] text-white p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D4916E] block mb-1">
                Recruitment Transparency & Vetting
              </span>
              <h3 className="font-serif text-2xl font-medium text-white leading-snug">
                Application Vetting Fee & Policy
              </h3>
            </div>

            {/* KES 350 Highlight Box */}
            <div className="bg-white/10 p-5 border border-white/20 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-wider text-white/70">Registration Fee:</span>
                <span className="font-serif text-2xl font-bold text-[#D4916E]">KES 350</span>
              </div>

              {/* Refundable Guarantee Badge */}
              <div className="bg-[#5A7C5E] text-white px-3 py-2 text-xs font-semibold flex items-center gap-2 border border-white/20">
                <RefreshCcw className="w-4 h-4 shrink-0 text-amber-200" />
                <span>100% Refundable if not shortlisted for interview</span>
              </div>

              <p className="text-xs text-white/80 leading-relaxed pt-1">
                To eliminate spam submissions and cover BORAQS/AAK membership credentials verification, we require a nominal <strong className="text-white">KES 350 registration fee</strong>.
              </p>
              
              <p className="text-xs text-[#D4916E] font-medium leading-relaxed">
                ✓ If your application is not qualified or shortlisted for an interview, your KES 350 will be automatically refunded in full back to your M-Pesa line.
              </p>
            </div>

            {/* M-Pesa Payment Instructions */}
            <div className="space-y-3 border-t border-white/10 pt-4 text-xs">
              <h4 className="font-serif font-semibold text-white text-sm flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#B76E4E]" />
                How to Pay via M-Pesa
              </h4>

              <div className="bg-white/5 p-3.5 space-y-2 border border-white/10 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-white/60">Payment Target:</span>
                  <span className="text-white font-bold">Makena & Associates Recruitment</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Phone Number:</span>
                  <span className="text-[#D4916E] font-bold">0741 222 596</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Till / Buy Goods:</span>
                  <span className="text-[#D4916E] font-bold">892 410</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-1.5">
                  <span className="text-white/60">Amount:</span>
                  <span className="text-white font-bold">KES 350.00</span>
                </div>
              </div>

              <p className="text-[11px] text-white/60 leading-relaxed">
                After completing the M-Pesa payment, copy the 10-character transaction code (e.g. <span className="font-mono text-white">SJK892KL01</span>) and paste it into the application form.
              </p>
            </div>

            <div className="text-[11px] text-white/50 space-y-1 pt-2">
              <p>• Refund status is updated directly in the Client/Applicant Portal.</p>
              <p>• Direct inquiries: <a href="mailto:maingichristine1996@gmail.com" className="text-[#D4916E] underline">maingichristine1996@gmail.com</a></p>
            </div>
          </div>

          {/* Right Side: Candidate Application Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-[#1F2527]/10 shadow-md">
            
            {submittedRef ? (
              <div className="p-6 border-2 border-[#5A7C5E] space-y-4 text-center">
                <div className="w-14 h-14 bg-[#5A7C5E]/20 text-[#5A7C5E] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-serif text-2xl font-semibold text-[#1F2527]">
                  Application Submitted & Saved
                </h3>

                <p className="text-xs sm:text-sm text-[#4A5A6A] leading-relaxed max-w-md mx-auto">
                  Thank you, <strong className="text-[#1F2527]">{fullName}</strong>. Your job application and M-Pesa transaction code (<strong className="font-mono text-[#B76E4E]">{mpesaTransactionCode}</strong>) have been recorded in our recruitment database.
                </p>

                <div className="bg-[#F5F2EB] p-4 font-mono text-xs text-[#1F2527] inline-block border border-[#1F2527]/10">
                  Application Reference: <strong className="text-[#B76E4E]">{submittedRef}</strong>
                </div>

                <div className="bg-amber-50 text-amber-900 p-3 text-xs border border-amber-200 text-left max-w-md mx-auto leading-relaxed">
                  <strong>Refund Guarantee Notice:</strong> If your profile is not qualified or shortlisted for an interview, your KES 350 registration fee will be refunded back to your phone line within 7 business days. You can track your application status anytime in the Portal.
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmittedRef(null);
                    setMpesaTransactionCode('');
                    setCoverNote('');
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#1F2527] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1F2527]/10 pb-3">
                  <h3 className="font-serif text-xl font-semibold text-[#1F2527]">
                    Submit Professional Application
                  </h3>

                  {currentUser ? (
                    <div className="flex items-center gap-1.5 text-xs text-[#5A7C5E] font-medium">
                      <UserIcon className="w-3.5 h-3.5" />
                      <span>{currentUser.displayName || currentUser.email}</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={loginWithGoogle}
                      className="text-xs font-semibold text-[#B76E4E] hover:underline"
                    >
                      Sign in with Google
                    </button>
                  )}
                </div>

                {errorMsg && (
                  <div className="bg-red-50 text-red-800 p-3 text-xs border border-red-200">
                    {errorMsg}
                  </div>
                )}

                {/* Candidate Personal Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arch. David Kamau"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                      Target Position *
                    </label>
                    <select
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E]"
                    >
                      <option>Senior / Project Architect (BORAQS Registered)</option>
                      <option>Senior Quantity Surveyor & Cost Planner</option>
                      <option>Graduate Quantity Surveyor / Assistant QS</option>
                      <option>Architectural Drafter & 3D Visualizer</option>
                      <option>Civil & Structural Engineer</option>
                      <option>Construction Site Inspector / Clerk of Works</option>
                    </select>
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
                      placeholder="david@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                      Phone Number (M-Pesa Line) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="07XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E]"
                    />
                  </div>
                </div>

                {/* Professional Qualifications */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                      BORAQS / AAK / EBK Reg No.
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. BORAQS A/123 or Graduate"
                      value={registrationDetails}
                      onChange={(e) => setRegistrationDetails(e.target.value)}
                      className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                      Experience Level
                    </label>
                    <select
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E]"
                    >
                      <option>Graduate / 0-2 Years</option>
                      <option>3-5 Years</option>
                      <option>6-10 Years</option>
                      <option>10+ Senior Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                      Preferred County Base
                    </label>
                    <select
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E]"
                    >
                      <option>Nyandarua (Ol Kalou / HQ)</option>
                      <option>Nyeri & Kirinyaga</option>
                      <option>Kiambu & Thika Corridor</option>
                      <option>Nakuru & Naivasha</option>
                      <option>Laikipia & Nanyuki</option>
                      <option>Nairobi Metro & Environs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                    Portfolio / CV Link (Google Drive, Behance, LinkedIn)
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/file/d/..."
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1F2527] mb-1">
                    Professional Summary / Cover Note
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Highlight your key project experience, software proficiency (ArchiCAD, AutoCAD, QS CAD, Revit), and availability..."
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    className="w-full bg-white border border-[#1F2527]/20 p-3 text-xs text-[#1F2527] outline-none focus:border-[#B76E4E] resize-none"
                  />
                </div>

                {/* M-Pesa Transaction Code Verification */}
                <div className="bg-[#F5F2EB] p-4 border-2 border-[#B76E4E] space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F2527]">
                      M-Pesa Transaction Code (KES 350 Fee) *
                    </label>
                    <span className="text-[10px] text-[#5A7C5E] font-bold uppercase tracking-wider bg-[#5A7C5E]/15 px-2 py-0.5">
                      Refundable Fee
                    </span>
                  </div>

                  <p className="text-[11px] text-[#4A5A6A]">
                    Enter the 10-character code received from M-Pesa after paying KES 350 to <strong className="text-[#1F2527]">0741 222 596</strong> or Till <strong className="text-[#1F2527]">892 410</strong>.
                  </p>

                  <input
                    type="text"
                    required
                    placeholder="e.g. SJK892KL01"
                    value={mpesaTransactionCode}
                    onChange={(e) => setMpesaTransactionCode(e.target.value)}
                    className="w-full bg-white border border-[#1F2527]/30 px-3.5 py-2.5 text-sm font-mono uppercase text-[#1F2527] font-bold tracking-widest outline-none focus:border-[#B76E4E]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#1F2527] hover:bg-[#B76E4E] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  {loading ? (
                    <span>Submitting Application & Saving Fee Record...</span>
                  ) : (
                    <>
                      <span>Submit Application & Verification Code</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-[#6B7D8A] text-center leading-relaxed">
                  By submitting, you confirm that your M-Pesa reference is accurate. Unshortlisted applicants receive a 100% refund of KES 350 back to their M-Pesa line.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
