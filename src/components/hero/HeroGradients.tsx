import React from 'react';

/**
 * Master SVG Gradient Definitions.
 * Stop colors and opacities are dynamically bound to CSS Custom Properties
 * or manipulated directly via GSAP during the scroll scrub.
 */
export const HeroGradients: React.FC = () => {
  return (
    <defs>
      {/* Sky Canvas Gradient */}
      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="var(--sky-zenith, #F8F8F5)" />
        <stop offset="65%" stopColor="var(--sky-horizon, #EEF1EA)" />
        <stop offset="100%" stopColor="var(--sky-horizon, #EEF1EA)" />
      </linearGradient>

      {/* Celestial Sun Core */}
      <radialGradient id="sunCoreGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--sun-core-color, #FFFFFF)" stopOpacity="1" />
        <stop offset="85%" stopColor="var(--sun-core-color, #FFFFFF)" stopOpacity="0.95" />
        <stop offset="100%" stopColor="var(--sun-core-color, #FFFFFF)" stopOpacity="0" />
      </radialGradient>

      {/* Celestial Sun Atmospheric Halo */}
      <radialGradient id="sunHaloGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--sun-halo-color, #FFFDF5)" stopOpacity="var(--sun-halo-opacity, 0.45)" />
        <stop offset="50%" stopColor="var(--sun-halo-color, #FFFDF5)" stopOpacity="calc(var(--sun-halo-opacity, 0.45) * 0.4)" />
        <stop offset="100%" stopColor="var(--sun-halo-color, #FFFDF5)" stopOpacity="0" />
      </radialGradient>

      {/* Far Mountains Atmospheric Gradient */}
      <linearGradient id="mountainFarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="var(--mountain-far-fill, #C5D2BE)" />
        <stop offset="100%" stopColor="var(--sky-horizon, #EEF1EA)" stopOpacity="0.85" />
      </linearGradient>

      {/* Midground Ridge Gradient */}
      <linearGradient id="mountainMidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="var(--mountain-mid-fill, #A7B89F)" />
        <stop offset="100%" stopColor="var(--mountain-saddle-fill, #8EA187)" />
      </linearGradient>

      {/* Valley Water Surface Gradient */}
      <linearGradient id="waterGrad" x1="30%" y1="0%" x2="70%" y2="100%">
        <stop offset="0%" stopColor="var(--valley-water-surface, #DDE6DA)" />
        <stop offset="100%" stopColor="var(--valley-water-deep, #B8C7B5)" />
      </linearGradient>

      {/* Valley Mist Soft Ribbon Gradient */}
      <linearGradient id="mistGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="var(--mist-color, #EEF1EA)" stopOpacity="0" />
        <stop offset="25%" stopColor="var(--mist-color, #EEF1EA)" stopOpacity="var(--mist-opacity, 0.65)" />
        <stop offset="75%" stopColor="var(--mist-color, #EEF1EA)" stopOpacity="var(--mist-opacity, 0.65)" />
        <stop offset="100%" stopColor="var(--mist-color, #EEF1EA)" stopOpacity="0" />
      </linearGradient>

      {/* Foliage Leaf Gradient for natural organic volume */}
      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--foliage-leaves-fill, #2E5D32)" />
        <stop offset="100%" stopColor="var(--foliage-shadow-fill, #1A281E)" />
      </linearGradient>

      {/* Coffee Cherry Radial Gloss */}
      <radialGradient id="cherryGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="var(--cherry-highlight, #C83E3E)" />
        <stop offset="60%" stopColor="var(--cherry-fill, #A32B2B)" />
        <stop offset="100%" stopColor="#4A1012" />
      </radialGradient>
    </defs>
  );
};
