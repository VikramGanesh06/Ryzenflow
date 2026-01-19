
import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  // Added React import to resolve "Cannot find namespace 'React'" error for ReactNode
  icon: React.ReactNode;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}
