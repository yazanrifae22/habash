import { Activity, ArrowRight, CheckCircle, ChevronRight, Globe, Shield, Zap } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'

const Home: React.FC = () => {
  const { categories } = useProducts()

  return (
    <div className="flex flex-col overflow-hidden bg-white font-sans">
      {/* Light & Modern Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-100">
        {/* Dynamic Soft Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-brand-200/40 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-cyan-200/40 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4"></div>
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left z-20 animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-brand-100 bg-brand-50/50 backdrop-blur-sm text-brand-600 text-sm font-semibold mb-8 shadow-sm">
                <span className="relative flex h-2.5 w-2.5 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
                </span>
                Leading Ophthalmic Excellence
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-[1.15] tracking-tight">
                Empowering Your <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-500 pb-2 block sm:inline">
                  Vision Care
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                Discover state-of-the-art ophthalmic equipment and unparalleled service. Partner with Habash Med to elevate the standard of care in your practice.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link
                  to="/contact"
                  className="group relative px-8 py-4 bg-brand-600 rounded-full overflow-hidden shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  <span className="relative font-bold text-white flex items-center justify-center">
                    Book Consultation{' '}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  to="/products"
                  className="px-8 py-4 rounded-full border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all"
                >
                  View Catalogue
                </Link>
              </div>

              <div className="mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-10 text-slate-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-brand-500" />
                  <span className="text-sm font-medium text-slate-600">ISO Certified</span>
                </div>
                <div className="hidden md:block w-px h-6 bg-slate-200"></div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-brand-500" />
                  <span className="text-sm font-medium text-slate-600">24/7 Support</span>
                </div>
                <div className="hidden md:block w-px h-6 bg-slate-200"></div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-brand-500" />
                  <span className="text-sm font-medium text-slate-600">Nationwide Coverage</span>
                </div>
              </div>
            </div>

            {/* Clean Medical Hero Graphic (Replacing the Eye) */}
            <div className="lg:w-1/2 relative flex items-center justify-center mt-12 lg:mt-0 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              {/* Backglow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-400/10 rounded-full blur-[60px]"></div>

              {/* Main Medical Composition */}
              <div className="relative w-full max-w-lg aspect-square">
                {/* Central Floating Glass Card */}
                <div className="absolute inset-8 bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-300/60 flex flex-col items-center justify-center p-8 z-20 transition-transform duration-700 hover:scale-105">
                  <div className="w-24 h-24 bg-gradient-to-br from-brand-500 to-cyan-400 rounded-2xl shadow-lg shadow-brand-500/30 flex items-center justify-center mb-8 rotate-3">
                    <Activity className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Precision Care</h3>
                  <p className="text-slate-500 text-center text-sm leading-relaxed mb-6">Equipping professionals with the finest diagnostic instruments.</p>
                  
                  {/* Decorative Progress */}
                  <div className="w-full space-y-3">
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-brand-500 h-2 rounded-full w-[85%] relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-brand-500 rounded-full shadow-sm"></div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-cyan-400 h-2 rounded-full w-[95%] relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-cyan-400 rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orbiting Elements */}
                {/* Orbital Ring */}
                <div className="absolute inset-0 border border-slate-200/50 rounded-full animate-[spin_20s_linear_infinite]"></div>
                
                {/* Orbital Card 1 */}
                <div className="absolute top-[10%] -left-4 bg-white p-4 rounded-2xl shadow-xl shadow-slate-300/60 border border-slate-100 flex items-center gap-3 z-30 animate-float" style={{animationDelay: '1s'}}>
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">System Status</div>
                    <div className="text-sm font-bold text-slate-800">Operational</div>
                  </div>
                </div>

                {/* Orbital Card 2 */}
                <div className="absolute bottom-[15%] -right-8 bg-white p-4 rounded-2xl shadow-xl shadow-slate-300/60 border border-slate-100 flex items-center gap-3 z-30 animate-float" style={{animationDelay: '2.5s'}}>
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 border-2 border-white flex items-center justify-center text-brand-600 font-bold text-xs">Dr. A</div>
                    <div className="w-10 h-10 rounded-full bg-cyan-100 border-2 border-white flex items-center justify-center text-cyan-600 font-bold text-xs">Dr. B</div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-slate-600 font-bold text-xs">+1k</div>
                  </div>
                  <div className="ml-2">
                    <div className="text-sm font-bold text-slate-800">Trusted By</div>
                    <div className="text-xs text-slate-500">Top Clinics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Features Strip */}
      <div className="bg-white border-y border-slate-100 relative z-20 py-12 shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {[
            {
              icon: <Shield className="w-7 h-7 text-brand-500" />,
              bg: 'bg-brand-50',
              title: 'Official Partner',
              text: 'Authorized distributor for leading global ophthalmic brands.',
            },
            {
              icon: <Zap className="w-7 h-7 text-cyan-500" />,
              bg: 'bg-cyan-50',
              title: 'Rapid Response',
              text: 'Dedicated 24/7 technical support and maintenance team.',
            },
            {
              icon: <CheckCircle className="w-7 h-7 text-green-500" />,
              bg: 'bg-green-50',
              title: 'Extended Coverage',
              text: 'Comprehensive warranty and service plans for peace of mind.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-6 pt-8 md:pt-0 px-6 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:-translate-y-1`}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Categories Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzAwb2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)] opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14">
            <div className="max-w-2xl">
              <span className="text-brand-600 font-bold tracking-wider text-sm uppercase mb-3 block">Our Portfolio</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                Comprehensive Medical Solutions
              </h2>
              <p className="text-slate-600 text-lg">
                Explore our curated selection of advanced equipment tailored to enhance every aspect of your clinical workflow.
              </p>
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-800 transition-colors group bg-brand-50 px-5 py-2.5 rounded-full"
            >
              Browse Catalogue <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <Link
                key={cat.id}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group relative h-[420px] rounded-[2rem] overflow-hidden bg-white shadow-md hover:shadow-2xl hover:shadow-brand-500/20 transition-all duration-500 border border-slate-100 flex flex-col"
              >
                <div className="h-1/2 w-full overflow-hidden relative bg-slate-100">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col justify-between relative bg-white">
                  {/* Floating Action Button */}
                  <div className="absolute right-6 -top-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>

                  <div>
                    <h3 className="text-slate-900 font-bold text-xl mb-3 group-hover:text-brand-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    Explore Solutions <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link to="/products" className="inline-flex items-center justify-center w-full sm:w-auto bg-brand-50 text-brand-600 px-8 py-4 rounded-xl font-bold">
              Browse Catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* Fresh Premium CTA */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-brand-900 via-slate-900 to-cyan-900 text-white shadow-2xl flex flex-col lg:flex-row items-center border border-slate-800">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="p-12 md:p-20 lg:w-3/5 relative z-10">
              <span className="px-4 py-1.5 rounded-full bg-white/10 text-cyan-300 font-semibold text-sm tracking-wide mb-6 inline-block backdrop-blur-md border border-white/5">
                Ready to Upgrade?
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">Clinic Today</span>
              </h2>
              <p className="text-lg text-slate-300 mb-10 max-w-xl leading-relaxed font-light">
                Join the leading network of ophthalmologists across Syria. Get expert advice and personalized equipment recommendations for your practice.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-white text-slate-900 font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all hover:-translate-y-1 text-center"
                >
                  Contact Our Experts
                </Link>
                <Link
                  to="/about"
                  className="bg-white/10 text-white font-semibold py-4 px-8 rounded-full hover:bg-white/20 transition-all backdrop-blur-sm text-center border border-white/10"
                >
                  Learn About Us
                </Link>
              </div>
            </div>

            {/* Premium CTA Graphic Area */}
            <div className="lg:w-2/5 p-12 lg:p-0 relative z-10 w-full flex justify-center lg:justify-end lg:pr-20">
              <div className="relative w-full max-w-sm">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl relative">
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg rotate-12">
                    <Shield className="w-6 h-6" />
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-sm text-slate-400 mb-1">Customer Satisfaction</div>
                    <div className="text-4xl font-extrabold text-white flex items-end gap-1">
                      99.8<span className="text-2xl text-cyan-400">%</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="w-full bg-white/5 rounded-xl h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-brand-500 to-cyan-400 h-full w-[99.8%]"></div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-300 pt-2 border-t border-white/10">
                      <CheckCircle className="w-5 h-5 text-green-400" /> Premium Quality
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-300">
                      <CheckCircle className="w-5 h-5 text-green-400" /> Expert Maintenance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
