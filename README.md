# Teknologi Informasi · Politeknik Negeri Padang

Redesign kontribusi untuk [faxhym/web-tekinfo1b](https://github.com/faxhym/web-tekinfo1b). Proyek komunitas/mahasiswa, **bukan situs resmi institusi**.

## Jalankan

Tanpa instalasi dependency frontend:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Buka http://127.0.0.1:4173. File `index.html` juga dapat dibuka langsung. Tidak ada build step, CDN, tracking, atau backend.

## Fitur

- Program explorer dengan filter D3/D4 dan native disclosure; seluruh program tetap tersedia tanpa JavaScript.
- Navigasi mobile, keyboard/Escape, skip link, focus ring, reduced motion.
- Layout mobile–desktop, tabel dengan caption dan row headers.
- Font lokal, grafis WebP, video opsional `preload="none"`, tanpa autoplay.
- Status akreditasi sumber awal dipertahankan dengan peringatan belum diverifikasi ulang.

## Pengujian

Node.js dan Python 3 dibutuhkan untuk tooling, bukan untuk website.

```sh
npm ci
npx playwright install chromium firefox webkit
npm test
# Subset bila engine tertentu tidak tersedia:
TEST_BROWSERS=chromium,firefox npm test
# Browser sistem opsional (tidak lagi hard-coded):
TEST_BROWSERS=chromium CHROMIUM_PATH=/usr/bin/chromium npm test
```

Default memakai browser terkelola Playwright, ketiga engine. Jalankan dengan port 4173 kosong. Lokal tahap kedua: 38/38 tes Chromium/Firefox lulus; WebKit terhalang library OS. CI Ubuntu memasang dependency ketiga engine, tetapi belum dijalankan di GitHub. Scan otomatis bukan sertifikasi aksesibilitas dan WebKit bukan pengujian Safari pada perangkat Apple.

### Screenshot regression dan performa

```sh
TEST_BROWSERS=chromium VISUAL_REGRESSION=1 npx playwright test tests/visual.spec.js
# Hanya setelah perubahan visual direview:
TEST_BROWSERS=chromium VISUAL_REGRESSION=1 npx playwright test tests/visual.spec.js --update-snapshots
CHROMIUM_PATH=/usr/bin/chromium node scripts/performance.mjs after
```

Baseline screenshot yang disertakan direkam pada Linux lokal; platform lain perlu baseline sendiri yang direview, bukan otomatis dianggap lulus. Screenshot selalu dilampirkan pada hasil tes. Laporan mobile Lighthouse HTML/JSON ada di `docs/reports/`; itu hasil lab lokal, bukan data Core Web Vitals pengguna nyata. CI tidak deploy dan hanya memiliki izin `contents: read`.

## Struktur

- `index.html`: konten semantik dan tautan resmi.
- `webtekinfostyle.css`: token, komponen, responsive dan print.
- `script.js`: peningkatan menu dan filter, tanpa framework.
- `assets/`: turunan gambar, poster, font dan atribusi.
- `tests/`: regression browser.
- `docs/`: rencana, bukti verifikasi dan draft PR.

## Batas kebenaran dan lisensi

Data akreditasi adalah data proyek awal, bukan verifikasi kondisi terkini. Pemilik perlu memeriksa sumber resmi dan hak aset sebelum publikasi. Repo asal tidak mencantumkan lisensi saat diperiksa; redesign ini tidak menambahkan lisensi atas kode/aset upstream. Font Manrope memiliki lisensi OFL tersendiri, disertakan dalam `assets/Manrope-OFL.txt`. Lihat `assets/SOURCES.md`.
