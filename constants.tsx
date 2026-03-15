import { Activity, PenTool, PhoneCall, Settings, Truck } from 'lucide-react'
import { Service, TeamMember } from './types'

// ── Company Info ──────────────────────────────────────────────────────────────
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

// ── Team ──────────────────────────────────────────────────────────────────────
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

// ── Services ──────────────────────────────────────────────────────────────────
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

// ── Products & Categories are now served from the Cloudflare Worker API.
// ── Use the useProducts() hook from hooks/useProducts.ts in your components.
