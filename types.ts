import React from 'react';

export interface Product {
  id: string;
  model: string;
  brand: string;
  category: string;
  shortDescription: string; // For card view
  fullDescription?: string; // For detail view (optional, falls back to short)
  features: string[];
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface NavigationItem {
  label: string;
  path: string;
}