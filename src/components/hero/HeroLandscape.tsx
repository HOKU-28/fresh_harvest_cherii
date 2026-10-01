import React from 'react';
import { HeroGradients } from './HeroGradients';

export const HeroLandscape: React.FC = () => {
  return (
    <svg
      className="hero-svg-canvas"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <HeroGradients />

      {/* ========================================================
          LAYER 1: SKY BASE CANVAS (Fixed Rect, Gradient Animated)
          ======================================================== */}
      <rect id="sky-canvas" x="0" y="0" width="1440" height="900" fill="url(#skyGrad)" />

      {/* ========================================================
          LAYER 2: CELESTIAL SUN & RADIAL HALO (Hardware Translated)
          Cradled in the right-hand mountain saddle at (1040, 410)
          ======================================================== */}
      <g id="celestial-sun">
        {/* Outer Atmospheric Halo */}
        <circle
          id="sun-halo"
          cx="1040"
          cy="410"
          r="140"
          fill="url(#sunHaloGrad)"
        />
        {/* Radiant Solar Core */}
        <circle
          id="sun-disc"
          cx="1040"
          cy="410"
          r="68"
          fill="url(#sunCoreGrad)"
        />
      </g>

      {/* ========================================================
          LAYER 3: DISTANT MOUNTAIN SILHOUETTES
          High peaks receding into atmospheric aerial haze
          ======================================================== */}
      <g id="layer-distant-mountains">
        {/* Farthest Horizon Ridge */}
        <path
          id="mountains-far-back"
          d="M0 540 L0 440 Q160 410 320 450 T640 430 Q780 390 920 360 Q990 340 1040 420 Q1120 330 1260 300 Q1360 360 1440 390 L1440 680 L0 680 Z"
          fill="var(--mountain-far-fill)"
          opacity="0.85"
        />

        {/* Far-Mid Mountain Silhouette (Frames the Sun Saddle) */}
        <path
          id="mountains-far"
          d="M0 580 L0 480 Q140 460 280 490 T560 470 Q700 440 840 410 Q940 380 1040 435 Q1140 370 1280 340 Q1380 400 1440 430 L1440 720 L0 720 Z"
          fill="var(--mountain-far-fill)"
        />
      </g>

      {/* ========================================================
          LAYER 4: VALLEY ATMOSPHERIC MIST RIBBON
          Horizontal vapor blanket in the valley fold
          ======================================================== */}
      <g id="layer-valley-mist">
        <path
          id="mist-valley"
          d="M0 540 Q220 510 480 530 T960 510 Q1200 490 1440 520 L1440 640 Q1180 660 920 620 T380 640 Q180 620 0 630 Z"
          fill="url(#mistGrad)"
        />
      </g>

      {/* ========================================================
          LAYER 5: MIDGROUND MOUNTAIN RIDGE & SADDLE
          Sloping highland ridge descending from right to center-left
          ======================================================== */}
      <g id="layer-midground-mountains">
        <path
          id="mountains-mid"
          d="M0 640 L0 560 Q180 540 360 570 T720 540 Q900 490 1080 470 Q1260 440 1440 490 L1440 780 L0 780 Z"
          fill="var(--mountain-mid-fill)"
        />

        {/* Left-Mid Shoulder for Visual Balance */}
        <path
          id="mountain-left-shoulder"
          d="M0 660 L0 580 Q160 560 320 600 Q480 630 620 650 L620 780 L0 780 Z"
          fill="var(--mountain-saddle-fill)"
          opacity="0.9"
        />
      </g>

      {/* ========================================================
          LAYER 6: AGRICULTURAL COFFEE TERRACES
          Signature Fresh Harvest stepped contours with golden rim highlights
          ======================================================== */}
      <g id="coffee-terraces">
        {/* Terrace Step 1 (Highest Tier) */}
        <path
          id="terrace-slope-1"
          d="M780 570 Q940 530 1120 510 Q1280 490 1440 530 L1440 600 Q1260 560 1080 580 Q920 600 780 620 Z"
          fill="var(--terrace-slope-1)"
        />
        <path
          className="terrace-contour"
          d="M780 570 Q940 530 1120 510 Q1280 490 1440 530"
          stroke="var(--terrace-rim-stroke)"
          strokeWidth="2.5"
          strokeOpacity="var(--terrace-rim-opacity)"
          strokeLinecap="round"
          fill="none"
        />

        {/* Terrace Step 2 */}
        <path
          id="terrace-slope-2"
          d="M720 610 Q890 570 1080 550 Q1260 530 1440 570 L1440 650 Q1240 610 1040 630 Q860 650 720 670 Z"
          fill="var(--terrace-slope-2)"
        />
        <path
          className="terrace-contour"
          d="M720 610 Q890 570 1080 550 Q1260 530 1440 570"
          stroke="var(--terrace-rim-stroke)"
          strokeWidth="3"
          strokeOpacity="var(--terrace-rim-opacity)"
          strokeLinecap="round"
          fill="none"
        />

        {/* Terrace Step 3 */}
        <path
          id="terrace-slope-3"
          d="M660 655 Q840 610 1040 590 Q1240 570 1440 615 L1440 710 Q1220 670 1000 690 Q820 710 660 735 Z"
          fill="var(--terrace-slope-3)"
        />
        <path
          className="terrace-contour"
          d="M660 655 Q840 610 1040 590 Q1240 570 1440 615"
          stroke="var(--terrace-rim-stroke)"
          strokeWidth="3.5"
          strokeOpacity="var(--terrace-rim-opacity)"
          strokeLinecap="round"
          fill="none"
        />

        {/* Terrace Step 4 (Lower Farm Tier) */}
        <path
          id="terrace-slope-4"
          d="M600 705 Q790 660 1000 640 Q1210 620 1440 670 L1440 770 Q1190 730 960 755 Q760 775 600 805 Z"
          fill="var(--terrace-slope-2)"
        />
        <path
          className="terrace-contour"
          d="M600 705 Q790 660 1000 640 Q1210 620 1440 670"
          stroke="var(--terrace-rim-stroke)"
          strokeWidth="4"
          strokeOpacity="var(--terrace-rim-opacity)"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* ========================================================
          LAYER 7: VALLEY WATER BASIN (Meandering Highland River/Lake)
          Reflective calm waterway reflecting sky luminance
          ======================================================== */}
      <g id="layer-valley-water">
        <path
          id="valley-water"
          d="M340 650 Q460 630 580 645 T840 680 Q780 720 700 740 T480 730 Q390 700 340 650 Z"
          fill="url(#waterGrad)"
        />
        {/* Subtle Water Specular Glint Line */}
        <path
          d="M440 660 Q560 650 680 675"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* ========================================================
          LAYER 8: NEAR GROUNDING RIDGE & LOWER HILLS
          Encloses the valley and grounds the landscape
          ======================================================== */}
      <g id="layer-near-ridge">
        {/* Left-Center Rolling Slope */}
        <path
          id="ridge-near"
          d="M0 720 Q240 690 480 740 T960 760 Q1200 740 1440 790 L1440 900 L0 900 Z"
          fill="var(--ridge-near-fill)"
        />
        {/* Deep Ground Silhouette Base */}
        <path
          id="ground-shadow"
          d="M0 810 Q320 780 640 825 T1280 820 L1440 850 L1440 900 L0 900 Z"
          fill="var(--ground-shadow-fill)"
        />
      </g>

      {/* ========================================================
          LAYER 9: FOREGROUND COFFEE BOTANICAL BRANCH & CHERRIES
          Restrained, clean framing in lower-left (Variation 1 DNA)
          ======================================================== */}
      <g id="botanical-foreground">
        {/* Main Woody Coffee Stem */}
        <path
          id="coffee-stem"
          d="M-20 890 Q30 830 70 760 T130 650 Q160 590 190 530"
          stroke="var(--foliage-shadow-fill)"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <path
          id="coffee-stem-branch-1"
          d="M70 760 Q120 740 170 730"
          stroke="var(--foliage-shadow-fill)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          id="coffee-stem-branch-2"
          d="M130 650 Q180 620 230 600"
          stroke="var(--foliage-shadow-fill)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Coffee Leaves (Paired, Ovate, Clean Vector Edges) */}
        {/* Leaf 1 (Top Left) */}
        <path
          className="coffee-leaf"
          d="M190 530 Q220 480 270 470 Q240 520 190 530 Z"
          fill="url(#leafGrad)"
        />
        <path d="M190 530 Q225 500 270 470" stroke="var(--foliage-shadow-fill)" strokeWidth="1.2" fill="none" opacity="0.6" />

        {/* Leaf 2 (Top Right) */}
        <path
          className="coffee-leaf"
          d="M190 530 Q170 470 130 450 Q150 500 190 530 Z"
          fill="url(#leafGrad)"
        />

        {/* Leaf 3 (Mid-Upper Branch) */}
        <path
          className="coffee-leaf"
          d="M230 600 Q280 580 320 600 Q270 630 230 600 Z"
          fill="url(#leafGrad)"
        />
        <path d="M230 600 Q275 600 320 600" stroke="var(--foliage-shadow-fill)" strokeWidth="1.2" fill="none" opacity="0.6" />

        {/* Leaf 4 (Mid Branch Droop) */}
        <path
          className="coffee-leaf"
          d="M130 650 Q150 690 190 710 Q160 670 130 650 Z"
          fill="url(#leafGrad)"
        />

        {/* Leaf 5 (Lower Branch Large Leaf) */}
        <path
          className="coffee-leaf"
          d="M170 730 Q230 720 270 760 Q210 770 170 730 Z"
          fill="url(#leafGrad)"
        />
        <path d="M170 730 Q220 740 270 760" stroke="var(--foliage-shadow-fill)" strokeWidth="1.5" fill="none" opacity="0.6" />

        {/* Leaf 6 (Bottom Anchor Leaf) */}
        <path
          className="coffee-leaf"
          d="M70 760 Q50 820 90 860 Q100 800 70 760 Z"
          fill="url(#leafGrad)"
        />

        {/* Selective Coffee Cherries (Exactly 5 Ripe Crimson Jewels) */}
        <g id="coffee-cherries">
          {/* Cherry 1 (Node A) */}
          <circle cx="132" cy="646" r="11" fill="url(#cherryGrad)" />
          {/* Cherry 2 (Cluster at Node A) */}
          <circle cx="146" cy="656" r="10.5" fill="url(#cherryGrad)" />
          {/* Cherry 3 (Node B) */}
          <circle cx="74" cy="754" r="12" fill="url(#cherryGrad)" />
          {/* Cherry 4 (Cluster at Node B) */}
          <circle cx="88" cy="766" r="11" fill="url(#cherryGrad)" />
          {/* Cherry 5 (Single Ripe Pearl) */}
          <circle cx="188" cy="535" r="9.5" fill="url(#cherryGrad)" />
        </g>

        {/* Right Corner Subtle Silhouette Framing */}
        <path
          id="framing-shrub-right"
          d="M1200 900 Q1260 840 1320 830 Q1380 810 1440 820 L1440 900 Z"
          fill="var(--foliage-shadow-fill)"
        />
        <path
          d="M1320 830 Q1350 780 1400 770 Q1380 820 1320 830 Z"
          fill="url(#leafGrad)"
        />
        <path
          d="M1380 810 Q1420 760 1440 750 Q1440 800 1380 810 Z"
          fill="url(#leafGrad)"
        />
      </g>

      {/* ========================================================
          LAYER 10: DYNAMIC SHADOW & ATMOSPHERIC VIGNETTE OVERLAY
          Deepens valley creases as twilight advances
          ======================================================== */}
      <rect
        id="shadow-overlay"
        x="0"
        y="0"
        width="1440"
        height="900"
        fill="#14171A"
        opacity="var(--shadow-overlay-opacity)"
        style={{ mixBlendMode: 'multiply', pointerEvents: 'none' }}
      />
    </svg>
  );
};
