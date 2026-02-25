import { Activity, PenTool, PhoneCall, Settings, Truck } from 'lucide-react'
import { Category, Product, Service, TeamMember } from './types'
import { loadProductImages } from './utils/imageLoader'

export const COMPANY_INFO = {
  name: 'Habash Med',
  fullName: 'Habash Medicals',
  tagline: 'Delivering Excellence in Vision and Ophthalmic Solutions',
  founded: 2018,
  location: 'Damascus, Syria',
  address: 'Mazraa, Osama bin Zaid St, Damascus, Syria',
  phone: '+963 11 44 13651',
  mobile: '+963 93 941 3333',
  email: 'sales@habashmed.com',
  website: 'www.habashmed.com',
  description:
    'Founded in 2018, Habash Med focuses on delivering innovative, high‑quality ophthalmic products and dependable technical services to empower eye‑care professionals.',
}

export const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Eng. Anas Habash', role: 'CEO', imageUrl: 'https://picsum.photos/seed/anas/300/300' },
  {
    name: 'Eng. Samih Enaya',
    role: 'Operations Manager',
    imageUrl: 'https://picsum.photos/seed/samih/300/300',
  },
  {
    name: 'Eng. Mohammed Kherdaji',
    role: 'Sales Manager',
    imageUrl: 'https://picsum.photos/seed/mohammed/300/300',
  },
  {
    name: 'Zaher Zaitoni',
    role: 'Sales Representative',
    imageUrl: 'https://picsum.photos/seed/zaher1/300/300',
  },
  {
    name: 'Zaher Lababedi',
    role: 'Sales Representative',
    imageUrl: 'https://picsum.photos/seed/zaher2/300/300',
  },
  {
    name: 'Eng. Yahya Issa',
    role: 'Service Engineer',
    imageUrl: 'https://picsum.photos/seed/yahya/300/300',
  },
]

export const SERVICES: Service[] = [
  {
    title: 'Sales & Distribution',
    description:
      'A wide range of ophthalmic diagnostic and surgical equipment from world-class brands.',
    icon: <Activity className="w-10 h-10 text-brand-500" />,
  },
  {
    title: 'Supply Management',
    description: 'Reliable delivery to hospitals, clinics and private practices across the nation.',
    icon: <Truck className="w-10 h-10 text-brand-500" />,
  },
  {
    title: 'Surgical Disposables',
    description:
      'Sterile, single‑use consumables ensuring safety and precision for every procedure.',
    icon: <PenTool className="w-10 h-10 text-brand-500" />,
  },
  {
    title: 'Maintenance & Support',
    description:
      'On‑site repair, calibration and preventive maintenance by our in-house engineering team.',
    icon: <Settings className="w-10 h-10 text-brand-500" />,
  },
  {
    title: 'On-call Care',
    description:
      'Dedicated support hotline and training for clinical staff to ensure optimal equipment usage.',
    icon: <PhoneCall className="w-10 h-10 text-brand-500" />,
  },
]

// Categories in requested order
export const CATEGORIES: Category[] = [
  {
    id: 'iols',
    name: 'Intraocular Lenses (IOLs)',
    imageUrl: '',
    description: 'Premium intraocular lenses for cataract and refractive surgery.',
  },
  {
    id: 'surgical',
    name: 'Surgical Supplies',
    imageUrl: '',
    description: 'Sterile surgical disposables and ophthalmic supplies.',
  },
  {
    id: 'diagnostic',
    name: 'Diagnostic & Imaging Equipment',
    imageUrl: '',
    description: 'Auto ref-keratometers, slit lamps, and fundus cameras.',
  },
  {
    id: 'vision',
    name: 'Vision Testing & Refraction Equipment',
    imageUrl: '',
    description: 'Digital refractors, phoropters, and visual charts.',
  },
  {
    id: 'clinic',
    name: 'Clinic Fixtures & Practice Equipment',
    imageUrl: '',
    description: 'Electric combined tables and ergonomic units.',
  },
  {
    id: 'digital',
    name: 'Digital Imaging Accessories',
    imageUrl: '',
    description: 'Slit lamp and surgical microscope digital systems.',
  },
]

