
import React from 'react';
import { Bus, ShieldCheck, Zap, Wifi, BatteryCharging, Coffee } from 'lucide-react';

export const ADMIN_PHONE = "94701362527";

// The official Google Apps Script endpoint for real-time cloud database sync
export const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzQExDkV7FJGlc9N8Y1lRnhf6KMvKMsHhCN7obc4L7fpGXyGRDHsbNmGLvSRDzGqsLZJw/exec"; 

export const BUS_PRICES: Record<string, number> = {
  "Sakeer Express": 2700,
  "RS Express": 2900,
  "Myown Express": 2700,
  "Al Ahla": 2800,
  "Al Rashith": 2700,
  "Star Travels": 1600,
  "Lloyds Travels": 2700,
  "Super Line": 2700
};

export const CITIES = [
  "Nintavur", "Addalaichenai", "Akkaraipattu", "Pottuvil", "Panama", 
  "Lahugala", "Monaragala", "Bibile", "Medagama", "Wellawaya", 
  "Badulla", "Bandarawela", "Hali-Ela", "Passara", "Mahiyanganaya", 
  "Kandy", "Peradeniya", "Gampola", "Nawalapitiya", "Hatton", 
  "Nanu Oya", "Nuwara Eliya", "Kalmunai", "Sainthamaruthu"
];

export const FEATURES = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Premium Safety",
    description: "GPS tracked buses with professional drivers and comprehensive insurance for your peace of mind."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Instant Booking",
    description: "Book your seat in seconds with instant confirmation and real-time updates on your booking status."
  },
  {
    icon: <Bus className="w-8 h-8" />,
    title: "Luxury Comfort",
    description: "Air-conditioned coaches with reclining seats, WiFi, and entertainment systems."
  }
];

export const FLEET = [
  {
    type: "Executive Class",
    description: "Luxury coaches with extra legroom and premium seating.",
    amenities: [<Wifi key="w" className="w-4 h-4" />, <BatteryCharging key="b" className="w-4 h-4" />, <Coffee key="c" className="w-4 h-4" />],
    tags: ["WiFi", "USB", "Refreshments"]
  },
  {
    type: "Express Service",
    description: "Direct routes with minimal stops for faster travel.",
    amenities: [<Zap key="z" className="w-4 h-4" />],
    tags: ["Direct", "Priority", "AC"]
  }
];

export const BANK_DETAILS = {
  bank: "HNB Bank",
  accountName: "LAGAN BUS SERVICES",
  accountNo: "123456789012",
  branch: "Nintavur",
  reference: "Name + Phone"
};
