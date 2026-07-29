import React, { useState, useEffect } from 'react';
import { X, User, Shield, CheckCircle, Clock, FileText, Calendar, Filter, LogOut, LogIn, RefreshCw, AlertCircle } from 'lucide-react';
import { collection, query, where, onSnapshot, doc, updateDoc, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ConsultationItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  county: string;
  projectScope: string;
  attachedEstimate: string;
  status: 'Pending' | 'Contacted' | 'Scheduled' | 'Completed' | 'Archived';
  userId?: string;
  createdAt: string;
}

interface EstimateItem {
  id: string;
  title?: string;
  buildingType: string;
  finishLevel: string;
  grossFloorArea: number;
  estimatedCostKes: number;
  notes?: string;
  createdAt: string;
}

export const PortalModal: React.FC<PortalModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, isAdmin, loginWithGoogle, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'consultations' | 'estimates'>('consultations');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  const [consultations, setConsultations] = useState<ConsultationItem[]>([]);
  const [estimates, setEstimates] = useState<EstimateItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !currentUser) {
      setConsultations([]);
      setEstimates([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    // 1. Subscribe to Consultations
    let qConsultations;
    if (isAdmin) {
      qConsultations = query(collection(db, 'consultations'));
    } else {
      qConsultations = query(collection(db, 'consultations'), where('userId', '==', currentUser.uid));
    }

    const unsubConsultations = onSnapshot(
      qConsultations,
      (snapshot) => {
        const list: ConsultationItem[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as ConsultationItem);
        });
        // sort by newest
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setConsultations(list);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching consultations:', err);
        setErrorMsg('Error loading consultations from database.');
        setLoading(false);
      }
    );

    // 2. Subscribe to Saved Estimates
    let qEstimates;
    if (isAdmin) {
      qEstimates = query(collection(db, 'estimates'));
    } else {
      qEstimates = query(collection(db, 'estimates'), where('userId', '==', currentUser.uid));
    }

    const unsubEstimates = onSnapshot(
      qEstimates,
      (snapshot) => {
        const list: EstimateItem[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as EstimateItem);
        });
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setEstimates(list);
      },
      (err) => {
        console.error('Error fetching estimates:', err);
      }
    );

    return () => {
      unsubConsultations();
      unsubEstimates();
    };
  }, [isOpen, currentUser, isAdmin]);

  if (!isOpen) return null;

  const handleUpdateStatus = async (id: string, newStatus: ConsultationItem['status']) => {
    try {
      const docRef = doc(db, 'consultations', id);
      await updateDoc(docRef, { status: newStatus });
    } catch (err) {
      console.error('Failed to update status:', err);
      try {
        handleFirestoreError(err, OperationType.UPDATE, `consultations/${id}`);
      } catch (formatted) {
        alert('Could not update status. Permission denied.');
      }
    }
  };

  const filteredConsultations = consultations.filter((item) => {
    if (statusFilter === 'All') return true;
    return item.status === statusFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col border border-[#1F2527]/20 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1F2527] text-white p-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#B76E4E] flex items-center justify-center text-white font-serif font-bold text-lg">
              M
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold flex items-center gap-2">
                <span>{isAdmin ? 'Practice Directors Portal (Admin)' : 'Client Portal & Saved Inquiries'}</span>
                {isAdmin && (
                  <span className="text-[10px] bg-[#D4916E] text-[#1F2527] font-bold px-2 py-0.5 uppercase tracking-wider">
                    ADMIN
                  </span>
                )}
              </h3>
              <p className="text-xs text-white/60">
                Powered by Firebase Firestore real-time synchronization
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Auth Banner */}
        <div className="bg-[#F5F2EB] px-6 py-3 border-b border-[#1F2527]/10 flex flex-wrap items-center justify-between text-xs gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2 text-[#1F2527]">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="User" className="w-6 h-6 rounded-full border border-[#1F2527]/20" />
              ) : (
                <User className="w-4 h-4 text-[#B76E4E]" />
              )}
              <span>Signed in as <strong className="text-[#1F2527]">{currentUser.displayName || currentUser.email}</strong></span>
              <span className="text-[#1F2527]/30">|</span>
              <span className="text-[#6B7D8A]">{currentUser.email}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[#4A5A6A]">
              <AlertCircle className="w-4 h-4 text-[#B76E4E]" />
              <span>Please sign in with Google to view your saved consultation requests and cost estimates.</span>
            </div>
          )}

          {currentUser ? (
            <button
              onClick={logout}
              className="px-3 py-1 bg-[#1F2527] text-white hover:bg-[#B76E4E] font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="px-4 py-1.5 bg-[#B76E4E] text-white hover:bg-[#9A5B3C] font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In with Google
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        {currentUser && (
          <div className="flex border-b border-[#1F2527]/10 bg-white px-6">
            <button
              onClick={() => setActiveTab('consultations')}
              className={`py-3.5 px-4 font-semibold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'consultations'
                  ? 'border-[#B76E4E] text-[#B76E4E]'
                  : 'border-transparent text-[#4A5A6A] hover:text-[#1F2527]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Consultation Requests ({consultations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('estimates')}
              className={`py-3.5 px-4 font-semibold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'estimates'
                  ? 'border-[#B76E4E] text-[#B76E4E]'
                  : 'border-transparent text-[#4A5A6A] hover:text-[#1F2527]'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Saved Estimates ({estimates.length})</span>
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
          {!currentUser ? (
            <div className="text-center py-16 space-y-4">
              <Shield className="w-12 h-12 text-[#B76E4E] mx-auto opacity-80" />
              <h4 className="font-serif text-xl font-semibold text-[#1F2527]">
                Access Your Secure Project Records
              </h4>
              <p className="text-xs text-[#4A5A6A] max-w-md mx-auto leading-relaxed">
                Sign in using your Google account to view saved estimates, track status updates on your consultation requests, and communicate with Makena & Associates directors.
              </p>
              <button
                onClick={loginWithGoogle}
                className="px-6 py-3 bg-[#1F2527] text-white hover:bg-[#B76E4E] font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In with Google
              </button>
            </div>
          ) : loading ? (
            <div className="text-center py-12 text-[#4A5A6A] text-xs flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#B76E4E]" />
              <span>Synchronizing with Firebase Firestore...</span>
            </div>
          ) : activeTab === 'consultations' ? (
            <div className="space-y-4">
              
              {/* Filter Bar */}
              <div className="flex items-center justify-between text-xs bg-white p-3 border border-[#1F2527]/10">
                <span className="font-semibold text-[#1F2527] flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#B76E4E]" />
                  Status Filter:
                </span>
                <div className="flex gap-1">
                  {['All', 'Pending', 'Contacted', 'Scheduled', 'Completed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 text-[11px] font-semibold border ${
                        statusFilter === st
                          ? 'bg-[#1F2527] text-white border-[#1F2527]'
                          : 'bg-white text-[#4A5A6A] border-[#1F2527]/15 hover:border-[#1F2527]/40'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {filteredConsultations.length === 0 ? (
                <div className="text-center py-12 bg-white border border-[#1F2527]/10 p-6 text-xs text-[#6B7D8A]">
                  No consultation requests found for this filter.
                </div>
              ) : (
                filteredConsultations.map((item) => (
                  <div key={item.id} className="bg-white p-5 border border-[#1F2527]/10 shadow-sm space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1F2527]/10 pb-3">
                      <div>
                        <h4 className="font-serif font-semibold text-[#1F2527] text-base">
                          {item.fullName}
                        </h4>
                        <div className="text-xs text-[#4A5A6A] flex flex-wrap items-center gap-3 mt-0.5">
                          <span>📧 {item.email}</span>
                          <span>📞 {item.phone}</span>
                          <span>📍 {item.county}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold border ${
                          item.status === 'Completed' ? 'bg-[#5A7C5E]/10 text-[#5A7C5E] border-[#5A7C5E]/30' :
                          item.status === 'Scheduled' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          item.status === 'Contacted' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          'bg-[#B76E4E]/10 text-[#B76E4E] border-[#B76E4E]/30'
                        }`}>
                          {item.status}
                        </span>

                        {isAdmin && (
                          <select
                            value={item.status}
                            onChange={(e) => handleUpdateStatus(item.id, e.target.value as ConsultationItem['status'])}
                            className="text-xs border border-[#1F2527]/20 bg-white px-2 py-1 text-[#1F2527] outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Archived">Archived</option>
                          </select>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-[#2E3A40] space-y-1">
                      <div><strong className="text-[#1F2527]">Service Request:</strong> {item.serviceType}</div>
                      <div><strong className="text-[#1F2527]">Brief / Notes:</strong> {item.projectScope}</div>
                      {item.attachedEstimate && item.attachedEstimate !== 'None' && (
                        <div className="bg-[#F5F2EB] p-2.5 border border-[#1F2527]/10 text-[11px] text-[#1F2527] mt-2">
                          <strong className="text-[#B76E4E]">Attached Estimate:</strong> {item.attachedEstimate}
                        </div>
                      )}
                    </div>

                    <div className="text-[10px] font-mono text-[#6B7D8A] pt-2 border-t border-[#1F2527]/5 flex justify-between">
                      <span>Ref ID: {item.id}</span>
                      <span>Submitted: {new Date(item.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}

            </div>
          ) : (
            <div className="space-y-4">
              {estimates.length === 0 ? (
                <div className="text-center py-12 bg-white border border-[#1F2527]/10 p-6 text-xs text-[#6B7D8A]">
                  No saved estimates yet. Use the Interactive Cost Estimator on the homepage to save project quotes!
                </div>
              ) : (
                estimates.map((est) => (
                  <div key={est.id} className="bg-white p-5 border border-[#1F2527]/10 shadow-sm space-y-2">
                    <div className="flex justify-between items-start border-b border-[#1F2527]/10 pb-2">
                      <h4 className="font-serif font-semibold text-[#1F2527] text-sm">
                        {est.title || est.buildingType}
                      </h4>
                      <span className="font-mono text-sm font-bold text-[#B76E4E]">
                        KES {(est.estimatedCostKes / 1000000).toFixed(2)}M
                      </span>
                    </div>

                    <div className="text-xs text-[#4A5A6A] grid grid-cols-2 sm:grid-cols-3 gap-2 py-1">
                      <div><strong>Floor Area:</strong> {est.grossFloorArea} sqm</div>
                      <div><strong>Finish Standard:</strong> {est.finishLevel}</div>
                      <div><strong>Date Saved:</strong> {new Date(est.createdAt).toLocaleDateString()}</div>
                    </div>

                    {est.notes && (
                      <div className="text-xs text-[#6B7D8A] bg-[#F5F2EB] p-2 border border-[#1F2527]/10">
                        {est.notes}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white p-4 border-t border-[#1F2527]/10 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1F2527] text-white hover:bg-[#B76E4E] font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
