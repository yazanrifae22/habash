import { Activity, PenTool, PhoneCall, Settings, Truck } from 'lucide-react';
import { Category, Product, Service, TeamMember } from './types';
import { loadProductImages } from './utils/imageLoader';



export const COMPANY_INFO = {
  name: "Habash Med",
  fullName: "Habash Medicals",
  tagline: "Delivering Excellence in Vision and Ophthalmic Solutions",
  founded: 2018,
  location: "Damascus, Syria",
  address: "Mazraa, Osama bin Zaid St, Damascus, Syria",
  phone: "+963 11 44 13651",
  mobile: "+963 93 941 3333",
  email: "sales@habashmed.com",
  website: "www.habashmed.com",
  description: "Founded in 2018, Habash Med focuses on delivering innovative, high‑quality ophthalmic products and dependable technical services to empower eye‑care professionals."
};

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Eng. Anas Habash", role: "CEO", imageUrl: "https://picsum.photos/seed/anas/300/300" },
  { name: "Eng. Samih Enaya", role: "Operations Manager", imageUrl: "https://picsum.photos/seed/samih/300/300" },
  { name: "Eng. Mohammed Kherdaji", role: "Sales Manager", imageUrl: "https://picsum.photos/seed/mohammed/300/300" },
  { name: "Zaher Zaitoni", role: "Sales Representative", imageUrl: "https://picsum.photos/seed/zaher1/300/300" },
  { name: "Zaher Lababedi", role: "Sales Representative", imageUrl: "https://picsum.photos/seed/zaher2/300/300" },
  { name: "Eng. Yahya Issa", role: "Service Engineer", imageUrl: "https://picsum.photos/seed/yahya/300/300" },
];

export const SERVICES: Service[] = [
  { 
    title: "Sales & Distribution", 
    description: "A wide range of ophthalmic diagnostic and surgical equipment from world-class brands.",
    icon: <Activity className="w-10 h-10 text-brand-500" />
  },
  { 
    title: "Supply Management", 
    description: "Reliable delivery to hospitals, clinics and private practices across the nation.",
    icon: <Truck className="w-10 h-10 text-brand-500" />
  },
  { 
    title: "Surgical Disposables", 
    description: "Sterile, single‑use consumables ensuring safety and precision for every procedure.",
    icon: <PenTool className="w-10 h-10 text-brand-500" />
  },
  { 
    title: "Maintenance & Support", 
    description: "On‑site repair, calibration and preventive maintenance by our in-house engineering team.",
    icon: <Settings className="w-10 h-10 text-brand-500" />
  },
  { 
    title: "On-call Care", 
    description: "Dedicated support hotline and training for clinical staff to ensure optimal equipment usage.",
    icon: <PhoneCall className="w-10 h-10 text-brand-500" />
  },
];

// Import category images
import furnitureImg from '/src/assets/categories/Clinic Furniture.png';
import diagnosisImg from '/src/assets/categories/Diagnostic Imaging.png';
import labImg from '/src/assets/categories/Laboratory & Lens.png';
import refractionImg from '/src/assets/categories/Refraction & Optometry.png';

export const CATEGORIES: Category[] = [
  { id: 'refraction', name: 'Refraction & Optometry', imageUrl: refractionImg, description: 'High-precision auto-refractors and digital charts.' },
  { id: 'diagnosis', name: 'Diagnostic Imaging', imageUrl: diagnosisImg, description: 'Slit lamps, fundus cameras, and microscopes.' },
  { id: 'furniture', name: 'Clinic Furniture', imageUrl: furnitureImg, description: 'Electric tables and ergonomic units.' },
  { id: 'lab', name: 'Laboratory & Lens', imageUrl: labImg, description: 'Auto lensmeters and finishing equipment.' },
];

