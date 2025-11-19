import React from 'react';
import { TEAM_MEMBERS } from '../constants';
import { Target, Eye, Heart, Shield, Activity } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-slate-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-brand-900 mb-4">Who We Are</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Building a future where world-class eye care is accessible to everyone in Syria.
          </p>
        </div>
      </div>

      {/* History & Story */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img 
              src="https://picsum.photos/seed/surgery/800/600" 
              alt="Modern Eye Clinic" 
              className="rounded-2xl shadow-xl"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-brand-900 mb-6">Our Story</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Habash Med (Habash Medicals) was founded in 2018 with a singular focus: to bridge the gap between international ophthalmic innovation and local healthcare needs.
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Based in Damascus, we have grown rapidly to serve ophthalmologists, clinics, and hospitals across the nation. Our journey is defined by a commitment to not just selling equipment, but providing comprehensive solutions—from surgical disposables to complex diagnostic units.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Today, we are proud to be a trusted partner for over 15 major clinics, ensuring that the Syrian medical community has access to dependable technology and expert technical support.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-brand-500 mr-3" />
                <h3 className="text-2xl font-bold text-brand-900">Our Mission</h3>
              </div>
              <p className="text-slate-600">
                To empower eye‑care professionals by providing high‑quality ophthalmic products and reliable technical services that enhance patient care.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center mb-4">
                <Eye className="w-8 h-8 text-brand-500 mr-3" />
                <h3 className="text-2xl font-bold text-brand-900">Our Vision</h3>
              </div>
              <p className="text-slate-600">
                To become the regional leader in ophthalmic solutions by making world‑class eye care accessible and affordable throughout Syria.
              </p>
            </div>
          </div>

          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-brand-900">Core Values</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg text-brand-900 mb-2">Quality</h4>
              <p className="text-sm text-slate-600">Delivering products that meet rigorous international standards.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
                <Activity className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg text-brand-900 mb-2">Reliability</h4>
              <p className="text-sm text-slate-600">Consistent support and dependable technical performance.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg text-brand-900 mb-2">Integrity</h4>
              <p className="text-sm text-slate-600">Building trust through transparency and honest business practices.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg text-brand-900 mb-2">Customer Focus</h4>
              <p className="text-sm text-slate-600">Adapting tailored solutions to the specific needs of every client.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-brand-900 text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-brand-900">{member.name}</h3>
                <p className="text-brand-500 font-medium mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;