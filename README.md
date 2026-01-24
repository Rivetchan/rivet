🌐 Rivet — Website Modern dengan TailwindCSS

Rivet adalah website modern yang dibangun dengan HTML, CSS, JavaScript, dan menggunakan TailwindCSS sebagai framework desain utama. Website ini responsif, interaktif, dan siap digunakan sebagai landing page, portofolio, atau halaman profil online.

Demo Online: rivetchan.enno-nurwansyah-rasyidi.workers.dev

✨ Fitur Utama

🎨 Desain Modern: Menggunakan TailwindCSS untuk UI yang bersih dan responsif

⚡ Frontend Interaktif: JavaScript digunakan untuk efek dan interaktivitas

📱 Responsive: Optimal di desktop maupun perangkat mobile

🛠 Mudah Dikustomisasi: Tailwind.config.js memungkinkan kustomisasi desain

☁️ Siap Deployment: Dapat langsung di-deploy ke Cloudflare Workers, Vercel, atau Netlify

🛠 Teknologi yang Digunakan
Komponen	Teknologi
Frontend	HTML, CSS, JavaScript
Styling	TailwindCSS
Build Tool	Node.js, NPM
Deployment	Cloudflare Workers / Static Hosting
📁 Struktur Project
rivet/
├── .github/             # Workflow GitHub Actions
├── .vscode/             # Konfigurasi VS Code
├── assets/              # File pendukung (gambar, font, dll)
├── css/                 # File CSS
├── data/                # Data tambahan (JSON, dsb)
├── js/                  # File JavaScript
├── node_modules/        # Dependencies Node.js
├── src/                 # Source code utama
├── index.html           # Halaman utama
├── package.json         # Dependencies & scripts
├── package-lock.json
├── postcss.config.js    # Konfigurasi PostCSS
├── script.js            # Script utama
├── tailwind.config.js   # Konfigurasi TailwindCSS
└── wrangler.toml        # Konfigurasi Cloudflare Workers

🚀 Cara Menjalankan Project (Local)

Clone repository

git clone https://github.com/Rivetchan/rivet.git
cd rivet


Install dependencies

npm install


Jalankan development server

npm run dev


Buka browser

http://localhost:3000

🌐 Deployment

Website ini dapat di-deploy ke berbagai layanan hosting statis, seperti:

Cloudflare Workers

Vercel

Netlify

GitHub Pages

🛠 Kontribusi

Kontribusi sangat diterima!
Langkah sederhana:

Fork repository ini

Buat branch baru (git checkout -b feature/nama-fitur)

Tambahkan fitur atau perbaikan

Commit dan push ke branch

Buat Pull Request

👨‍💻 Pengembang

RivetChan
Web Developer | Fokus pada desain modern, interaktif, dan responsif
