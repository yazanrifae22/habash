import React from 'react';
import { SERVICES } from '../constants';
import { MapPin } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-brand-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-brand-100 max-w-2xl mx-auto text-lg">
            Comprehensive support for the ophthalmic community, from supply to maintenance.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div key={index} className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-brand-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-brand-900 mb-6">Geographical Coverage</h2>
              <p className="text-slate-600 mb-6 text-lg">
                We are committed to making ophthalmic care accessible across Syria. Our logistics and support network ensures timely delivery and service regardless of location.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="bg-brand-100 p-2 rounded-full mr-4 text-brand-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-brand-900 block">Damascus & Rural Damascus</span>
                    <span className="text-sm text-slate-500">Headquarters & Primary Operations</span>
                  </div>
                </li>
                <li className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="bg-brand-100 p-2 rounded-full mr-4 text-brand-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-brand-900 block">Homs & Central Region</span>
                    <span className="text-sm text-slate-500">Established Distribution Network</span>
                  </div>
                </li>
                <li className="flex items-center bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-400">
                  <div className="bg-yellow-100 p-2 rounded-full mr-4 text-yellow-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-brand-900 block">Northern Syria</span>
                    <span className="text-sm text-slate-500">Planned Expansion & Strategic Growth</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              {/* Abstract Map Representation */}
              <div className="relative w-full max-w-md aspect-square bg-brand-100 rounded-full flex items-center justify-center p-8">
                <div className="w-full h-full bg-white rounded-full shadow-inner flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="https://picsum.photos/seed/map/600/600" 
                    alt="Coverage Map" 
                    className="opacity-50 object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-brand-900 text-white px-6 py-2 rounded-full font-bold shadow-xl z-10">Syria Wide Coverage</span>
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

export default Services;
