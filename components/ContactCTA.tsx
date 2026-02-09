import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ContactProps {
  isFullPage?: boolean;
  contact: {
    email: string;
    address: string;
  };
}

export const ContactCTA: React.FC<ContactProps> = ({ isFullPage = false, contact }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Brand Identity',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data - ALL EMAILS GO TO viukondigitals@gmail.com
    const mailtoLink = `mailto:viukondigitals@gmail.com?subject=${encodeURIComponent(formData.subject + ' - From ' + formData.name)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Reset form
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: 'Brand Identity', message: '' });
      
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className={`bg-brand-black relative overflow-hidden ${isFullPage ? 'min-h-screen flex items-center pt-32' : 'py-32'}`}>
      <div className={`absolute inset-0 z-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center ${isFullPage ? 'opacity-10' : ''}`}>
         <img 
            src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
            alt="map" 
            className="w-full h-auto scale-125 invert"
         />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {isFullPage ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
               <span className="px-4 py-2 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full text-xs font-black text-brand-yellow uppercase tracking-widest">
                 Connect
               </span>
               <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">
                 Start Your <br /><span className="text-brand-yellow">Project</span>
               </h1>
               <p className="text-white/40 text-xl leading-relaxed max-w-md font-medium">
                 Ready to dominate your market? Drop us a line and our strategy leads will get back to you within 24 hours.
               </p>
               
               <div className="space-y-6 pt-10">
                  {/* Email */}
                  <a 
                    href="mailto:viukondigitals@gmail.com"
                    className="flex items-center gap-4 text-white/60 hover:text-brand-yellow transition-colors group"
                  >
                     <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-brand-yellow/20 flex items-center justify-center text-brand-yellow transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                     </div>
                     <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-brand-yellow/40 transition-colors">Email Us</div>
                        <div className="text-white font-bold group-hover:text-brand-yellow transition-colors">viukondigitals@gmail.com</div>
                     </div>
                  </a>

                  {/* Phone */}
                  <a 
                    href="tel:+94778123732"
                    className="flex items-center gap-4 text-white/60 hover:text-brand-yellow transition-colors group"
                  >
                     <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-brand-yellow/20 flex items-center justify-center text-brand-yellow transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                     </div>
                     <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-brand-yellow/40 transition-colors">Call Us</div>
                        <div className="text-white font-bold group-hover:text-brand-yellow transition-colors">077 812 3732</div>
                     </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-center gap-4 text-white/60">
                     <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-yellow">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                     </div>
                     <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Visit Us</div>
                        <div className="text-white font-bold">{contact.address}</div>
                     </div>
                  </div>
                  
                  {/* Social Media Links */}
                  <div className="flex items-center gap-4 pt-6">
                     {/* Facebook */}
                     <a 
                       href="https://www.facebook.com/viukon" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="w-12 h-12 rounded-full bg-white/5 hover:bg-white flex items-center justify-center text-brand-yellow hover:text-brand-black transition-all"
                       aria-label="Facebook"
                     >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                     </a>

                     {/* Instagram */}
                     <a 
                       href="https://www.instagram.com/viukon" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="w-12 h-12 rounded-full bg-white/5 hover:bg-white flex items-center justify-center text-brand-yellow hover:text-brand-black transition-all"
                       aria-label="Instagram"
                     >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                        </svg>
                     </a>

                     {/* TikTok */}
                     <a 
                       href="https://www.tiktok.com/@viukon?_r=1&_t=ZS-93Q9bWEuqDh" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="w-12 h-12 rounded-full bg-white/5 hover:bg-white flex items-center justify-center text-brand-yellow hover:text-brand-black transition-all"
                       aria-label="TikTok"
                     >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                        </svg>
                     </a>

                     {/* LinkedIn */}
                     <a 
                       href="https://www.linkedin.com/company/viukon/" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="w-12 h-12 rounded-full bg-white/5 hover:bg-white flex items-center justify-center text-brand-yellow hover:text-brand-black transition-all"
                       aria-label="LinkedIn"
                     >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                     </a>
                  </div>
               </div>
            </div>

            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 md:p-12 relative">
               {/* Success Message */}
               {submitStatus === 'success' && (
                 <div className="absolute inset-0 bg-brand-black/95 backdrop-blur-xl rounded-[40px] flex items-center justify-center z-20 animate-in fade-in">
                   <div className="text-center">
                     <div className="w-20 h-20 bg-brand-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6">
                       <svg className="w-10 h-10 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                       </svg>
                     </div>
                     <h3 className="text-2xl font-black text-white mb-2">Email Client Opened!</h3>
                     <p className="text-white/60 text-sm">Check your email application</p>
                   </div>
                 </div>
               )}

               <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Full Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-yellow transition-colors" 
                          placeholder="John Doe"
                          required
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-yellow transition-colors" 
                          placeholder="john@example.com"
                          required
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Subject</label>
                     <select 
                       name="subject"
                       value={formData.subject}
                       onChange={handleChange}
                       className="w-full bg-brand-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-yellow transition-colors appearance-none"
                     >
                        <option>Brand Identity</option>
                        <option>SEO Strategy</option>
                        <option>Performance Marketing</option>
                        <option>Web Development</option>
                        <option>Social Media Marketing</option>
                        <option>Other</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Message</label>
                     <textarea 
                       rows={4} 
                       name="message"
                       value={formData.message}
                       onChange={handleChange}
                       className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-yellow transition-colors" 
                       placeholder="Tell us about your project..."
                       required
                     ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-yellow text-brand-black py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     {isSubmitting ? 'Opening Email...' : 'Send Message'}
                  </button>
               </form>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="mb-8">
               <span className="px-4 py-2 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full text-[10px] font-black text-brand-yellow uppercase tracking-widest">
                 Let's Connect
               </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-10 max-w-4xl leading-[1.1] tracking-tighter">
              Let's <span className="text-brand-yellow italic">Transform</span> <br />
              Future Marketing Together
            </h2>
            
            <div className="flex flex-wrap items-center justify-center gap-6">
              <button 
                onClick={() => {
                  navigate('/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="glass-button-yellow px-10 py-5 bg-brand-yellow/10 text-brand-yellow rounded-full font-black text-lg hover:bg-brand-yellow hover:text-brand-black transition-all flex items-center gap-3 group border-brand-yellow/30"
              >
                Contact Us Today
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};