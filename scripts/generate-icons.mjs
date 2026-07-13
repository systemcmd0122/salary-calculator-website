import sharp from "sharp";
import { readFileSync } from "fs";
import { join } from "path";

const publicDir = join(import.meta.dirname, "..", "public");

function createIconSvg(bgColor, displayBg, displayFg, btnColor, accentColor) {
  return `<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" rx="40" fill="${bgColor}" />
  <rect x="50" y="35" width="80" height="110" rx="10" fill="${displayBg}" />
  <rect x="58" y="43" width="64" height="28" rx="4" fill="${displayFg}" />
  <text x="90" y="64" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="${bgColor}">¥</text>
  <rect x="58" y="80" width="14" height="14" rx="3" fill="${btnColor}" />
  <rect x="76" y="80" width="14" height="14" rx="3" fill="${btnColor}" />
  <rect x="94" y="80" width="14" height="14" rx="3" fill="${btnColor}" />
  <rect x="112" y="80" width="14" height="14" rx="3" fill="${btnColor}" />
  <rect x="58" y="98" width="14" height="14" rx="3" fill="${btnColor}" />
  <rect x="76" y="98" width="14" height="14" rx="3" fill="${btnColor}" />
  <rect x="94" y="98" width="14" height="14" rx="3" fill="${btnColor}" />
  <rect x="112" y="98" width="14" height="14" rx="3" fill="${btnColor}" fill-opacity="0.7" />
  <rect x="58" y="116" width="14" height="14" rx="3" fill="${btnColor}" />
  <rect x="76" y="116" width="14" height="14" rx="3" fill="${btnColor}" />
  <rect x="94" y="116" width="14" height="14" rx="3" fill="${btnColor}" />
  <rect x="112" y="116" width="14" height="14" rx="3" fill="${btnColor}" />
  <rect x="58" y="134" width="32" height="10" rx="3" fill="${btnColor}" />
  <rect x="112" y="134" width="14" height="10" rx="3" fill="${accentColor}" />
</svg>`;
}

async function generate() {
  // Light mode: blue bg, white elements
  const lightSvg = createIconSvg("#2563eb", "rgba(255,255,255,0.15)", "#ffffff", "rgba(255,255,255,0.9)", "#bfdbfe");

  // Dark mode: darker blue bg
  const darkSvg = createIconSvg("#1e40af", "rgba(255,255,255,0.15)", "#ffffff", "rgba(255,255,255,0.9)", "#93c5fd");

  await sharp(Buffer.from(lightSvg)).resize(32, 32).png().toFile(join(publicDir, "icon-light-32x32.png"));
  console.log("Created icon-light-32x32.png (" + (await sharp(Buffer.from(lightSvg)).resize(32, 32).png().toBuffer()).length + " bytes)");

  await sharp(Buffer.from(darkSvg)).resize(32, 32).png().toFile(join(publicDir, "icon-dark-32x32.png"));
  console.log("Created icon-dark-32x32.png");

  await sharp(Buffer.from(lightSvg)).resize(180, 180).png().toFile(join(publicDir, "apple-icon.png"));
  console.log("Created apple-icon.png");

  const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#grad)"/>
    <text x="600" y="280" font-family="sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">手取り計算くん</text>
    <text x="600" y="360" font-family="sans-serif" font-size="32" fill="white" fill-opacity="0.9" text-anchor="middle">バイト代・給与の手取りを一発シミュレート</text>
  </svg>`;
  await sharp(Buffer.from(ogSvg)).resize(1200, 630).png().toFile(join(publicDir, "og-image.png"));
  console.log("Created og-image.png");
}

generate().catch((e) => {
  console.error(e);
  process.exit(1);
});
