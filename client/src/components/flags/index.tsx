import React from 'react';

export const TurkishFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" className="w-full h-full">
    <rect width="1200" height="800" fill="#E30A17"/>
    <circle cx="425" cy="400" r="200" fill="#ffffff"/>
    <circle cx="475" cy="400" r="160" fill="#E30A17"/>
    <polygon fill="#ffffff" points="583.334,400 764.235,458.779 738.386,304.894 872.72,200.666 712.812,185.553 583.334,50.0 453.856,185.553 293.948,200.666 428.283,304.894 402.433,458.779"/>
  </svg>
);

export const BritishFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-full h-full">
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
    </clipPath>
    <path d="M0,0 v30 h60 v-30 z" fill="#00247d"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
    <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#cf142b" strokeWidth="4"/>
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
    <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6"/>
  </svg>
);

export const RussianFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" className="w-full h-full">
    <rect width="9" height="6" fill="#fff"/>
    <rect width="9" height="4" y="2" fill="#0039A6"/>
    <rect width="9" height="2" y="4" fill="#D52B1E"/>
  </svg>
);

export const GeorgianFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-full h-full">
    <rect width="900" height="600" fill="#fff"/>
    <path fill="#f00" d="M 0,0 H 900 V 600 H 0 z M 0,240 H 360 V 0 H 540 V 240 H 900 V 360 H 540 V 600 H 360 V 360 H 0 z"/>
    <path fill="#f00" d="M 376,146 A 14,14 0 0 1 390,160 14,14 0 0 1 376,174 14,14 0 0 0 362,188 14,14 0 0 0 376,202 14,14 0 0 1 390,216 14,14 0 0 1 376,230 L 376,279 A 49,49 0 0 1 425,230 49,49 0 0 1 474,279 L 523,279 A 14,14 0 0 1 509,265 14,14 0 0 1 523,251 14,14 0 0 0 537,237 14,14 0 0 0 523,223 14,14 0 0 1 509,209 14,14 0 0 1 523,195 L 523,146 A 49,49 0 0 1 474,195 49,49 0 0 1 425,146 L 376,146 z M 376,384 L 376,433 A 14,14 0 0 1 390,447 14,14 0 0 1 376,461 14,14 0 0 0 362,475 14,14 0 0 0 376,489 14,14 0 0 1 390,503 14,14 0 0 1 376,517 L 425,517 A 49,49 0 0 1 474,468 49,49 0 0 1 523,517 L 523,468 A 14,14 0 0 1 509,454 14,14 0 0 1 523,440 14,14 0 0 0 537,426 14,14 0 0 0 523,412 14,14 0 0 1 509,398 14,14 0 0 1 523,384 L 474,384 A 49,49 0 0 1 425,433 49,49 0 0 1 376,384 z"/>
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