export const PRODUCTS: Product[] = [
  // ================================
  // Intraocular Lenses (IOLs) - VSY Biotechnology
  // ================================
  {
    id: 'acriva-ud-613',
    model: 'Acriva UD 613',
    brand: 'VSY Biotechnology',
    category: 'Intraocular Lenses (IOLs)',
    shortDescription: 'Premium monofocal intraocular lens.',
    features: ['Monofocal IOL', 'UV absorbing', 'Hydrophobic acrylic', 'Square edge optic design'],
    images: loadProductImages('acriva-ud-613'),
  },
  {
    id: 'acriva-bb-ud-613',
    model: 'Acriva BB UD 613',
    brand: 'VSY Biotechnology',
    category: 'Intraocular Lenses (IOLs)',
    shortDescription: 'Blue-blocking monofocal intraocular lens.',
    features: [
      'Blue light filtering',
      'Monofocal IOL',
      'Hydrophobic acrylic',
      'Enhanced contrast sensitivity',
    ],
    images: loadProductImages('acriva-bb-ud-613'),
  },
  {
    id: 'acriva-trinova',
    model: 'Acriva Trinova',
    brand: 'VSY Biotechnology',
    category: 'Intraocular Lenses (IOLs)',
    shortDescription: 'Trifocal intraocular lens for full range vision.',
    features: [
      'Trifocal technology',
      'Near, intermediate, and distance vision',
      'Reduced halos and glare',
      'Premium optics',
    ],
    images: loadProductImages('acriva-trinova'),
  },
  {
    id: 'acriva-trinova-pro',
    model: 'Acriva Trinova Pro',
    brand: 'VSY Biotechnology',
    category: 'Intraocular Lenses (IOLs)',
    shortDescription: 'Advanced trifocal IOL with enhanced optics.',
    features: [
      'Enhanced trifocal design',
      'Superior light distribution',
      'Minimized visual disturbances',
      'Extended depth of focus',
    ],
    images: loadProductImages('acriva-trinova-pro'),
  },
  {
    id: 'enova',
    model: 'Enova',
    brand: 'VSY Biotechnology',
    category: 'Intraocular Lenses (IOLs)',
    shortDescription: 'Monofocal IOL with advanced optical quality.',
    features: [
      'Monofocal lens',
      'Hydrophobic material',
      'Excellent optical clarity',
      'Easy implantation',
    ],
    images: loadProductImages('enova'),
  },
  {
    id: 'enova-maestro',
    model: 'Enova Maestro',
    brand: 'VSY Biotechnology',
    category: 'Intraocular Lenses (IOLs)',
    shortDescription: 'Premium enhanced monofocal IOL.',
    features: [
      'Enhanced monofocal technology',
      'Extended range of vision',
      'Reduced spherical aberration',
      'Premium optic design',
    ],
    images: loadProductImages('enova-maestro'),
  },
  {
    id: 'enova-advanced',
    model: 'Enova Advanced',
    brand: 'VSY Biotechnology',
    category: 'Intraocular Lenses (IOLs)',
    shortDescription: 'Advanced monofocal IOL with superior performance.',
    features: [
      'Advanced optical design',
      'High-quality vision',
      'Aspherical optics',
      'Excellent biocompatibility',
    ],
    images: loadProductImages('enova-advanced'),
  },
  {
    id: 'enova-maestro-toric',
    model: 'Enova Maestro Toric',
    brand: 'VSY Biotechnology',
    category: 'Intraocular Lenses (IOLs)',
    shortDescription: 'Toric IOL for astigmatism correction.',
    features: [
      'Astigmatism correction',
      'Enhanced monofocal technology',
      'Rotational stability',
      'Precise axis alignment',
    ],
    images: loadProductImages('enova-maestro-toric'),
  },
  {
    id: 'enova-advanced-toric',
    model: 'Enova Advanced Toric',
    brand: 'VSY Biotechnology',
    category: 'Intraocular Lenses (IOLs)',
    shortDescription: 'Advanced toric IOL with superior astigmatism correction.',
    features: [
      'Advanced toric design',
      'High rotational stability',
      'Excellent visual outcomes',
      'Aspherical optics',
    ],
    images: loadProductImages('enova-advanced-toric'),
  },
  {
    id: 'bioflex',
    model: 'Bioflex',
    brand: 'VSY Biotechnology',
    category: 'Intraocular Lenses (IOLs)',
    shortDescription: 'Flexible IOL for optimal performance.',
    features: ['Flexible haptic design', 'Foldable lens', 'Easy insertion', 'Excellent centration'],
    images: loadProductImages('bioflex'),
  },

  // ================================
  // Surgical Supplies - Surgitech Innovation
  // ================================
  {
    id: 'micro-surgical-knives',
    model: 'Micro Surgical Knives',
    brand: 'Surgitech Innovation',
    category: 'Surgical Supplies',
    shortDescription: 'Precision surgical disposable knives.',
    features: [
      'Ultra-sharp blades',
      'Sterile single-use',
      'Ergonomic handle',
      'Various blade configurations',
    ],
    images: loadProductImages('micro-surgical-knives'),
  },
  {
    id: 'io-lon',
    model: 'IO-Lon',
    brand: 'Surgitech Innovation',
    category: 'Surgical Supplies',
    shortDescription: 'Ophthalmic surgical supply for intraocular procedures.',
    features: ['Sterile formulation', 'Intraocular use', 'High purity', 'Single-use packaging'],
    images: loadProductImages('io-lon'),
  },
  {
    id: 'io-chol',
    model: 'IO-Chol',
    brand: 'Surgitech Innovation',
    category: 'Surgical Supplies',
    shortDescription: 'Ophthalmic surgical supply.',
    features: ['Sterile solution', 'Surgical applications', 'Quality assured', 'Easy dispensing'],
    images: loadProductImages('io-chol'),
  },
  {
    id: 'io-blue',
    model: 'IO-Blue',
    brand: 'Surgitech Innovation',
    category: 'Surgical Supplies',
    shortDescription: 'Ophthalmic surgical dye for visibility.',
    features: [
      'Trypan blue dye',
      'Capsule staining',
      'Enhanced visualization',
      'Sterile single-use',
    ],
    images: loadProductImages('io-blue'),
  },
  {
    id: 'io-gel',
    model: 'IO-Gel',
    brand: 'Surgitech Innovation',
    category: 'Surgical Supplies',
    shortDescription: 'Ophthalmic viscoelastic gel.',
    features: [
      'Viscoelastic properties',
      'Tissue protection',
      'Easy injection',
      'Maintains anterior chamber',
    ],
    images: loadProductImages('io-gel'),
  },
  {
    id: 'pre-cut-eye-drape',
    model: 'Pre-Cut Eye Drape',
    brand: 'Surgitech Innovation',
    category: 'Surgical Supplies',
    shortDescription: 'Surgical disposable drape for ophthalmic procedures.',
    features: ['Pre-cut aperture', 'Fluid-resistant', 'Adhesive edges', 'Sterile packaging'],
    images: loadProductImages('pre-cut-eye-drape'),
  },

  // ================================
  // Diagnostic & Imaging Equipment
  // ================================
  // Potec
  {
    id: 'prk-9000',
    model: 'PRK-9000',
    brand: 'Potec',
    category: 'Diagnostic & Imaging Equipment',
    shortDescription: 'Advanced auto ref-keratometer with 3D tracking.',
    features: [
      '3D/2D semi‑auto tracking',
      'Dry eye pre‑diagnosis',
      '8" wide LCD monitor',
      'Multifunctional capabilities',
    ],
    images: loadProductImages('prk-9000'),
  },
  {
    id: 'prk-8000',
    model: 'PRK-8000',
    brand: 'Potec',
    category: 'Diagnostic & Imaging Equipment',
    shortDescription: 'High-speed measurement with pupil tracking.',
    features: [
      'Semi‑auto pupil tracking',
      'World‑leading measurement speed',
      'User‑oriented tilting & swivel monitor',
      'Wider measurement range',
    ],
    images: loadProductImages('prk-8000'),
  },
  {
    id: 'prk-7000',
    model: 'PRK-7000',
    brand: 'Potec',
    category: 'Diagnostic & Imaging Equipment',
    shortDescription: 'Stable performance and user-friendly design.',
    features: [
      'Stable and accurate performance',
      'Convenient measurement',
      'Various functions',
      'User‑friendly design',
    ],
    images: loadProductImages('prk-7000'),
  },
  // Farliao
  {
    id: 'fr-fkr-900',
    model: 'FR/FKR-900',
    brand: 'Farliao',
    category: 'Diagnostic & Imaging Equipment',
    shortDescription: 'Reliable auto ref-keratometer for daily practice.',
    features: [
      'Accurate refractive measurement',
      'Ergonomic joystick control',
      'Quick thermal printing',
      'Clear interface',
    ],
    images: loadProductImages('fr-900'),
  },
  {
    id: 'fr-fkr-710',
    model: 'FR/FKR-710',
    brand: 'Farliao',
    category: 'Diagnostic & Imaging Equipment',
    shortDescription: 'Compact auto ref-keratometer.',
    features: ['Compact design', 'Fast measurement', 'Easy operation', 'Reliable results'],
    images: loadProductImages('fr-710'),
  },
  {
    id: 'fr-fkr-8900',
    model: 'FR/FKR-8900',
    brand: 'Farliao',
    category: 'Diagnostic & Imaging Equipment',
    shortDescription: 'Advanced auto ref-keratometer for professional use.',
    features: ['Advanced optical system', 'High precision', 'Multiple functions', 'Modern design'],
    images: loadProductImages('fr-8900'),
  },
  // Mocular Medical
  {
    id: 'ml-350a',
    model: 'ML-350A',
    brand: 'Mocular Medical',
    category: 'Diagnostic & Imaging Equipment',
    shortDescription: 'High optical resolution slit lamp.',
    features: [
      'LED illumination',
      'Flexible joystick',
      'UV filter design',
      'High optical resolution (2800·N lp/mm)',
    ],
    images: loadProductImages('ml-350a'),
  },
  {
    id: 'ml-350a-ccd',
    model: 'ML-350A CCD',
    brand: 'Mocular Medical',
    category: 'Diagnostic & Imaging Equipment',
    shortDescription: 'Digital slit lamp with camera integration.',
    features: [
      'Digital slit lamp microscope',
      'Camera integration (Canon EOS or Nikon DSLR)',
      'Data‑synchronisation transmission',
      'High clarity optics',
    ],
    images: loadProductImages('ml-350a ccd'),
  },
  {
    id: 'ml-350d',
    model: 'ML-350D',
    brand: 'Mocular Medical',
    category: 'Diagnostic & Imaging Equipment',
    shortDescription: 'Digital slit lamp microscope with advanced features.',
    features: [
      'Digital imaging system',
      'High resolution optics',
      'Easy data management',
      'Modern interface',
    ],
    images: loadProductImages('ml-350d'),
  },
  {
    id: 'cfc-x',
    model: 'CFC-X',
    brand: 'Mocular Medical',
    category: 'Diagnostic & Imaging Equipment',
    shortDescription: 'Portable hand-held fundus camera.',
    features: [
      'Portable design',
      'Quick retinal examinations',
      'High resolution imaging',
      'Easy data transfer',
    ],
    images: loadProductImages('cfc-x'),
  },
  {
    id: 'cfc-ai',
    model: 'CFC-AI',
    brand: 'Mocular Medical',
    category: 'Diagnostic & Imaging Equipment',
    shortDescription: 'Automatic fundus camera with AI.',
    features: [
      'Fully automated operation',
      'AI‑assisted image processing',
      'Automatic tracking and focusing',
      'Comprehensive retinal analysis',
    ],
    images: loadProductImages('cfc-ai'),
  },
  {
    id: 'cvs-x',
    model: 'CVS-X',
    brand: 'Mocular Medical',
    category: 'Diagnostic & Imaging Equipment',
    shortDescription: 'Vision screening instrument.',
    features: ['Quick vision screening', 'Portable design', 'Multiple test modes', 'Easy to use'],
    images: loadProductImages('cvs-x'),
  },
  {
    id: 'ml5s1',
    model: 'ML5S1',
    brand: 'Mocular Medical',
    category: 'Diagnostic & Imaging Equipment',
    shortDescription: 'Hand-held slit lamp microscope.',
    features: ['Portable slit lamp', 'LED illumination', 'Lightweight design', 'Battery operated'],
    images: loadProductImages('ml5s1'),
  },

  // ================================
  // Vision Testing & Refraction Equipment
  // ================================
  // Potec
  {
    id: 'pdr-7000',
    model: 'PDR-7000',
    brand: 'Potec',
    category: 'Vision Testing & Refraction Equipment',
    shortDescription: 'Compact digital refractor with powerful optometry performance.',
    features: [
      'Precise and diverse tests',
      'System networking capability',
      'Fast lens switching speed',
      'Convenient control board',
    ],
    images: loadProductImages('pdr-7000'),
  },
  {
    id: 'pacp-8000',
    model: 'PACP-8000',
    brand: 'Potec',
    category: 'Vision Testing & Refraction Equipment',
    shortDescription: 'Refined auto chart projector.',
    features: ['Greater convenience', 'Refined design', 'Compact size', 'Diversified charts'],
    images: loadProductImages('pacp-8000'),
  },
  {
    id: 'plc-9000',
    model: 'PLC-9000',
    brand: 'Potec',
    category: 'Vision Testing & Refraction Equipment',
    shortDescription: 'LCD Chart with Wi-Fi connection.',
    features: [
      'Convenient Wi‑Fi connection',
      'User‑customised font updates',
      'Wide range of visual acuity test charts',
    ],
    images: loadProductImages('plc-9000'),
  },
  {
    id: 'plm-8000pd',
    model: 'PLM-8000 (PD)',
    brand: 'Potec',
    category: 'Vision Testing & Refraction Equipment',
    shortDescription: 'Auto lensmeter with Hartmann sensor.',
    features: [
      'Hartmann wavefront sensor',
      'UV/blue‑light transmittance measurement',
      'Automatic lens detection mode',
      'Wi‑Fi–based wireless network',
    ],
    images: loadProductImages('plm-8000(pd)'),
  },
  // Farliao
  {
    id: 'fap-8',
    model: 'FAP-8 / FAP-8P',
    brand: 'Farliao',
    category: 'Vision Testing & Refraction Equipment',
    shortDescription: 'Digital refractor for comprehensive eye exams.',
    features: [
      'Digital refraction',
      'Multiple test modes',
      'Ergonomic design',
      'Fast lens changes',
    ],
    images: loadProductImages('fap-8'),
  },
  {
    id: 'fvc-210',
    model: 'FVC-210',
    brand: 'Farliao',
    category: 'Vision Testing & Refraction Equipment',
    shortDescription: 'LCD visual chart for acuity testing.',
    features: ['LCD display', 'Multiple chart options', 'Remote control', 'Customizable charts'],
    images: loadProductImages('fvc-210'),
  },
  {
    id: 'fl-800m',
    model: 'FL-800M',
    brand: 'Farliao',
    category: 'Vision Testing & Refraction Equipment',
    shortDescription: 'Auto lensmeter for lens measurement.',
    features: ['Automatic measurement', 'Easy operation', 'Clear display', 'Compact design'],
    images: loadProductImages('fl-800m'),
  },
  {
    id: 'fl-8600m',
    model: 'FL-8600M',
    brand: 'Farliao',
    category: 'Vision Testing & Refraction Equipment',
    shortDescription: 'Advanced auto lensmeter with enhanced features.',
    features: ['Advanced lens analysis', 'UV measurement', 'High accuracy', 'Modern interface'],
    images: loadProductImages('fl-8600m'),
  },
  // Mocular Medical
  {
    id: 'ml-400',
    model: 'ML-400',
    brand: 'Mocular Medical',
    category: 'Vision Testing & Refraction Equipment',
    shortDescription: 'Elegant butterfly-shaped manual phoropter.',
    features: [
      'Butterfly‑shaped design',
      'Checks multiple visual functions',
      'Precise measurement',
      'Comfortable operation',
    ],
    images: loadProductImages('ml-400'),
  },
  {
    id: 'ml-500',
    model: 'ML-500',
    brand: 'Mocular Medical',
    category: 'Vision Testing & Refraction Equipment',
    shortDescription: 'Advanced phoropter with enhanced features.',
    features: [
      'Enhanced optics',
      'Smooth operation',
      'Multiple test options',
      'Durable construction',
    ],
    images: loadProductImages('ml-500'),
  },
  {
    id: 'ml-600',
    model: 'ML-600',
    brand: 'Mocular Medical',
    category: 'Vision Testing & Refraction Equipment',
    shortDescription: 'Premium phoropter for professional refraction.',
    features: [
      'Premium build quality',
      'Precise lens positioning',
      'Comprehensive test suite',
      'Ergonomic design',
    ],
    images: loadProductImages('ml-600'),
  },
  {
    id: 'ml-vft23',
    model: 'ML-VFT23',
    brand: 'Mocular Medical',
    category: 'Vision Testing & Refraction Equipment',
    shortDescription: 'LCD acuity chart for vision screening.',
    features: [
      'Quick test function',
      'Supports vision screening for low vision',
      'Multiple chart types (Common, V‑type, ETDRS)',
    ],
    images: loadProductImages('ml-vft23'),
  },

  // ================================
  // Clinic Fixtures & Practice Equipment - Farliao
  // ================================
  {
    id: 'fz-1l-1r',
    model: 'FZ-1L / FZ-1R',
    brand: 'Farliao',
    category: 'Clinic Fixtures & Practice Equipment',
    shortDescription: 'Electric combined table for ophthalmic practice.',
    features: [
      'Electric height adjustment',
      'Integrated instrument arm',
      'Left/Right configurations',
      'Compact footprint',
    ],
    images: loadProductImages('fz-1l'),
  },
  {
    id: 'fz-2',
    model: 'FZ-2',
    brand: 'Farliao',
    category: 'Clinic Fixtures & Practice Equipment',
    shortDescription: 'Electric combined table with advanced features.',
    features: [
      'Electric motorized controls',
      'Modern design',
      'Multiple instrument positions',
      'Ergonomic patient positioning',
    ],
    images: loadProductImages('fz-2'),
  },

  // ================================
  // Digital Imaging Accessories - Mocular Medical
  // ================================
  {
    id: 'digital-accessories',
    model: 'Digital Accessories',
    brand: 'Mocular Medical',
    category: 'Digital Imaging Accessories',
    shortDescription: 'Slit lamp & surgical microscope digital system.',
    features: [
      'Digital camera adapters',
      'Image capture software',
      'Video recording capability',
      'Compatible with multiple microscopes',
    ],
    images: loadProductImages('digital-accessories'),
  },
]
