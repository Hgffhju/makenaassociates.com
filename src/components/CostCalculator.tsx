import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, DollarSign, Clock, ShieldCheck, FileSpreadsheet, Building, Sparkles, BookmarkPlus, Check, User as UserIcon } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { CostEstimateResult } from '../types';

interface CostCalculatorProps {
  onAttachToConsultation?: (summary: string) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onAttachToConsultation }) => {
  const { currentUser, loginWithGoogle } = useAuth();
  const [sector, setSector] = useState<string>('residential-villa');
  const [location, setLocation] = useState<string>('highlands');
  const [areaSqm, setAreaSqm] = useState<number>(300);
  const [specLevel, setSpecLevel] = useState<'Standard' | 'Premium' | 'Luxury'>('Premium');
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');
  const [attached, setAttached] = useState(false);
  const [savingToDb, setSavingToDb] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // KES Exchange Rate
  const USD_RATE = 130; // 1 USD = 130 KES approx

  const result: CostEstimateResult = useMemo(() => {
    // Base Rates per sqm in KES
    let baseRateSqm = 42000;

    switch (sector) {
      case 'residential-villa':
        baseRateSqm = specLevel === 'Standard' ? 38000 : specLevel === 'Premium' ? 52000 : 72000;
        break;
      case 'residential-apartments':
        baseRateSqm = specLevel === 'Standard' ? 36000 : specLevel === 'Premium' ? 46000 : 62000;
        break;
      case 'commercial-office':
        baseRateSqm = specLevel === 'Standard' ? 40000 : specLevel === 'Premium' ? 55000 : 78000;
        break;
      case 'institutional':
        baseRateSqm = specLevel === 'Standard' ? 34000 : specLevel === 'Premium' ? 45000 : 58000;
        break;
      case 'industrial':
        baseRateSqm = specLevel === 'Standard' ? 26000 : specLevel === 'Premium' ? 35000 : 48000;
        break;
      default:
        baseRateSqm = 45000;
    }

    // Location Multiplier (Highland stone logistics vs Nairobi metro)
    let locMultiplier = 1.0;
    if (location === 'highlands') locMultiplier = 0.96; // Savings using local quarry stone
    if (location === 'coast') locMultiplier = 1.08;
    if (location === 'remote') locMultiplier = 1.12;

    const ratePerSqm = baseRateSqm * locMultiplier;
    const totalConstructionBase = areaSqm * ratePerSqm;

    const minConst = totalConstructionBase * 0.95;
    const maxConst = totalConstructionBase * 1.08;

    // Professional Fee Calculations (BORAQS / AAK Scale ~ 6% total)
    const archFeePct = 0.035; // 3.5%
    const qsFeePct = 0.025;   // 2.5%

    const avgConst = totalConstructionBase;
    const architecturalFee = avgConst * archFeePct;
    const qsFee = avgConst * qsFeePct;
    const totalProfessionalFees = architecturalFee + qsFee;

    // Integrated Architecture + QS estimated savings
    const integratedSavingsEstimate = avgConst * 0.08;

    // Duration Estimation
    let durationMonths = Math.ceil(Math.sqrt(areaSqm) * 0.7);
    if (durationMonths < 6) durationMonths = 6;
    if (durationMonths > 36) durationMonths = 36;

    // Permit Approval Timeline
    const approvalTimeWeeks = location === 'highlands' ? 6 : 8;

    return {
      minConstructionCost: minConst,
      maxConstructionCost: maxConst,
      architecturalFee,
      qsFee,
      totalProfessionalFees,
      integratedSavingsEstimate,
      estimatedDurationMonths: durationMonths,
      approvalTimeWeeks,
    };
  }, [sector, location, areaSqm, specLevel]);

  const formatMoney = (amountKES: number) => {
    if (currency === 'USD') {
      const amountUSD = amountKES / USD_RATE;
      return `$${amountUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
    return `KES ${(amountKES / 1000000).toFixed(2)}M`;
  };

  const handleAttach = () => {
    if (onAttachToConsultation) {
      const summaryText = `[Cost Estimate Attached] Sector: ${sector}, Area: ${areaSqm} sqm, Spec: ${specLevel}, Location: ${location}. Est Budget: ${formatMoney(result.minConstructionCost)} - ${formatMoney(result.maxConstructionCost)} (${currency}). Est Professional Fees: ${formatMoney(result.totalProfessionalFees)}.`;
      onAttachToConsultation(summaryText);
      setAttached(true);
      setTimeout(() => setAttached(false), 4000);
    }
  };

  const handleSaveToFirebase = async () => {
    if (!currentUser) {
      await loginWithGoogle();
      return;
    }

    setSavingToDb(true);
    const estimateId = `est_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    const estimatePayload = {
      title: `${sector.toUpperCase()} (${areaSqm} sqm, ${location})`,
      buildingType: sector,
      finishLevel: specLevel,
      grossFloorArea: areaSqm,
      estimatedCostKes: Math.round((result.minConstructionCost + result.maxConstructionCost) / 2),
      notes: `Location: ${location}, Est Duration: ${result.estimatedDurationMonths} mos, Prof Fees KES: ${Math.round(result.totalProfessionalFees)}`,
      userId: currentUser.uid,
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'estimates', estimateId), estimatePayload);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Error saving estimate to Firebase:', err);
      try {
        handleFirestoreError(err, OperationType.CREATE, `estimates/${estimateId}`);
      } catch (formattedErr) {
        alert('Could not save estimate to database. Please check permissions.');
      }
    } finally {
      setSavingToDb(false);
    }
  };

  return (
    <section id="estimator" className="py-16 md:py-24 bg-white border-b border-[#1F2527]/10">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-[2px] bg-[#B76E4E]"></div>
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#B76E4E]">
              Interactive Estimator
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F2527] leading-tight">
            Kenya Construction Cost & Professional Fee Estimator
          </h2>
          <p className="text-[#4A5A6A] text-sm sm:text-base mt-3 leading-relaxed">
            Estimate your building budget, BORAQS/AAK professional fees, and projected timeline based on gazetted fee scales and current Kenyan construction material benchmarks.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Inputs Column */}
          <div className="lg:col-span-6 bg-[#F5F2EB] p-6 sm:p-8 space-y-6 border border-[#1F2527]/10 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#1F2527]/10 pb-4">
              <h3 className="font-serif text-lg font-semibold text-[#1F2527] flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#B76E4E]" />
                Project Parameters
              </h3>
              <div className="flex items-center gap-1 text-xs bg-white p-1 border border-[#1F2527]/10">
                <button
                  type="button"
                  onClick={() => setCurrency('KES')}
                  className={`px-2.5 py-1 font-semibold transition-colors ${currency === 'KES' ? 'bg-[#1F2527] text-white' : 'text-[#4A5A6A]'}`}
                >
                  KES
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 font-semibold transition-colors ${currency === 'USD' ? 'bg-[#1F2527] text-white' : 'text-[#4A5A6A]'}`}
                >
                  USD
                </button>
              </div>
            </div>

            {/* Sector Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F2527] mb-2">
                Project Sector / Building Type
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2.5 text-sm text-[#1F2527] focus:border-[#B76E4E] outline-none"
              >
                <option value="residential-villa">Residential — Country Villa / Custom House</option>
                <option value="residential-apartments">Residential — Apartment Block / Townhouses</option>
                <option value="commercial-office">Commercial — Office Building / Retail Plaza</option>
                <option value="institutional">Institutional — School, College, or Medical Facility</option>
                <option value="industrial">Industrial — Warehouse, Processing Plant, Go-Down</option>
              </select>
            </div>

            {/* Location in Kenya */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F2527] mb-2">
                Target County / Location (Central Kenya & Environs)
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white border border-[#1F2527]/20 px-3.5 py-2.5 text-sm text-[#1F2527] focus:border-[#B76E4E] outline-none"
              >
                <option value="highlands">Nyandarua & Ol Kalou (Ol Kalou, Nyahururu, Engineer, Kinangop)</option>
                <option value="nyeri">Nyeri, Kirinyaga & Murang'a (Nyeri, Karatina, Kerugoya, Murang'a)</option>
                <option value="kiambu">Kiambu & Thika Corridor (Kiambu, Ruiru, Thika, Limuru)</option>
                <option value="nakuru">Nakuru, Naivasha & Gilgil (Nakuru, Naivasha, Gilgil)</option>
                <option value="laikipia">Laikipia & Nanyuki (Nanyuki, Rumuruti, Timau)</option>
                <option value="nairobi">Nairobi Metro & Environs (Nairobi, Kajiado, Machakos)</option>
                <option value="other">Other Kenya Region</option>
              </select>
            </div>

            {/* Floor Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#1F2527]">
                  Total Built Floor Area (sq.m)
                </label>
                <span className="font-mono text-sm font-bold text-[#B76E4E] bg-white px-2 py-0.5 border border-[#1F2527]/10">
                  {areaSqm} sq.m ({Math.round(areaSqm * 10.7639)} sq.ft)
                </span>
              </div>
              <input
                type="range"
                min="80"
                max="3000"
                step="20"
                value={areaSqm}
                onChange={(e) => setAreaSqm(Number(e.target.value))}
                className="w-full accent-[#B76E4E] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#6B7D8A] mt-1 font-mono">
                <span>80 sqm (Starter Home)</span>
                <span>500 sqm (Villa)</span>
                <span>3000 sqm (Plaza)</span>
              </div>
            </div>

            {/* Specification Level */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F2527] mb-2">
                Finishing & Specification Standard
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Standard', 'Premium', 'Luxury'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSpecLevel(level)}
                    className={`py-2 text-xs font-semibold border transition-all ${
                      specLevel === level
                        ? 'bg-[#1F2527] text-white border-[#1F2527]'
                        : 'bg-white text-[#4A5A6A] border-[#1F2527]/20 hover:border-[#1F2527]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-6 bg-[#1F2527] text-white p-6 sm:p-8 space-y-6 shadow-xl relative">
            <div className="border-b border-white/10 pb-4 flex justify-between items-center">
              <h3 className="font-serif text-lg font-medium text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#B76E4E]" />
                Estimated Cost & Fee Breakdown
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4916E] bg-white/10 px-2 py-0.5">
                BORAQS / AAK Rates
              </span>
            </div>

            {/* Main Construction Cost Range */}
            <div className="bg-white/5 p-5 border border-white/10">
              <span className="text-xs uppercase tracking-widest text-white/60 block mb-1">
                Estimated Construction Cost Range
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D4916E]">
                {formatMoney(result.minConstructionCost)} – {formatMoney(result.maxConstructionCost)}
              </div>
              <p className="text-[11px] text-white/50 mt-1">
                Based on ~{Math.round(result.minConstructionCost / areaSqm).toLocaleString()} KES/sqm benchmark for {specLevel} specification.
              </p>
            </div>

            {/* Professional Fees Table */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-white/70">Architectural Design & Supervision (AAK ~3.5%):</span>
                <span className="font-mono font-bold text-white">{formatMoney(result.architecturalFee)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-white/70">Quantity Surveying & BQ (BORAQS ~2.5%):</span>
                <span className="font-mono font-bold text-white">{formatMoney(result.qsFee)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/20 font-semibold text-sm">
                <span className="text-[#D4916E]">Total Professional Fees:</span>
                <span className="font-mono text-[#D4916E]">{formatMoney(result.totalProfessionalFees)}</span>
              </div>
            </div>

            {/* Integrated QS Advantage Highlight */}
            <div className="bg-[#5A7C5E]/20 p-4 border border-[#5A7C5E]/40 text-xs space-y-1">
              <div className="font-bold text-[#D4916E] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-4 h-4 text-[#5A7C5E]" />
                Integrated Architecture + QS Savings Advantage
              </div>
              <p className="text-white/80 leading-relaxed">
                By combining design and quantity surveying under Makena & Associates, you avoid scope overlaps and variation claims — saving an estimated <strong className="text-white font-mono">{formatMoney(result.integratedSavingsEstimate)}</strong>.
              </p>
            </div>

            {/* Timeline Estimates */}
            <div className="grid grid-cols-2 gap-4 text-xs pt-1">
              <div className="bg-white/5 p-3">
                <span className="text-white/50 block text-[10px] uppercase">Est. Construction Duration</span>
                <span className="font-serif text-lg font-bold text-white mt-0.5 block">
                  ~{result.estimatedDurationMonths} Months
                </span>
              </div>
              <div className="bg-white/5 p-3">
                <span className="text-white/50 block text-[10px] uppercase">NCA / County Approvals</span>
                <span className="font-serif text-lg font-bold text-white mt-0.5 block">
                  ~{result.approvalTimeWeeks} Weeks
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAttach}
                className="py-3 bg-[#B76E4E] hover:bg-[#9A5B3C] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                {attached ? (
                  <span>✓ Attached to Form</span>
                ) : (
                  <>
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Attach to Form</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleSaveToFirebase}
                disabled={savingToDb}
                className="py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                {savedSuccess ? (
                  <span className="text-[#5A7C5E] font-bold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Saved to Firebase!
                  </span>
                ) : (
                  <>
                    <BookmarkPlus className="w-4 h-4 text-[#D4916E]" />
                    <span>{currentUser ? 'Save to Firebase' : 'Sign In & Save'}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
