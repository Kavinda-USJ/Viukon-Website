import React, { useState } from 'react';
import { SiteData, Project, TeamMember } from '../App';
import { ImageUpload } from './ImageUpload';

interface AdminProps {
  siteData: SiteData;
  setSiteData: React.Dispatch<React.SetStateAction<SiteData>>;
}

// Extend Project interface to include description
interface ExtendedProject extends Project {
  description?: string;
}

export const Admin: React.FC<AdminProps> = ({ siteData, setSiteData }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'team' | 'contact' | 'about'>('home');
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<string | null>(null);

  // Project Categories
  const projectCategories = [
    'Branding',
    'Social Media',
    'Website',
    'Ad Campaigns',
    'Videography',
    'AI Content',
    'Other'
  ];

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
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

  // Hero Section
  const handleHeroTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteData(prev => ({
      ...prev,
      hero: { ...prev.hero, title: e.target.value }
    }));
  };

  const handleCarouselWordChange = (index: number, value: string) => {
    const newWords = [...siteData.hero.carouselWords];
    newWords[index] = value;
    setSiteData(prev => ({
      ...prev,
      hero: { ...prev.hero, carouselWords: newWords }
    }));
  };

  // Trusted By Brands
  const handleBrandChange = (index: number, value: string) => {
    const currentBrands = siteData.trustedBrands || [];
    const newBrands = [...currentBrands];
    newBrands[index] = value;
    setSiteData(prev => ({
      ...prev,
      trustedBrands: newBrands
    }));
  };

  const addBrand = () => {
    const currentBrands = siteData.trustedBrands || [];
    setSiteData(prev => ({
      ...prev,
      trustedBrands: [...currentBrands, 'NEW BRAND']
    }));
    showNotification('success', 'New brand added');
  };

  const deleteBrand = (index: number) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      const currentBrands = siteData.trustedBrands || [];
      setSiteData(prev => ({
        ...prev,
        trustedBrands: currentBrands.filter((_, i) => i !== index)
      }));
      showNotification('success', 'Brand deleted');
    }
  };

  // Stats Section
  const handleStatsChange = (field: 'projects' | 'clients' | 'engagement', value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    const numValue = digitsOnly === '' ? 0 : parseInt(digitsOnly, 10);
    
    setSiteData(prev => ({
      ...prev,
      stats: {
        ...(prev.stats || { projects: 150, clients: 85, engagement: 25000 }),
        [field]: numValue
      }
    }));
  };

  const saveHomePageChanges = () => {
    showNotification('success', 'Home page settings saved successfully');
  };

  // Contact
  const handleContactChange = (field: 'email' | 'address', value: string) => {
    setSiteData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const saveContactChanges = () => {
    showNotification('success', 'Contact information saved successfully');
  };

  // About Page
  const handleAboutChange = (field: 'yearsExperience' | 'partnerPrograms' | 'teamImage', value: string | number) => {
    setSiteData(prev => ({
      ...prev,
      about: {
        ...(prev.about || { yearsExperience: 5, partnerPrograms: 12, teamImage: '' }),
        [field]: value
      }
    }));
  };

  const saveAboutChanges = () => {
    showNotification('success', 'About page settings saved successfully');
  };

  // Projects
  const addProject = () => {
    const newProject: ExtendedProject = {
      id: Date.now().toString(),
      title: 'New Project',
      category: 'Branding',
      description: 'Project description goes here...',
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      tags: ['New', 'Strategy']
    };
    setSiteData(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
    setEditingProject(newProject.id);
    showNotification('success', 'New project created');
  };

  const updateProject = (id: string, field: keyof ExtendedProject, value: any) => {
    setSiteData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const saveProject = (id: string, title: string) => {
    setEditingProject(null);
    showNotification('success', `"${title}" saved successfully`);
  };

  const deleteProject = (id: string, title: string) => {
    if (window.confirm(`⚠️ Delete Project\n\nAre you sure you want to permanently delete "${title}"?\n\nThis action cannot be undone.`)) {
      setSiteData(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== id)
      }));
      showNotification('success', `"${title}" deleted`);
    }
  };

  // Team
  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: 'New Member',
      role: 'Creative Lead',
      img: 'https://i.pravatar.cc/400?u=' + Date.now()
    };
    setSiteData(prev => ({ ...prev, team: [...prev.team, newMember] }));
    setEditingMember(newMember.id);
    showNotification('success', 'New team member added');
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    setSiteData(prev => ({
      ...prev,
      team: prev.team.map(m => m.id === id ? { ...m, [field]: value } : m)
    }));
  };

  const saveTeamMember = (id: string, name: string) => {
    setEditingMember(null);
    showNotification('success', `${name}'s profile saved`);
  };

  const deleteTeamMember = (id: string, name: string) => {
    if (window.confirm(`⚠️ Remove Team Member\n\nAre you sure you want to remove ${name} from the team?\n\nThis action cannot be undone.`)) {
      setSiteData(prev => ({
        ...prev,
        team: prev.team.filter(m => m.id !== id)
      }));
      showNotification('success', `${name} removed`);
    }
  };

  const inputStyles = "w-full bg-brand-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 outline-none transition-all";
  const selectStyles = "w-full bg-brand-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 outline-none transition-all appearance-none cursor-pointer";
  const textareaStyles = "w-full bg-brand-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 outline-none transition-all resize-none min-h-[100px]";
  const labelStyles = "block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2 ml-1";
  const saveBtnStyles = "px-6 py-2.5 bg-brand-yellow text-brand-black rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow/90 active:scale-95 transition-all shadow-lg shadow-brand-yellow/20";
  const cancelBtnStyles = "px-6 py-2.5 bg-white/5 border border-white/10 text-white/60 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-white/10 active:scale-95 transition-all";

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center p-6 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-[0.08] blur-[150px] pointer-events-none"
             style={{ background: 'radial-gradient(circle, #EAB308 0%, transparent 70%)' }}></div>
        
        <div className="w-full max-w-md bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] p-10 md:p-12 relative z-10 animate-in fade-in zoom-in-95 duration-700">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center font-bold text-brand-black text-4xl mb-6 shadow-[0_0_40px_rgba(234,179,8,0.25)]">V</div>
            <h1 className="text-3xl font-black tracking-tighter text-white">VIUKON <span className="text-brand-yellow">CMS</span></h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mt-2">Content Management System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className={labelStyles}>Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className={inputStyles}
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className={labelStyles}>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className={inputStyles}
                placeholder="Enter password"
                required
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 text-xs font-semibold text-center">{error}</p>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-brand-yellow text-brand-black py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-brand-yellow/20"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-8 text-center">
             <button onClick={() => window.location.href = '/'} className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] hover:text-white/50 transition-colors">
               ← Back to Website
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-white pt-10 pb-20 animate-in fade-in duration-700">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 min-w-[320px] animate-in slide-in-from-right-5 fade-in duration-500">
          <div className={`bg-brand-black/90 backdrop-blur-xl border rounded-xl px-5 py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)] ${
            notification.type === 'success' 
              ? 'border-brand-yellow/30' 
              : 'border-red-500/30'
          }`}>
            <div className="flex items-start gap-3">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5 text-brand-yellow mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <div className="flex-1">
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${
                  notification.type === 'success' ? 'text-brand-yellow/70' : 'text-red-500/70'
                }`}>
                  {notification.type === 'success' ? 'Success' : 'Error'}
                </p>
                <p className="text-sm text-white font-medium">
                  {notification.message}
                </p>
              </div>
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
            <button 
              onClick={() => setIsLoggedIn(false)} 
              className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-white/60"
            >
              Logout
            </button>
            <button 
              onClick={() => window.location.href = '/'} 
              className="px-5 py-2.5 bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-brand-yellow/20"
            >
              View Site
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            {[
              { id: 'home', label: 'Home Page', icon: '🏠' },
              { id: 'about', label: 'About Page', icon: '📖' },
              { id: 'projects', label: 'Projects', icon: '💼' },
              { id: 'team', label: 'Team', icon: '👥' },
              { id: 'contact', label: 'Contact', icon: '📧' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-3 ${
                  activeTab === tab.id 
                    ? 'bg-brand-yellow text-brand-black shadow-lg shadow-brand-yellow/20' 
                    : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Editor Area */}
          <main className="lg:col-span-4 bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-10 backdrop-blur-xl">
            
            {/* HOME PAGE TAB */}
            {activeTab === 'home' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black">Home Page Settings</h3>
                </div>

                {/* Hero Section */}
                <div className="space-y-6 p-6 bg-brand-black/20 border border-white/5 rounded-2xl">
                  <h4 className="text-lg font-black text-brand-yellow">🎯 Hero Section</h4>
                  <div>
                    <label className={labelStyles}>Main Headline</label>
                    <input 
                      type="text" 
                      value={siteData.hero.title} 
                      onChange={handleHeroTitleChange} 
                      className={inputStyles}
                      placeholder="Enter hero title"
                    />
                  </div>
                  <div>
                    <label className={labelStyles}>Dynamic Carousel Words</label>
                    <div className="grid gap-3">
                      {siteData.hero.carouselWords.map((word, i) => (
                        <input 
                          key={i}
                          type="text" 
                          value={word} 
                          onChange={(e) => handleCarouselWordChange(i, e.target.value)} 
                          className={inputStyles}
                          placeholder={`Word ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Trusted By Brands */}
                <div className="space-y-6 p-6 bg-brand-black/20 border border-white/5 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-black text-brand-yellow">🏢 Trusted By Brands</h4>
                    <button 
                      onClick={addBrand}
                      className="px-4 py-2 bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-xs font-bold uppercase tracking-wider hover:bg-brand-yellow/20 rounded-xl transition-all"
                    >
                      + Add Brand
                    </button>
                  </div>
                  <div className="grid gap-3">
                    {(siteData.trustedBrands && siteData.trustedBrands.length > 0) ? (
                      siteData.trustedBrands.map((brand, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input 
                            type="text" 
                            value={brand} 
                            onChange={(e) => handleBrandChange(index, e.target.value)}
                            className={inputStyles}
                            placeholder="BRAND NAME"
                          />
                          <button 
                            onClick={() => deleteBrand(index)}
                            className="px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl hover:bg-red-500/20 transition-all flex-shrink-0"
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-white/40 text-sm text-center py-4">No brands yet. Click "Add Brand" to get started.</p>
                    )}
                  </div>
                </div>

                {/* Stats Section */}
                <div className="space-y-6 p-6 bg-brand-black/20 border border-white/5 rounded-2xl">
                  <h4 className="text-lg font-black text-brand-yellow">📊 Stats Counter</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className={labelStyles}>Projects Completed</label>
                      <input 
                        type="text" 
                        value={siteData.stats?.projects === 0 ? '' : siteData.stats?.projects || ''} 
                        onChange={(e) => handleStatsChange('projects', e.target.value)}
                        className={inputStyles}
                        placeholder="150"
                      />
                    </div>
                    <div>
                      <label className={labelStyles}>Happy Clients</label>
                      <input 
                        type="text" 
                        value={siteData.stats?.clients === 0 ? '' : siteData.stats?.clients || ''} 
                        onChange={(e) => handleStatsChange('clients', e.target.value)}
                        className={inputStyles}
                        placeholder="85"
                      />
                    </div>
                    <div>
                      <label className={labelStyles}>Total Engagement</label>
                      <input 
                        type="text" 
                        value={siteData.stats?.engagement === 0 ? '' : siteData.stats?.engagement || ''} 
                        onChange={(e) => handleStatsChange('engagement', e.target.value)}
                        className={inputStyles}
                        placeholder="25000"
                      />
                      <p className="text-[10px] text-white/30 mt-1 ml-1">
                        Will display as {siteData.stats?.engagement ? ((siteData.stats.engagement / 1000).toFixed(0) + 'K+') : '0K+'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t border-white/5">
                  <button onClick={saveHomePageChanges} className={saveBtnStyles}>
                    Save Home Page Changes
                  </button>
                </div>
              </div>
            )}

            {/* ABOUT PAGE TAB */}
            {activeTab === 'about' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black">About Page Settings</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Years of Experience */}
                  <div className="p-6 bg-brand-black/20 border border-white/5 rounded-2xl space-y-4">
                    <h4 className="text-lg font-black text-brand-yellow">📅 Years of Experience</h4>
                    <div>
                      <label className={labelStyles}>Years in Business</label>
                      <input 
                        type="text" 
                        value={siteData.about?.yearsExperience === 0 ? '' : siteData.about?.yearsExperience || ''} 
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, '');
                          const numValue = digitsOnly === '' ? 0 : parseInt(digitsOnly, 10);
                          handleAboutChange('yearsExperience', numValue);
                        }}
                        className={inputStyles}
                        placeholder="5"
                      />
                      <p className="text-[10px] text-white/30 mt-1 ml-1">This will be displayed on the About page</p>
                    </div>
                  </div>

                  {/* Partner Programs */}
                  <div className="p-6 bg-brand-black/20 border border-white/5 rounded-2xl space-y-4">
                    <h4 className="text-lg font-black text-brand-yellow">🤝 Partner Programs</h4>
                    <div>
                      <label className={labelStyles}>Number of Partner Programs</label>
                      <input 
                        type="text" 
                        value={siteData.about?.partnerPrograms === 0 ? '' : siteData.about?.partnerPrograms || ''} 
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, '');
                          const numValue = digitsOnly === '' ? 0 : parseInt(digitsOnly, 10);
                          handleAboutChange('partnerPrograms', numValue);
                        }}
                        className={inputStyles}
                        placeholder="12"
                      />
                      <p className="text-[10px] text-white/30 mt-1 ml-1">Total active partnership programs</p>
                    </div>
                  </div>

                  {/* Team Image */}
                  <div className="p-6 bg-brand-black/20 border border-white/5 rounded-2xl space-y-4">
                    <h4 className="text-lg font-black text-brand-yellow">📸 Viukon Team Picture</h4>
                    <ImageUpload
                      currentImage={siteData.about?.teamImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200'}
                      onImageUpload={(url) => handleAboutChange('teamImage', url)}
                      label="Team Photo (Recommended: 1200x600px)"
                    />
                    <p className="text-[10px] text-white/30 mt-1 ml-1">Upload a professional team photo for the About page</p>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4 border-t border-white/5">
                    <button onClick={saveAboutChanges} className={saveBtnStyles}>
                      Save About Page Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black">Projects Portfolio</h3>
                  <button 
                    onClick={addProject}
                    className="px-5 py-2.5 bg-brand-yellow text-brand-black rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow/90 active:scale-95 transition-all shadow-lg shadow-brand-yellow/20"
                  >
                    + Add Project
                  </button>
                </div>
                <div className="grid gap-6">
                  {siteData.projects.map((project: ExtendedProject) => (
                    <div key={project.id} className="p-6 bg-brand-black/30 border border-white/10 rounded-2xl space-y-5 hover:border-white/20 transition-all">
                      
                      {/* Featured Toggle */}
                      <div className="flex items-center justify-between p-4 bg-brand-yellow/5 border border-brand-yellow/20 rounded-xl">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          <div>
                            <p className="text-white font-bold text-sm">Featured on Homepage</p>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">
                              {project.featured ? 'Showing on home page' : 'Only in portfolio page'}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => updateProject(project.id, 'featured', !project.featured)}
                          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                            project.featured ? 'bg-brand-yellow' : 'bg-white/10'
                          }`}
                        >
                          <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                              project.featured ? 'translate-x-7' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className={labelStyles}>Project Title</label>
                          <input 
                            type="text" 
                            value={project.title} 
                            onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                            className={inputStyles}
                            placeholder="Enter project name"
                          />
                        </div>
                        <div>
                          <label className={labelStyles}>Category</label>
                          <div className="relative">
                            <select 
                              value={project.category} 
                              onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                              className={selectStyles}
                            >
                              {projectCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className={labelStyles}>Project Description</label>
                        <textarea 
                          value={project.description || ''} 
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                          className={textareaStyles}
                          placeholder="Describe the project goals, challenges, and outcomes..."
                          rows={4}
                        />
                      </div>
                      <div>
                        <label className={labelStyles}>Project Link (URL)</label>
                        <input 
                          type="url" 
                          value={project.link || ''} 
                          onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                          className={inputStyles}
                          placeholder="https://example.com or https://project-demo.com"
                        />
                        <p className="text-[10px] text-white/30 mt-1 ml-1">Users will be redirected here when clicking the arrow button</p>
                      </div>
                      <ImageUpload
                        currentImage={project.img}
                        onImageUpload={(url) => updateProject(project.id, 'img', url)}
                        label="Featured Image"
                      />
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <button 
                          onClick={() => deleteProject(project.id, project.title)}
                          className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider hover:bg-red-500/20 rounded-xl transition-all"
                        >
                          Delete
                        </button>
                        <button 
                          onClick={() => saveProject(project.id, project.title)}
                          className={saveBtnStyles}
                        >
                          Save Project
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TEAM TAB */}
            {activeTab === 'team' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black">Team Members</h3>
                  <button 
                    onClick={addTeamMember}
                    className="px-5 py-2.5 bg-brand-yellow text-brand-black rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow/90 active:scale-95 transition-all shadow-lg shadow-brand-yellow/20"
                  >
                    + Add Member
                  </button>
                </div>
                <div className="grid gap-6">
                  {siteData.team.map((member) => (
                    <div key={member.id} className="p-6 bg-brand-black/30 border border-white/10 rounded-2xl space-y-5 hover:border-white/20 transition-all">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className={labelStyles}>Full Name</label>
                          <input 
                            type="text" 
                            value={member.name} 
                            onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                            className={inputStyles}
                            placeholder="Enter member name"
                          />
                        </div>
                        <div>
                          <label className={labelStyles}>Job Role</label>
                          <input 
                            type="text" 
                            value={member.role} 
                            onChange={(e) => updateTeamMember(member.id, 'role', e.target.value)}
                            className={inputStyles}
                            placeholder="e.g., Creative Director"
                          />
                        </div>
                      </div>
                      <ImageUpload
                        currentImage={member.img}
                        onImageUpload={(url) => updateTeamMember(member.id, 'img', url)}
                        label="Profile Picture"
                      />
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <button 
                          onClick={() => deleteTeamMember(member.id, member.name)}
                          className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider hover:bg-red-500/20 rounded-xl transition-all"
                        >
                          Remove
                        </button>
                        <button 
                          onClick={() => saveTeamMember(member.id, member.name)}
                          className={saveBtnStyles}
                        >
                          Save Member
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT TAB */}
            {activeTab === 'contact' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black">Contact Information</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className={labelStyles}>Public Email Address</label>
                    <input 
                      type="email" 
                      value={siteData.contact.email} 
                      onChange={(e) => handleContactChange('email', e.target.value)} 
                      className={inputStyles}
                      placeholder="hello@company.com"
                    />
                  </div>
                  <div>
                    <label className={labelStyles}>Office Address</label>
                    <input 
                      type="text" 
                      value={siteData.contact.address} 
                      onChange={(e) => handleContactChange('address', e.target.value)} 
                      className={inputStyles}
                      placeholder="123 Main Street, City, Country"
                    />
                  </div>
                  <div className="flex justify-end pt-4 border-t border-white/5">
                    <button onClick={saveContactChanges} className={saveBtnStyles}>
                      Save Changes
                    </button>
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