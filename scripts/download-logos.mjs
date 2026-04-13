import { mkdir, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "logos");

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
  "Accept": "image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
  "Accept-Language": "en-GB,en;q=0.9",
};

const delay = (ms) => new Promise(r => setTimeout(r, ms));

// All URLs in priority order — carlogos.org first (fast), then Wikimedia (slower but reliable)
const LOGOS = [
  { key: "alfaromeo",  urls: [
    "https://www.carlogos.org/car-logos/alfa-romeo-logo.png",
  ]},
  { key: "audi",       urls: [
    "https://www.carlogos.org/car-logos/audi-logo-2016-download.png",
  ]},
  { key: "bmw",        urls: [
    "https://www.carlogos.org/car-logos/bmw-logo-2020-gray-download.png",
  ]},
  { key: "chevrolet",  urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Chevrolet_logo.svg/150px-Chevrolet_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/1/19/Chevrolet_logo.svg",
  ]},
  { key: "citroen",    urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Citroen_2022.svg/150px-Citroen_2022.svg.png",
  ]},
  { key: "dacia",      urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Dacia_2021_logo.svg/150px-Dacia_2021_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Dacia_logo.png/150px-Dacia_logo.png",
  ]},
  { key: "fiat",       urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fiat_Logo.svg/150px-Fiat_Logo.svg.png",
  ]},
  { key: "ford",       urls: [
    "https://www.carlogos.org/car-logos/ford-logo-2017-download.png",
  ]},
  { key: "honda",      urls: [
    "https://www.carlogos.org/car-logos/honda-logo-2000-full-download.png",
  ]},
  { key: "hyundai",    urls: [
    "https://www.carlogos.org/car-logos/hyundai-logo-2011-download.png",
  ]},
  { key: "jaguar",     urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Jaguar_logo.svg/150px-Jaguar_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Jaguar_Cars_logo.svg/150px-Jaguar_Cars_logo.svg.png",
  ]},
  { key: "jeep",       urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Jeep_Logo_svg.svg/150px-Jeep_Logo_svg.svg.png",
  ]},
  { key: "kia",        urls: [
    "https://www.carlogos.org/car-logos/kia-logo-2021-download.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Kia-logo.svg/150px-Kia-logo.svg.png",
  ]},
  { key: "landrover",  urls: [
    "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Land_Rover_logo_black.svg/150px-Land_Rover_logo_black.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Land-Rover_logo.svg/150px-Land-Rover_logo.svg.png",
  ]},
  { key: "lexus",      urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Lexus_division_emblem.svg/150px-Lexus_division_emblem.svg.png",
  ]},
  { key: "mazda",      urls: [
    "https://www.carlogos.org/car-logos/mazda-logo-1997-download.png",
  ]},
  { key: "mercedes",   urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/150px-Mercedes-Logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Mercedes-Benz_Logo_2010.svg/150px-Mercedes-Benz_Logo_2010.svg.png",
  ]},
  { key: "mini",       urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/MINI_logo.svg/150px-MINI_logo.svg.png",
    "https://www.carlogos.org/car-logos/mini-logo-2018-download.png",
  ]},
  { key: "mitsubishi", urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Mitsubishi_motors_new_logo.svg/150px-Mitsubishi_motors_new_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Mitsubishi_logo.svg/150px-Mitsubishi_logo.svg.png",
  ]},
  { key: "nissan",     urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Nissan_2020_logo.svg/150px-Nissan_2020_logo.svg.png",
    "https://www.carlogos.org/car-logos/nissan-logo-2020-download.png",
  ]},
  { key: "peugeot",    urls: [
    "https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Peugeot_2021_Logo.svg/150px-Peugeot_2021_Logo.svg.png",
    "https://www.carlogos.org/car-logos/peugeot-logo-2021-download.png",
  ]},
  { key: "porsche",    urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Porsche_wordmark.svg/150px-Porsche_wordmark.svg.png",
    "https://www.carlogos.org/car-logos/porsche-logo-download.png",
  ]},
  { key: "renault",    urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Renault_2021_Text_Logo.svg/150px-Renault_2021_Text_Logo.svg.png",
    "https://www.carlogos.org/car-logos/renault-logo-2021-download.png",
  ]},
  { key: "seat",       urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/SEAT_S.A._logo.svg/150px-SEAT_S.A._logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/SEAT_logo.svg/150px-SEAT_logo.svg.png",
  ]},
  { key: "skoda",      urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/%C5%A0koda_nieuw.png/150px-%C5%A0koda_nieuw.png",
    "https://www.carlogos.org/car-logos/skoda-logo-2016-download.png",
  ]},
  { key: "smart",      urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Smart_logo_2020.svg/150px-Smart_logo_2020.svg.png",
  ]},
  { key: "subaru",     urls: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Subaru_logo.svg/150px-Subaru_logo.svg.png",
  ]},
  { key: "suzuki",     urls: [
    "https://www.carlogos.org/car-logos/suzuki-logo-download.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/150px-Suzuki_logo_2.svg.png",
  ]},
  { key: "tesla",      urls: [
    "https://www.carlogos.org/car-logos/tesla-logo-download.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/150px-Tesla_Motors.svg.png",
  ]},
  { key: "toyota",     urls: [
    "https://www.carlogos.org/car-logos/toyota-logo-download.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/150px-Toyota_carlogo.svg.png",
  ]},
  { key: "vauxhall",   urls: [
    "https://www.carlogos.org/car-logos/vauxhall-logo-download.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Vauxhall-logo-and-wordmark.svg/150px-Vauxhall-logo-and-wordmark.svg.png",
  ]},
  { key: "volkswagen", urls: [
    "https://www.carlogos.org/car-logos/volkswagen-logo-2019-download.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/150px-Volkswagen_logo_2019.svg.png",
  ]},
  { key: "volvo",      urls: [
    "https://www.carlogos.org/car-logos/volvo-logo-2014-download.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Volvo_Cars_wordmark.svg/150px-Volvo_Cars_wordmark.svg.png",
  ]},
];

async function tryDownload(key, urls) {
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(12000) });
      if (!res.ok) {
        console.log(`   ⚠️  ${key}: HTTP ${res.status} → ${url.split("/").pop()}`);
        await delay(1500);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 300) {
        console.log(`   ⚠️  ${key}: too small (${buf.length}B) → ${url.split("/").pop()}`);
        continue;
      }
      await writeFile(join(OUT_DIR, `${key}.png`), buf);
      console.log(`✅  ${key.padEnd(12)} → ${(buf.length / 1024).toFixed(1)}KB`);
      return true;
    } catch (e) {
      console.log(`   ⚠️  ${key}: ${e.message.slice(0, 60)}`);
    }
    await delay(800);
  }
  console.log(`❌  ${key} — all sources failed`);
  return false;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Saving logos to: ${OUT_DIR}\n`);
  let ok = 0, fail = 0;
  for (const { key, urls } of LOGOS) {
    const success = await tryDownload(key, urls);
    success ? ok++ : fail++;
    await delay(600); // polite delay between brands
  }
  console.log(`\n✅ ${ok} succeeded  ❌ ${fail} failed`);
}

main();
