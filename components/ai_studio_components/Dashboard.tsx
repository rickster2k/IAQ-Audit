import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Submission, SupportSubmission } from '../types';
import { questions } from '../data/questions';
import { jsPDF } from 'jspdf';
import { 
  db, 
  saveGlobalSetting 
} from '../services/firebaseService';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  deleteDoc, 
  updateDoc 
} from "firebase/firestore";

interface DashboardProps {
  onViewReport: (submission: Submission) => void;
  onBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onViewReport, onBack }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [supportSubmissions, setSupportSubmissions] = useState<SupportSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'submissions' | 'support' | 'settings' | 'announcements' | 'security' | 'data'>('submissions');
  
  const [paymentUrl, setPaymentUrl] = useState('');
  const [pricePoint, setPricePoint] = useState('$49');
  const [supportEnabled, setSupportEnabled] = useState(true);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const [announcementText, setAnnouncementText] = useState('');
  const [announcementUrl, setAnnouncementUrl] = useState('');
  const [announcementSaved, setAnnouncementSaved] = useState(false);

  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [securitySaved, setSecuritySaved] = useState(false);
  const [securityError, setSecurityError] = useState('');

  const [viewingSupport, setViewingSupport] = useState<SupportSubmission | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingForId, setUploadingForId] = useState<string | null>(null);

  const [stats, setStats] = useState({ visits: 0, starts: 0, reports: 0 });

  // Real-time Listeners
  useEffect(() => {
    // Submissions Listener
    const subQuery = query(collection(db, "submissions"), orderBy("timestamp", "desc"));
    const unsubSubs = onSnapshot(subQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Submission);
      setSubmissions(data);
    });

    // Support Listener
    const supportQuery = query(collection(db, "support"), orderBy("timestamp", "asc"));
    const unsubSupport = onSnapshot(supportQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as SupportSubmission));
      setSupportSubmissions(data);
    });

    // Stats Listener
    const unsubStats = onSnapshot(doc(db, "stats", "global"), (snapshot) => {
      if (snapshot.exists()) setStats(snapshot.data() as any);
    });

    // Settings Listener
    const unsubSettings = onSnapshot(doc(db, "settings", "app_config"), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setPaymentUrl(data.paymentUrl || '');
        setPricePoint(data.pricePoint || '$49');
        setSupportEnabled(data.supportEnabled !== false);
        setAnnouncementText(data.announcementText || '');
        setAnnouncementUrl(data.announcementUrl || '');
      }
    });

    // Local Security (still semi-local for ease)
    setAdminUser(localStorage.getItem('iaq_admin_user') || 'admin');
    setAdminPass(localStorage.getItem('iaq_admin_pass') || 'iaqaudit1600!');
    setConfirmPass(localStorage.getItem('iaq_admin_pass') || 'iaqaudit1600!');

    return () => {
      unsubSubs();
      unsubSupport();
      unsubStats();
      unsubSettings();
    };
  }, []);

  const averageRiskScore = useMemo(() => {
    const validScores = submissions.filter(s => s.result.summary !== 'PURGED');
    if (validScores.length === 0) return 0;
    const total = validScores.reduce((sum, sub) => sum + sub.result.score, 0);
    return (total / validScores.length).toFixed(1);
  }, [submissions]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveGlobalSetting("paymentUrl", paymentUrl);
    await saveGlobalSetting("pricePoint", pricePoint);
    await saveGlobalSetting("supportEnabled", supportEnabled);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const handleDeleteSupport = async (id: string) => {
    if (window.confirm("Delete this support request?")) {
      await deleteDoc(doc(db, "support", id));
      if (viewingSupport?.id === id) setViewingSupport(null);
    }
  };

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveGlobalSetting("announcementText", announcementText);
    await saveGlobalSetting("announcementUrl", announcementUrl);
    setAnnouncementSaved(true);
    setTimeout(() => setAnnouncementSaved(false), 2000);
  };

  const handleClearAnnouncement = async () => {
    setAnnouncementText('');
    setAnnouncementUrl('');
    await saveGlobalSetting("announcementText", "");
    await saveGlobalSetting("announcementUrl", "");
    setAnnouncementSaved(true);
    setTimeout(() => setAnnouncementSaved(false), 2000);
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError('');
    if (adminPass !== confirmPass) { setSecurityError('Passwords do not match.'); return; }
    localStorage.setItem('iaq_admin_user', adminUser);
    localStorage.setItem('iaq_admin_pass', adminPass);
    setSecuritySaved(true);
    setTimeout(() => setSecuritySaved(false), 2000);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingForId) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      await updateDoc(doc(db, "submissions", uploadingForId), {
        premiumDoc: { name: file.name, data: base64Data }
      });
      setUploadingForId(null);
    };
    reader.readAsDataURL(file);
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const term = searchTerm.toLowerCase();
    return (
      sub.contact.firstName.toLowerCase().includes(term) ||
      sub.contact.lastName.toLowerCase().includes(term) ||
      sub.contact.email.toLowerCase().includes(term) ||
      (sub.reportId || '').toLowerCase().includes(term)
    );
  });

  const handleSelectOne = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id); else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const handleDeleteSelected = async () => {
    if (window.confirm(`Delete ${selectedIds.size} record(s)?`)) {
      for (const id of selectedIds) {
        await deleteDoc(doc(db, "submissions", id));
      }
      setSelectedIds(new Set());
    }
  };

  const generateQAPDF = (sub: Submission) => {
    if (sub.result.summary === 'PURGED') return;
    const doc = new jsPDF();
    doc.text(`IAQ Audit - ${sub.reportId}`, 20, 20);
    doc.save(`IAQ_Audit_${sub.reportId}.pdf`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto fade-in p-6">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" className="hidden" />

      {viewingSupport && (
        <div className="fixed inset-0 bg-[#1e3a5f]/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden fade-in p-8">
            <h3 className="text-xl font-bold mb-4">Support: {viewingSupport.name}</h3>
            <p className="mb-6">"{viewingSupport.message}"</p>
            <div className="flex gap-4">
              <button onClick={() => window.location.href=`mailto:${viewingSupport.email}`} className="bg-[#0d9488] text-white px-6 py-2 rounded-xl">Reply</button>
              <button onClick={() => setViewingSupport(null)} className="bg-slate-200 px-6 py-2 rounded-xl">Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1e3a5f]">Global Cloud Dashboard</h1>
          <p className="text-slate-500">Live data from all assessment takers.</p>
        </div>
        <button onClick={onBack} className="text-slate-500 hover:text-[#1e3a5f]">Sign Out</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wide">Visits</h3>
            <div className="text-3xl font-bold text-[#1e3a5f] mt-2">{stats.visits}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wide">Starts</h3>
            <div className="text-3xl font-bold text-[#0d9488] mt-2">{stats.starts}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wide">Reports</h3>
            <div className="text-3xl font-bold text-orange-600 mt-2">{stats.reports}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#0d9488]">
            <h3 className="text-teal-600 text-xs font-bold uppercase tracking-wide">Avg Score</h3>
            <div className="text-3xl font-bold text-[#0d9488] mt-2">{averageRiskScore}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg mb-6 w-fit">
        <button onClick={() => setActiveTab('submissions')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'submissions' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Audits</button>
        <button onClick={() => setActiveTab('support')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'support' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Support</button>
        <button onClick={() => setActiveTab('announcements')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'announcements' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Announcements</button>
        <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'settings' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Settings</button>
      </div>

      {activeTab === 'submissions' && (
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 border-b">
                    <tr>
                        <th className="p-4">Report ID</th>
                        <th className="p-4">Homeowner</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Score</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {filteredSubmissions.map(sub => (
                        <tr key={sub.id} className="hover:bg-slate-50">
                            <td className="p-4 font-mono font-bold">{sub.reportId}</td>
                            <td className="p-4">{sub.contact.firstName} {sub.contact.lastName}</td>
                            <td className="p-4 text-slate-500">{sub.contact.email}</td>
                            <td className="p-4 font-bold text-[#0d9488]">{sub.result.score}</td>
                            <td className="p-4 flex gap-3">
                                <button onClick={() => onViewReport(sub)} className="text-[#0d9488] font-bold">View</button>
                                <button onClick={() => handleSelectOne(sub.id)} className="text-red-500 font-bold">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl shadow-lg border p-8 max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Global Configuration</h2>
            <form onSubmit={handleSaveSettings} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold mb-2">Order URL</label>
                    <input type="url" className="w-full p-3 border rounded-lg" value={paymentUrl} onChange={(e) => setPaymentUrl(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">Price Label</label>
                    <input type="text" className="w-full p-3 border rounded-lg" value={pricePoint} onChange={(e) => setPricePoint(e.target.value)} />
                </div>
                <button type="submit" className="bg-[#1e3a5f] text-white px-8 py-3 rounded-xl">Save Changes</button>
                {settingsSaved && <p className="text-green-600 font-bold mt-2">Saved to Cloud!</p>}
            </form>
        </div>
      )}

      {activeTab === 'announcements' && (
        <div className="bg-white rounded-2xl shadow-lg border p-8 max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Global Announcement</h2>
            <form onSubmit={handleSaveAnnouncement} className="space-y-6">
                <input type="text" className="w-full p-3 border rounded-lg" placeholder="Announcement text..." value={announcementText} onChange={(e) => setAnnouncementText(e.target.value)} />
                <input type="url" className="w-full p-3 border rounded-lg" placeholder="Link URL..." value={announcementUrl} onChange={(e) => setAnnouncementUrl(e.target.value)} />
                <button type="submit" className="bg-[#1e3a5f] text-white px-8 py-3 rounded-xl">Broadcast</button>
            </form>
        </div>
      )}
    </div>
  );
};