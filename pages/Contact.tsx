import React from 'react';
import { COMPANY_INFO } from '../constants';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-brand-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-brand-100 max-w-2xl mx-auto text-lg">
            Have questions about our products or need technical support? We are here to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-brand-900 mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-white p-3 rounded-lg shadow-sm mr-4 text-brand-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Head Office</h3>
                  <p className="text-slate-600">{COMPANY_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-3 rounded-lg shadow-sm mr-4 text-brand-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Phone</h3>
                  <p className="text-slate-600">Landline: {COMPANY_INFO.phone}</p>
                  <p className="text-slate-600">Mobile: {COMPANY_INFO.mobile}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-3 rounded-lg shadow-sm mr-4 text-brand-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Email</h3>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-brand-500 hover:underline">{COMPANY_INFO.email}</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-3 rounded-lg shadow-sm mr-4 text-brand-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Business Hours</h3>
                  <p className="text-slate-600">Saturday - Thursday: 9:00 AM - 5:00 PM</p>
                  <p className="text-slate-600">Friday: Closed</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 bg-white p-2 rounded-xl shadow-sm border border-slate-200 h-64 relative overflow-hidden">
              <img 
                src="https://picsum.photos/seed/damascusmap/800/400" 
                alt="Map location of Mazraa, Damascus" 
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-transparent transition-colors">
                 <a 
                   href="https://www.google.com/maps" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="bg-white text-brand-900 px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-brand-50"
                 >
                   View on Google Maps
                 </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
