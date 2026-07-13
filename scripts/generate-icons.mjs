import sharp from "sharp";
import { readFileSync } from "fs";
import { join } from "path";

const publicDir = join(import.meta.dirname, "..", "public");
const svgPath = join(publicDir, "icon.svg");
const svgRaw = readFileSync(svgPath, "utf-8");

function makeVariant(svgRaw, bgColor, fgColor) {
  return svgRaw
    .replace(
      /\.background\s*\{[^}]*\}/g,
      `.background { fill: ${bgColor}; }`
    )
    .replace(
      /\.foreground\s*\{[^}]*\}/g,
      `.foreground { fill: ${fgColor}; }`
    );
}

const lightSvg = makeVariant(svgRaw, "#ffffff", "#000000");
const darkSvg = makeVariant(svgRaw, "#000000", "#ffffff");

async function generate() {
  // icon-light-32x32.png (light mode: white bg, black icon)
  await sharp(Buffer.from(lightSvg)).resize(32, 32).png().toFile(join(publicDir, "icon-light-32x32.png"));
  console.log("Created icon-light-32x32.png");

  // icon-dark-32x32.png (dark mode: dark bg, white icon)
  await sharp(Buffer.from(darkSvg)).resize(32, 32).png().toFile(join(publicDir, "icon-dark-32x32.png"));
  console.log("Created icon-dark-32x32.png");

  // apple-icon.png (180x180, light version)
  await sharp(Buffer.from(lightSvg)).resize(180, 180).png().toFile(join(publicDir, "apple-icon.png"));
  console.log("Created apple-icon.png");

  // og-image (1200x630) - optional social card
  const ogSvg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#2563eb"/>
      <foreignObject x="0" y="0" width="1200" height="630">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:center;justify-content:center;height:100%;font-family:sans-serif;color:white;">
          <div style="text-align:center;">
            <div style="font-size:48px;font-weight:bold;">手取り計算くん</div>
            <div style="font-size:24px;margin-top:16px;opacity:0.9;">バイト代・給与の手取りを一発シミュレート</div>
          </div>
        </div>
      </foreignObject>
    </svg>
  `;
  await sharp(Buffer.from(ogSvg)).resize(1200, 630).png().toFile(join(publicDir, "og-image.png"));
  console.log("Created og-image.png");
}

generate().catch((e) => {
  console.error(e);
  process.exit(1);
});
