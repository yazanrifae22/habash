import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, ChevronRight, Activity, Zap, Globe } from 'lucide-react';
import { CATEGORIES } from '../constants';

const Home: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    // Calculate normalized position -0.5 to 0.5
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Calculate iris movement (clamped)
  const irisX = mousePosition.x * 100; // Max pixel movement horizontal
  const irisY = mousePosition.y * 60;  // Max pixel movement vertical

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* Interactive Hero Section */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-[95vh] bg-slate-950 text-white flex items-center overflow-hidden"
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0f172a_0%,#020617_100%)]"></div>
          {/* Subtle moving lights */}
          <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-brand-500/5 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-cyan-500/5 rounded-full blur-[100px]"></div>
          
          {/* Tech Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            
            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left animate-fade-in-up z-20">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-brand-500/30 bg-brand-950/80 backdrop-blur-md text-brand-300 text-sm font-bold mb-8 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Advanced Ophthalmic Solutions
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                Upgrade Your <br />
                {/* High visibility gradient text with shimmering movement */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-300 drop-shadow-[0_0_35px_rgba(34,211,238,0.6)] pb-2 block sm:inline bg-[length:200%_auto] animate-shimmer">
                  Practice Today
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                Join the leading ophthalmologists in Syria who trust Habash Med for precision, reliability, and excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link 
                  to="/contact" 
                  className="group relative px-8 py-4 bg-brand-600 rounded-full overflow-hidden shadow-[0_0_30px_rgba(14,165,233,0.4)] hover:shadow-[0_0_50px_rgba(14,165,233,0.6)] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  <span className="relative font-bold text-white flex items-center justify-center">
                    Request Consultation <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link 
                  to="/products" 
                  className="px-8 py-4 rounded-full border border-slate-700 text-slate-300 font-semibold hover:bg-white/5 hover:text-white hover:border-white transition-all backdrop-blur-sm"
                >
                  Explore Catalogue
                </Link>
              </div>

              <div className="mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-10 text-slate-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-brand-500" />
                  <span className="text-sm font-medium text-slate-400">Certified Quality</span>
                </div>
                <div className="hidden md:block w-px h-8 bg-slate-800"></div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-brand-500" />
                  <span className="text-sm font-medium text-slate-400">Fast Service</span>
                </div>
                <div className="hidden md:block w-px h-8 bg-slate-800"></div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-brand-500" />
                  <span className="text-sm font-medium text-slate-400">Nationwide</span>
                </div>
              </div>
            </div>

            {/* Interactive Eye Animation */}
            <div className="lg:w-1/2 relative flex items-center justify-center mt-12 lg:mt-0">
              {/* Glow behind the eye */}
              <div className="absolute w-[300px] h-[300px] bg-brand-500/20 rounded-full blur-[80px] animate-pulse"></div>

              {/* The Eye Container */}
              <div className="relative w-[320px] h-[180px] sm:w-[450px] sm:h-[260px] bg-slate-200 rounded-[100%] flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-[6px] border-slate-300 z-10 group transform transition-transform duration-500 hover:scale-105">
                {/* Sclera Shadowing */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ffffff_20%,#cbd5e1_90%)] shadow-inner"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>

                {/* The Iris */}
                <div 
                  className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-brand-500 shadow-2xl transition-transform duration-75 ease-out will-change-transform flex items-center justify-center"
                  style={{ transform: `translate(${irisX}px, ${irisY}px)` }}
                >
                  {/* Iris Texture */}
                  <div className="absolute inset-0 rounded-full bg-[conic-gradient(#06b6d4,#0ea5e9,#3b82f6,#06b6d4)] opacity-90"></div>
                  <div className="absolute inset-0 rounded-full bg-[repeating-conic-gradient(transparent_0deg,transparent_2deg,rgba(0,0,0,0.3)_3deg,transparent_4deg)] opacity-60"></div>
                  
                  {/* Pupil */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] relative flex items-center justify-center">
                     {/* Reflection 1 */}
                     <div className="absolute top-3 right-4 w-4 h-2 sm:w-6 sm:h-3 bg-white rounded-full -rotate-12 blur-[1px]"></div>
                     {/* Reflection 2 */}
                     <div className="absolute bottom-4 left-5 w-2 h-2 bg-white/50 rounded-full blur-[0.5px]"></div>
                  </div>

                  {/* Glossy overlay on iris */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-full bg-[linear-gradient(145deg,rgba(255,255,255,0.4)_0%,transparent_60%)] pointer-events-none"></div>
                </div>

                {/* Eyelid reflections (Glassy look) */}
                <div className="absolute top-0 w-[80%] h-[40%] bg-white/20 rounded-[50%] blur-md pointer-events-none"></div>
              </div>

              {/* Floating Tech Elements */}
              <div className="absolute inset-0 pointer-events-none">
                 {/* Rotating ring */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[200px] sm:w-[500px] sm:h-[300px] border border-cyan-500/30 rounded-[100%] animate-[spin_10s_linear_infinite_reverse] border-dashed"></div>
                 
                 {/* Bracket corners */}
                 <div className="absolute top-[-20px] left-[-20px] w-16 h-16 border-t-2 border-l-2 border-brand-500/50 rounded-tl-2xl"></div>
                 <div className="absolute bottom-[-20px] right-[-20px] w-16 h-16 border-b-2 border-r-2 border-brand-500/50 rounded-br-2xl"></div>
                 
                 {/* Floating Tag */}
                 <div className="absolute top-[10%] right-[0%] bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-3 py-1 rounded text-[10px] text-cyan-400 font-mono animate-pulse">
                    SYSTEM: ACTIVE
                 </div>
              </div>
            </div>

          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
           <span className="text-xs uppercase tracking-widest text-slate-400">Discover</span>
           <div className="w-5 h-8 border border-slate-600 rounded-full flex justify-center p-1">
             <div className="w-1 h-2 bg-brand-400 rounded-full animate-scroll"></div>
           </div>
        </div>
      </section>

      {/* Features Strip - Modernized */}
      <div className="bg-white border-b border-slate-100 relative z-20 -mt-8 container mx-auto max-w-6xl rounded-2xl shadow-2xl shadow-slate-200/50 p-10 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
         {[
            { icon: <Shield className="w-6 h-6 text-brand-600" />, title: 'Official Distributor', text: 'Authorized partner for global brands' },
            { icon: <Zap className="w-6 h-6 text-brand-600" />, title: 'Rapid Response', text: '24/7 Technical support hotline' },
            { icon: <CheckCircle className="w-6 h-6 text-brand-600" />, title: 'Extended Warranty', text: 'Comprehensive service coverage' },
         ].map((item, i) => (
            <div key={i} className="flex items-start gap-5 pt-6 md:pt-0 px-4 hover:bg-slate-50 transition-colors rounded-xl">
               <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0 shadow-sm text-brand-600">
                 {item.icon}
               </div>
               <div>
                 <h3 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h3>
                 <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
               </div>
            </div>
         ))}
      </div>

      {/* Categories Preview - Redesigned */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive Solutions</h2>
              <p className="text-slate-600 text-lg">State-of-the-art equipment tailored for every aspect of your ophthalmic practice.</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center text-brand-600 font-bold hover:text-brand-700 transition-colors mt-4 md:mt-0">
              View All Categories <ChevronRight className="ml-1 w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <Link 
                key={cat.id} 
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group relative h-[380px] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-brand-500/20 transition-all duration-500 border border-slate-100"
              >
                <img 
                  src={cat.imageUrl} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-brand-300 text-xs font-bold uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">Explore</p>
                    <h3 className="text-white font-bold text-2xl mb-3 leading-tight group-hover:text-brand-100 transition-colors">{cat.name}</h3>
                    <p className="text-slate-300 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {cat.description}
                    </p>
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-brand-500 group-hover:scale-110 transition-all duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/products" className="inline-flex items-center text-brand-600 font-bold">
              View All Categories <ChevronRight className="ml-1 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Background decoration to blend section */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="group relative rounded-[2.5rem] overflow-hidden bg-slate-900 text-white shadow-2xl shadow-brand-900/40 transition-all duration-500 hover:shadow-brand-500/30 hover:-translate-y-1 border border-white/10">
            
            {/* Animated Background Layers */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Base Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900"></div>
              
              {/* Moving Blobs */}
              <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[100%] bg-brand-500/20 rounded-full blur-[100px] animate-float"></div>
              <div className="absolute top-[20%] -right-[20%] w-[70%] h-[100%] bg-cyan-500/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
              
              {/* Tech Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center p-10 md:p-16 lg:p-20">
              
              {/* Left: Text & CTA */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-brand-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                  Next Generation Care
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                  Future-Proof Your <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-brand-300 animate-shimmer bg-[length:200%_auto]">
                    Medical Practice
                  </span>
                </h2>
                
                <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                  Partner with Habash Med to access cutting-edge ophthalmic technology. We deliver precision, reliability, and comprehensive support.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                   <Link 
                    to="/contact" 
                    className="group relative overflow-hidden bg-brand-500 text-white font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_40px_rgba(14,165,233,0.5)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="flex items-center justify-center gap-2 relative z-10">
                      Start Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right: Interactive Graphic */}
              <div className="relative flex items-center justify-center perspective-1000">
                 {/* Glass Card */}
                 <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 flex flex-col justify-between shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-brand-500/20">
                    {/* Decorative header within card */}
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                       </div>
                       <div className="h-1 w-20 bg-white/10 rounded-full"></div>
                    </div>

                    {/* Stats / Graphic Content */}
                    <div className="space-y-4">
                       {/* Stat Bar 1 */}
                       <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4 border border-white/5 hover:bg-white/10 transition-colors group/stat">
                          <div className="w-12 h-12 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-300 group-hover/stat:scale-110 transition-transform">
                             <Activity className="w-6 h-6" />
                          </div>
                          <div>
                             <div className="text-2xl font-bold text-white">15+</div>
                             <div className="text-xs text-slate-400 uppercase tracking-wider">Major Clinics</div>
                          </div>
                       </div>

                       {/* Stat Bar 2 */}
                       <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4 border border-white/5 hover:bg-white/10 transition-colors group/stat">
                          <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300 group-hover/stat:scale-110 transition-transform">
                             <Shield className="w-6 h-6" />
                          </div>
                          <div>
                             <div className="text-2xl font-bold text-white">100%</div>
                             <div className="text-xs text-slate-400 uppercase tracking-wider">Service Uptime</div>
                          </div>
                       </div>
                    </div>

                    {/* Bottom Chart Simulation */}
                    <div className="mt-6 flex items-end justify-between gap-2 h-24 px-2">
                       {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                          <div key={i} className="w-full bg-white/5 rounded-t-sm relative overflow-hidden h-full flex items-end">
                             <div className="w-full bg-gradient-to-t from-brand-600 to-cyan-400 animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 100}ms`, animationDuration: '3s' }}></div>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* Floating Elements behind/around card */}
                 <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-500/20 rounded-full blur-[100px]"></div>
                 
                 {/* Floating Badge */}
                 <div className="absolute -right-4 -top-4 md:right-0 md:top-0 bg-slate-800 p-3 rounded-xl shadow-xl border border-slate-700 animate-float">
                    <div className="flex items-center gap-3">
                       <div className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                       </div>
                       <span className="text-xs font-bold text-white">System Active</span>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;