export const PRODUCTS: Product[] = [
  // Auto Ref-Keratometer
  {
    id: 'prk-9000',
    model: 'PRK-9000',
    brand: 'Potec',
    category: 'Refraction & Optometry',
    shortDescription: 'Advanced auto ref-keratometer with 3D tracking.',
    features: ['3D/2D semi‑auto tracking', 'Dry eye pre‑diagnosis', '8" wide LCD monitor', 'Multifunctional capabilities'],
    images: loadProductImages('prk-9000')
  },
  {
    id: 'prk-8000',
    model: 'PRK-8000',
    brand: 'Potec',
    category: 'Refraction & Optometry',
    shortDescription: 'High-speed measurement with pupil tracking.',
    features: ['Semi‑auto pupil tracking', 'World‑leading measurement speed', 'User‑oriented tilting & swivel monitor', 'Wider measurement range'],
    images: loadProductImages('prk-8000')
  },
  {
    id: 'prk-7000',
    model: 'PRK-7000',
    brand: 'Potec',
    category: 'Refraction & Optometry',
    shortDescription: 'Stable performance and user-friendly design.',
    features: ['Stable and accurate performance', 'Convenient measurement', 'Various functions', 'User‑friendly design'],
    images: loadProductImages('prk-7000')
  },
  {
    id: 'fr-900',
    model: 'FR/FKR-900',
    brand: 'Farliao',
    category: 'Refraction & Optometry',
    shortDescription: 'Reliable auto ref-keratometer for daily practice.',
    features: ['Accurate refractive measurement', 'Ergonomic joystick control', 'Quick thermal printing', 'Clear interface'],
    images: loadProductImages('fr-900')
  },
  
  // Digital Refractor / Phoropter
  {
    id: 'pdr-7000',
    model: 'PDR-7000',
    brand: 'Potec',
    category: 'Refraction & Optometry',
    shortDescription: 'Compact digital refractor with powerful optometry performance.',
    features: ['Precise and diverse tests', 'System networking capability', 'Fast lens switching speed', 'Convenient control board'],
    images: loadProductImages('pdr-7000')
  },
  {
    id: 'ml-400',
    model: 'ML-400',
    brand: 'Mocular Medical',
    category: 'Refraction & Optometry',
    shortDescription: 'Elegant butterfly-shaped manual phoropter.',
    features: ['Butterfly‑shaped design', 'Checks multiple visual functions', 'Precise measurement', 'Comfortable operation'],
    images: loadProductImages('ml-400')
  },

  // Charts & Projectors
  {
    id: 'pacp-8000',
    model: 'PACP-8000',
    brand: 'Potec',
    category: 'Refraction & Optometry',
    shortDescription: 'Refined auto chart projector.',
    features: ['Greater convenience', 'Refined design', 'Compact size', 'Diversified charts'],
    images: loadProductImages('pacp-8000')
  },
  {
    id: 'plc-9000',
    model: 'PLC-9000',
    brand: 'Potec',
    category: 'Refraction & Optometry',
    shortDescription: 'LCD Chart with Wi-Fi connection.',
    features: ['Convenient Wi‑Fi connection', 'User‑customised font updates', 'Wide range of visual acuity test charts'],
    images: loadProductImages('plc-9000')
  },
  {
    id: 'ml-vft23',
    model: 'ML-VFT23',
    brand: 'Mocular Medical',
    category: 'Refraction & Optometry',
    shortDescription: 'LCD Acuity Chart for vision screening.',
    features: ['Quick test function', 'Supports vision screening for low vision', 'Multiple chart types (Common, V‑type, ETDRS)'],
    images: loadProductImages('ml-vft23')
  },

  // Lensmeters
  {
    id: 'plm-8000pd',
    model: 'PLM-8000(PD)',
    brand: 'Potec',
    category: 'Laboratory & Lens',
    shortDescription: 'Auto lensmeter with Hartmann sensor.',
    features: ['Hartmann wavefront sensor', 'UV/blue‑light transmittance measurement', 'Automatic lens detection mode', 'Wi‑Fi–based wireless network'],
    images: loadProductImages('plm-8000(pd)')
  },
  
  // Slit Lamps & Imaging
  {
    id: 'ml-350a',
    model: 'ML-350A',
    brand: 'Mocular Medical',
    category: 'Diagnostic Imaging',
    shortDescription: 'High optical resolution slit lamp.',
    features: ['LED illumination', 'Flexible joystick', 'UV filter design', 'High optical resolution (2800·N lp/mm)'],
    images: loadProductImages('ml-350a')
  },
  {
    id: 'ml-350a-ccd',
    model: 'ML-350A CCD',
    brand: 'Mocular Medical',
    category: 'Diagnostic Imaging',
    shortDescription: 'Digital slit lamp with camera integration.',
    features: ['Digital slit lamp microscope', 'Camera integration (Canon EOS or Nikon DSLR)', 'Data‑synchronisation transmission', 'High clarity optics'],
    images: loadProductImages('ml-350a ccd')
  },
  
  // Fundus Cameras
  {
    id: 'cfc-x',
    model: 'CFC-X',
    brand: 'Mocular Medical',
    category: 'Diagnostic Imaging',
    shortDescription: 'Portable hand-held fundus camera.',
    features: ['Portable design', 'Quick retinal examinations', 'High resolution imaging', 'Easy data transfer'],
    images: loadProductImages('cfc-x')
  },
  {
    id: 'cfc-ai',
    model: 'CFC-AI',
    brand: 'Mocular Medical',
    category: 'Diagnostic Imaging',
    shortDescription: 'Automatic fundus camera with AI.',
    features: ['Fully automated operation', 'AI‑assisted image processing', 'Automatic tracking and focusing', 'Comprehensive retinal analysis'],
    images: loadProductImages('cfc-ai')
  },
];

