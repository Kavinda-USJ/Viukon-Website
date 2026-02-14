import React, { useState } from 'react';
import { SiteData, Project, TeamMember } from '../App';
import { ImageUpload } from './ImageUpload';
import { updateSiteData } from '../services/api';

interface AdminProps {
  siteData: SiteData;
  setSiteData: React.Dispatch<React.SetStateAction<SiteData>>;
}

interface ExtendedProject extends Project {
  description?: string;
}

// ─── Fully-controlled ReorderList (zero internal state) ───────────────────────
interface ReorderItem { id: string; label: string; sub?: string; }

const ReorderList: React.FC<{
  items: ReorderItem[];
  onReorder: (reorderedItems: ReorderItem[]) => void;
}> = ({ items, onReorder }) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => setDragIndex(index);

  const handleDragEnter = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) return;
    const next = [...items];
    const [pulled] = next.splice(dragIndex, 1);
    next.splice(targetIndex, 0, pulled);
    setDragIndex(targetIndex);
    onReorder(next); // writes straight to siteData
  };

  const handleDragEnd = () => setDragIndex(null);

  if (items.length === 0) return null;

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragOver={e => e.preventDefault()}
          onDragEnd={handleDragEnd}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border select-none transition-all duration-100 ${
            dragIndex === index
              ? 'opacity-40 scale-[0.98] border-brand-yellow/40 bg-brand-yellow/10 cursor-grabbing'
              : 'border-white/10 bg-brand-black/40 hover:border-white/25 hover:bg-brand-black/60 cursor-grab'
          }`}
        >
          <div className="flex flex-col gap-[3px] flex-shrink-0 opacity-30 pointer-events-none">
            <div className="w-[14px] h-[2px] bg-white rounded-full" />
            <div className="w-[14px] h-[2px] bg-white rounded-full" />
            <div className="w-[14px] h-[2px] bg-white rounded-full" />
          </div>
          <div className="w-7 h-7 rounded-lg bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center flex-shrink-0">
            <span className="text-brand-yellow font-black text-[11px] leading-none">{index + 1}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm truncate">{item.label}</p>
            {item.sub && <p className="text-white/35 text-[10px] uppercase tracking-wider truncate">{item.sub}</p>}
          </div>
          <svg className="w-4 h-4 text-white/20 flex-shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </div>
      ))}
    </div>
  );
};

// ─── Main Admin ───────────────────────────────────────────────────────────────
export const Admin: React.FC<AdminProps> = ({ siteData, setSiteData }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'team' | 'contact' | 'about'>('home');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);

  const projectCategories = ['Branding', 'Social Media', 'Website', 'Ad Campaigns', 'Videography', 'AI Content', 'Other'];

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setError('');
      showNotification('success', 'Welcome back!');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  // ── Explicit save order to backend ────────────────────────────────────────
  // This bypasses the debounced auto-save in App.tsx and writes directly,
  // ensuring the new array order is persisted before the user navigates away.
  const saveOrderToBackend = async (updatedData: SiteData) => {
    setSavingOrder(true);
    try {
      await updateSiteData(updatedData);
      showNotification('success', '✅ Order saved! About page is now updated.');
    } catch (err) {
      showNotification('error', 'Failed to save order. Please try again.');
    } finally {
      setSavingOrder(false);
    }
  };

  // ── Hero ──────────────────────────────────────────────────────────────────
  const handleCarouselWordChange = (index: number, value: string) => {
    const newWords = [...siteData.hero.carouselWords];
    newWords[index] = value;
    setSiteData(prev => ({ ...prev, hero: { ...prev.hero, carouselWords: newWords } }));
  };

  // ── Brands ────────────────────────────────────────────────────────────────
  const handleBrandChange = (index: number, value: string) => {
    const b = [...(siteData.trustedBrands || [])];
    b[index] = value;
    setSiteData(prev => ({ ...prev, trustedBrands: b }));
  };
  const addBrand = () => {
    setSiteData(prev => ({ ...prev, trustedBrands: [...(prev.trustedBrands || []), 'NEW BRAND'] }));
    showNotification('success', 'New brand added');
  };
  const deleteBrand = (index: number) => {
    if (!window.confirm('Delete this brand?')) return;
    setSiteData(prev => ({ ...prev, trustedBrands: (prev.trustedBrands || []).filter((_, i) => i !== index) }));
    showNotification('success', 'Brand deleted');
  };

  // ── Stats ─────────────────────────────────────────────────────────────────
  const handleStatsChange = (field: 'projects' | 'clients' | 'engagement', value: string) => {
    const num = value.replace(/\D/g, '') === '' ? 0 : parseInt(value.replace(/\D/g, ''), 10);
    setSiteData(prev => ({ ...prev, stats: { ...(prev.stats || { projects: 150, clients: 85, engagement: 25000 }), [field]: num } }));
  };

  // ── About ─────────────────────────────────────────────────────────────────
  const handleAboutChange = (field: 'yearsExperience' | 'partnerPrograms' | 'teamImage', value: string | number) => {
    setSiteData(prev => ({ ...prev, about: { ...(prev.about || { yearsExperience: 5, partnerPrograms: 12, teamImage: '' }), [field]: value } }));
  };

  // ── Projects ──────────────────────────────────────────────────────────────
  const addProject = () => {
    const newProject: ExtendedProject = {
      id: Date.now().toString(),
      title: 'New Project',
      category: 'Branding',
      description: 'Project description goes here...',
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      tags: ['New', 'Strategy'],
    };
    setSiteData(prev => ({ ...prev, projects: [newProject, ...prev.projects] }));
    showNotification('success', 'New project created at position 1');
  };

  const updateProject = (id: string, field: keyof ExtendedProject, value: any) => {
    setSiteData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p) }));
  };

  const handleProjectsReorder = (reordered: ReorderItem[]) => {
    const map = new Map(siteData.projects.map(p => [p.id, p]));
    const newProjects = reordered.map(r => map.get(r.id)!).filter(Boolean);
    setSiteData(prev => ({ ...prev, projects: newProjects }));
  };

  // Save project order explicitly to backend
  const saveProjectOrder = async () => {
    const updated = { ...siteData };
    await saveOrderToBackend(updated);
  };

  const deleteProject = (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setSiteData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    showNotification('success', `"${title}" deleted`);
  };

  // ── Team ──────────────────────────────────────────────────────────────────
  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: 'New Member',
      role: 'Creative Lead',
      img: 'https://i.pravatar.cc/400?u=' + Date.now(),
    };
    setSiteData(prev => ({ ...prev, team: [newMember, ...prev.team] }));
    showNotification('success', 'New team member added');
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    setSiteData(prev => ({ ...prev, team: prev.team.map(m => m.id === id ? { ...m, [field]: value } : m) }));
  };

  const handleTeamReorder = (reordered: ReorderItem[]) => {
    const map = new Map(siteData.team.map(m => [m.id, m]));
    const newTeam = reordered.map(r => map.get(r.id)!).filter(Boolean);
    setSiteData(prev => ({ ...prev, team: newTeam }));
  };

  // Save team order explicitly to backend
  const saveTeamOrder = async () => {
    const updated = { ...siteData };
    await saveOrderToBackend(updated);
  };

  const deleteTeamMember = (id: string, name: string) => {
    if (!window.confirm(`Remove ${name}? This cannot be undone.`)) return;
    setSiteData(prev => ({ ...prev, team: prev.team.filter(m => m.id !== id) }));
    showNotification('success', `${name} removed`);
  };

  // ── Styles ────────────────────────────────────────────────────────────────
  const inp = "w-full bg-brand-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 outline-none transition-all";
  const sel = "w-full bg-brand-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 outline-none transition-all appearance-none cursor-pointer";
  const tex = "w-full bg-brand-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 outline-none transition-all resize-none";
  const lbl = "block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2 ml-1";
  const saveBtn = "px-6 py-2.5 bg-brand-yellow text-brand-black rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow/90 active:scale-95 transition-all shadow-lg shadow-brand-yellow/20";

  // ── Login ─────────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-[0.08] blur-[150px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #EAB308 0%, transparent 70%)' }} />
        <div className="w-full max-w-md bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] p-10 md:p-12 relative z-10">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center font-bold text-brand-black text-4xl mb-6 shadow-[0_0_40px_rgba(234,179,8,0.25)]">V</div>
            <h1 className="text-3xl font-black tracking-tighter text-white">VIUKON <span className="text-brand-yellow">CMS</span></h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mt-2">Content Management System</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className={lbl}>Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className={inp} placeholder="Enter username" required />
            </div>
            <div>
              <label className={lbl}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className={inp} placeholder="Enter password" required />
            </div>
            {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl"><p className="text-red-400 text-xs font-semibold text-center">{error}</p></div>}
            <button type="submit" className="w-full bg-brand-yellow text-brand-black py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-brand-yellow/20">
              Access Dashboard
            </button>
          </form>
          <div className="mt-8 text-center">
            <button onClick={() => window.location.href = '/'} className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] hover:text-white/50 transition-colors">← Back to Website</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-brand-black text-white pt-10 pb-20">

      {/* Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 min-w-[300px] animate-in slide-in-from-right-5 fade-in duration-300">
          <div className={`bg-brand-black/95 backdrop-blur-xl border rounded-xl px-5 py-3.5 shadow-2xl ${notification.type === 'success' ? 'border-brand-yellow/30' : 'border-red-500/30'}`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success'
                ? <svg className="w-5 h-5 text-brand-yellow flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                : <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              }
              <p className="text-sm text-white font-medium">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/5">
          <div>
            <h1 className="text-4xl font-black tracking-tighter">VIUKON <span className="text-brand-yellow">CMS</span></h1>
            <p className="text-white/40 text-sm font-medium mt-1.5 uppercase tracking-wider">Content Management Dashboard</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setIsLoggedIn(false)} className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-white/60">Logout</button>
            <button onClick={() => window.location.href = '/'} className="px-5 py-2.5 bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-brand-yellow/20">View Site</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            {[
              { id: 'home', label: 'Home Page', icon: '🏠' },
              { id: 'about', label: 'About Page', icon: '📖' },
              { id: 'projects', label: 'Projects', icon: '💼' },
              { id: 'team', label: 'Team', icon: '👥' },
              { id: 'contact', label: 'Contact', icon: '📧' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-3 ${activeTab === tab.id ? 'bg-brand-yellow text-brand-black shadow-lg shadow-brand-yellow/20' : 'text-white/50 hover:bg-white/5 hover:text-white/80'}`}>
                <span className="text-lg">{tab.icon}</span>{tab.label}
              </button>
            ))}
          </aside>

          {/* Editor */}
          <main className="lg:col-span-4 bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-10 backdrop-blur-xl">

            {/* ── HOME ── */}
            {activeTab === 'home' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-2xl font-black">Home Page Settings</h3>
                <div className="space-y-6 p-6 bg-brand-black/20 border border-white/5 rounded-2xl">
                  <h4 className="text-lg font-black text-brand-yellow">🎯 Hero Section</h4>
                  <div>
                    <label className={lbl}>Main Headline</label>
                    <input type="text" value={siteData.hero.title} onChange={e => setSiteData(prev => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))} className={inp} placeholder="Enter hero title" />
                  </div>
                  <div>
                    <label className={lbl}>Dynamic Carousel Words</label>
                    <div className="grid gap-3">
                      {siteData.hero.carouselWords.map((word, i) => (
                        <input key={i} type="text" value={word} onChange={e => handleCarouselWordChange(i, e.target.value)} className={inp} placeholder={`Word ${i + 1}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6 p-6 bg-brand-black/20 border border-white/5 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-black text-brand-yellow">🏢 Trusted By Brands</h4>
                    <button onClick={addBrand} className="px-4 py-2 bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-xs font-bold uppercase tracking-wider hover:bg-brand-yellow/20 rounded-xl transition-all">+ Add Brand</button>
                  </div>
                  <div className="grid gap-3">
                    {(siteData.trustedBrands?.length ?? 0) > 0 ? siteData.trustedBrands!.map((brand, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <input type="text" value={brand} onChange={e => handleBrandChange(i, e.target.value)} className={inp} placeholder="BRAND NAME" />
                        <button onClick={() => deleteBrand(i)} className="px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl hover:bg-red-500/20 transition-all flex-shrink-0">Delete</button>
                      </div>
                    )) : <p className="text-white/40 text-sm text-center py-4">No brands yet.</p>}
                  </div>
                </div>
                <div className="space-y-6 p-6 bg-brand-black/20 border border-white/5 rounded-2xl">
                  <h4 className="text-lg font-black text-brand-yellow">📊 Stats Counter</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                      { key: 'projects' as const, label: 'Projects Completed', placeholder: '150' },
                      { key: 'clients' as const, label: 'Happy Clients', placeholder: '85' },
                      { key: 'engagement' as const, label: 'Total Engagement', placeholder: '25000' },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className={lbl}>{label}</label>
                        <input type="text" value={siteData.stats?.[key] === 0 ? '' : siteData.stats?.[key] || ''} onChange={e => handleStatsChange(key, e.target.value)} className={inp} placeholder={placeholder} />
                        {key === 'engagement' && <p className="text-[10px] text-white/30 mt-1 ml-1">Displays as {siteData.stats?.engagement ? (siteData.stats.engagement / 1000).toFixed(0) + 'K+' : '0K+'}</p>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-white/5">
                  <button onClick={() => showNotification('success', 'Home page settings saved')} className={saveBtn}>Save Home Page Changes</button>
                </div>
              </div>
            )}

            {/* ── ABOUT ── */}
            {activeTab === 'about' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-2xl font-black">About Page Settings</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-brand-black/20 border border-white/5 rounded-2xl space-y-4">
                    <h4 className="text-lg font-black text-brand-yellow">📅 Years of Experience</h4>
                    <label className={lbl}>Years in Business</label>
                    <input type="text" value={siteData.about?.yearsExperience === 0 ? '' : siteData.about?.yearsExperience || ''} onChange={e => { const n = parseInt(e.target.value.replace(/\D/g, ''), 10); handleAboutChange('yearsExperience', isNaN(n) ? 0 : n); }} className={inp} placeholder="5" />
                  </div>
                  <div className="p-6 bg-brand-black/20 border border-white/5 rounded-2xl space-y-4">
                    <h4 className="text-lg font-black text-brand-yellow">🤝 Partner Programs</h4>
                    <label className={lbl}>Number of Partner Programs</label>
                    <input type="text" value={siteData.about?.partnerPrograms === 0 ? '' : siteData.about?.partnerPrograms || ''} onChange={e => { const n = parseInt(e.target.value.replace(/\D/g, ''), 10); handleAboutChange('partnerPrograms', isNaN(n) ? 0 : n); }} className={inp} placeholder="12" />
                  </div>
                  <div className="p-6 bg-brand-black/20 border border-white/5 rounded-2xl space-y-4">
                    <h4 className="text-lg font-black text-brand-yellow">📸 Team Picture</h4>
                    <ImageUpload
                      currentImage={siteData.about?.teamImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200'}
                      onImageUpload={url => handleAboutChange('teamImage', url)}
                      label="Team Photo (Recommended: 1200x600px)"
                    />
                  </div>
                  <div className="flex justify-end pt-4 border-t border-white/5">
                    <button onClick={() => showNotification('success', 'About page settings saved')} className={saveBtn}>Save About Page Changes</button>
                  </div>
                </div>
              </div>
            )}

            {/* ── PROJECTS ── */}
            {activeTab === 'projects' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black">Projects Portfolio</h3>
                    <p className="text-white/40 text-xs font-medium mt-1 uppercase tracking-wider">{siteData.projects.length} project{siteData.projects.length !== 1 ? 's' : ''}</p>
                  </div>
                  <button onClick={addProject} className="px-5 py-2.5 bg-brand-yellow text-brand-black rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow/90 active:scale-95 transition-all shadow-lg shadow-brand-yellow/20">+ Add Project</button>
                </div>

                {/* Reorder Panel */}
                {siteData.projects.length > 1 && (
                  <div className="rounded-2xl border border-brand-yellow/25 overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-4 bg-brand-yellow/8 border-b border-brand-yellow/15">
                      <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse flex-shrink-0" />
                      <p className="text-brand-yellow font-black text-xs uppercase tracking-widest">Display Order</p>
                      <span className="ml-auto text-[10px] text-brand-yellow/50 font-bold uppercase tracking-wider hidden sm:block">Drag to reorder</span>
                    </div>
                    <div className="p-4 bg-brand-black/25">
                      <ReorderList
                        items={siteData.projects.map(p => ({ id: p.id, label: p.title, sub: p.category }))}
                        onReorder={handleProjectsReorder}
                      />
                    </div>
                    {/* ★ Explicit Save Order button — writes directly to backend */}
                    <div className="px-4 pb-4 bg-brand-black/25">
                      <button
                        onClick={saveProjectOrder}
                        disabled={savingOrder}
                        className="w-full py-3 bg-brand-yellow text-brand-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-yellow/90 active:scale-[0.99] transition-all shadow-lg shadow-brand-yellow/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {savingOrder ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                            Saving...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            Save Project Order to Website
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Edit cards */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-4">Edit Project Details</p>
                  <div className="grid gap-5">
                    {siteData.projects.map((project: ExtendedProject) => (
                      <div key={project.id} className="p-6 bg-brand-black/30 border border-white/10 rounded-2xl space-y-5 hover:border-white/20 transition-all">
                        <div className="pb-1 border-b border-white/5">
                          <p className="text-white font-black text-base truncate">{project.title}</p>
                          <p className="text-white/30 text-[10px] uppercase tracking-wider mt-0.5">{project.category}</p>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-brand-yellow/5 border border-brand-yellow/20 rounded-xl">
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <div>
                              <p className="text-white font-bold text-sm">Featured on Homepage</p>
                              <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">{project.featured ? 'Showing on home page' : 'Only in portfolio page'}</p>
                            </div>
                          </div>
                          <button onClick={() => updateProject(project.id, 'featured', !project.featured)}
                            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${project.featured ? 'bg-brand-yellow' : 'bg-white/10'}`}>
                            <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${project.featured ? 'translate-x-7' : 'translate-x-1'}`} />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className={lbl}>Project Title</label>
                            <input type="text" value={project.title} onChange={e => updateProject(project.id, 'title', e.target.value)} className={inp} placeholder="Project name" />
                          </div>
                          <div>
                            <label className={lbl}>Category</label>
                            <div className="relative">
                              <select value={project.category} onChange={e => updateProject(project.id, 'category', e.target.value)} className={sel}>
                                {projectCategories.map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className={lbl}>Description</label>
                          <textarea value={(project as ExtendedProject).description || ''} onChange={e => updateProject(project.id, 'description', e.target.value)} className={tex} rows={3} placeholder="Describe the project..." />
                        </div>
                        <div>
                          <label className={lbl}>Project Link (URL)</label>
                          <input type="url" value={project.link || ''} onChange={e => updateProject(project.id, 'link', e.target.value)} className={inp} placeholder="https://example.com" />
                        </div>
                        <ImageUpload currentImage={project.img} onImageUpload={url => updateProject(project.id, 'img', url)} label="Featured Image" />
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <button onClick={() => deleteProject(project.id, project.title)} className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider hover:bg-red-500/20 rounded-xl transition-all">Delete</button>
                          <button onClick={() => showNotification('success', `"${project.title}" saved`)} className={saveBtn}>Save Project</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── TEAM ── */}
            {activeTab === 'team' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black">Team Members</h3>
                    <p className="text-white/40 text-xs font-medium mt-1 uppercase tracking-wider">{siteData.team.length} member{siteData.team.length !== 1 ? 's' : ''}</p>
                  </div>
                  <button onClick={addTeamMember} className="px-5 py-2.5 bg-brand-yellow text-brand-black rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow/90 active:scale-95 transition-all shadow-lg shadow-brand-yellow/20">+ Add Member</button>
                </div>

                {/* Reorder Panel */}
                {siteData.team.length > 1 && (
                  <div className="rounded-2xl border border-brand-yellow/25 overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-4 bg-brand-yellow/8 border-b border-brand-yellow/15">
                      <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse flex-shrink-0" />
                      <p className="text-brand-yellow font-black text-xs uppercase tracking-widest">Display Order</p>
                      <span className="ml-auto text-[10px] text-brand-yellow/50 font-bold uppercase tracking-wider hidden sm:block">Drag to reorder</span>
                    </div>
                    <div className="p-4 bg-brand-black/25">
                      <ReorderList
                        items={siteData.team.map(m => ({ id: m.id, label: m.name, sub: m.role }))}
                        onReorder={handleTeamReorder}
                      />
                    </div>
                    {/* ★ Explicit Save Order button — writes directly to backend */}
                    <div className="px-4 pb-4 bg-brand-black/25">
                      <button
                        onClick={saveTeamOrder}
                        disabled={savingOrder}
                        className="w-full py-3 bg-brand-yellow text-brand-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-yellow/90 active:scale-[0.99] transition-all shadow-lg shadow-brand-yellow/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {savingOrder ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                            Saving...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            Save Team Order to Website
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Edit cards */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-4">Edit Member Details</p>
                  <div className="grid gap-5">
                    {siteData.team.map(member => (
                      <div key={member.id} className="p-6 bg-brand-black/30 border border-white/10 rounded-2xl space-y-5 hover:border-white/20 transition-all">
                        <div className="pb-1 border-b border-white/5">
                          <p className="text-white font-black text-base truncate">{member.name}</p>
                          <p className="text-white/30 text-[10px] uppercase tracking-wider mt-0.5">{member.role}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className={lbl}>Full Name</label>
                            <input type="text" value={member.name} onChange={e => updateTeamMember(member.id, 'name', e.target.value)} className={inp} placeholder="Enter member name" />
                          </div>
                          <div>
                            <label className={lbl}>Job Role</label>
                            <input type="text" value={member.role} onChange={e => updateTeamMember(member.id, 'role', e.target.value)} className={inp} placeholder="e.g., Creative Director" />
                          </div>
                        </div>
                        <ImageUpload currentImage={member.img} onImageUpload={url => updateTeamMember(member.id, 'img', url)} label="Profile Picture" />
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <button onClick={() => deleteTeamMember(member.id, member.name)} className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider hover:bg-red-500/20 rounded-xl transition-all">Remove</button>
                          <button onClick={() => showNotification('success', `${member.name}'s profile saved`)} className={saveBtn}>Save Member</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── CONTACT ── */}
            {activeTab === 'contact' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-2xl font-black">Contact Information</h3>
                <div className="space-y-6">
                  <div>
                    <label className={lbl}>Public Email Address</label>
                    <input type="email" value={siteData.contact.email} onChange={e => setSiteData(prev => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }))} className={inp} placeholder="hello@company.com" />
                  </div>
                  <div>
                    <label className={lbl}>Office Address</label>
                    <input type="text" value={siteData.contact.address} onChange={e => setSiteData(prev => ({ ...prev, contact: { ...prev.contact, address: e.target.value } }))} className={inp} placeholder="123 Main Street, City, Country" />
                  </div>
                  <div className="flex justify-end pt-4 border-t border-white/5">
                    <button onClick={() => showNotification('success', 'Contact information saved')} className={saveBtn}>Save Changes</button>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};