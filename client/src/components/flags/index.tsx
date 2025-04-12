import React from 'react';

// Türk bayrağı, resmi ölçüler G/2, G/3 uygun olarak
export const TurkishFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1000" className="w-full h-full">
    <rect width="1500" height="1000" fill="#E30A17"/>
    <circle cx="750" cy="500" r="250" fill="#ffffff"/>
    <circle cx="810" cy="500" r="200" fill="#E30A17"/>
    <polygon fill="#ffffff" 
      points="750,375 822,591 650,458 850,458 678,591"
      transform="translate(0, 0) scale(1.02)"
    />
  </svg>
);

// İngiliz bayrağı, standart ölçülere uygun olarak
export const BritishFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" className="w-full h-full">
    <rect width="1200" height="600" fill="#012169"/>
    <path d="M0,0 L1200,600 M1200,0 L0,600" stroke="#ffffff" strokeWidth="120"/>
    <path d="M600,0 V600 M0,300 H1200" stroke="#ffffff" strokeWidth="200"/>
    <path d="M600,0 V600 M0,300 H1200" stroke="#C8102E" strokeWidth="120"/>
    <path d="M0,0 L1200,600 M1200,0 L0,600" stroke="#C8102E" strokeWidth="80"/>
  </svg>
);

// Rus bayrağı, resmi ölçülere uygun olarak
export const RussianFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1000" className="w-full h-full">
    <rect width="1500" height="333" fill="#FFFFFF"/>
    <rect width="1500" height="334" y="333" fill="#0039A6"/>
    <rect width="1500" height="333" y="667" fill="#D52B1E"/>
  </svg>
);

// Gürcistan bayrağı, resmi ölçülere uygun olarak
export const GeorgianFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" className="w-full h-full">
    <rect width="300" height="200" fill="#fff"/>
    <rect width="300" height="200" fill="white"/>
    <path stroke="none" fill="#f00" d="M 130,0 L 170,0 L 170,80 L 300,80 L 300,120 L 170,120 L 170,200 L 130,200 L 130,120 L 0,120 L 0,80 L 130,80 Z"/>
    <path stroke="none" fill="#f00" d="M 0,0 L 50,0 L 50,40 L 0,40 Z"/>
    <path stroke="none" fill="#f00" d="M 250,0 L 300,0 L 300,40 L 250,40 Z"/>
    <path stroke="none" fill="#f00" d="M 250,160 L 300,160 L 300,200 L 250,200 Z"/>
    <path stroke="none" fill="#f00" d="M 0,160 L 50,160 L 50,200 L 0,200 Z"/>
  </svg>
);

export const FlagIcon: React.FC<{ code: string }> = ({ code }) => {
  switch (code) {
    case 'tr':
      return <TurkishFlag />;
    case 'en':
      return <BritishFlag />;
    case 'ru':
      return <RussianFlag />;
    case 'ka':
      return <GeorgianFlag />;
    default:
      return <TurkishFlag />;
  }
};