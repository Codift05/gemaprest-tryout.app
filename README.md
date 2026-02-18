<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Inertia.js-1.2-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status">
</p>

---

# Gemaprest Tryout UTBK

Platform tryout online untuk persiapan UTBK SNBT. Dibangun dengan arsitektur modern menggunakan Laravel sebagai backend dan React sebagai frontend, terintegrasi melalui Inertia.js untuk pengalaman Single Page Application tanpa kompleksitas API terpisah.

---

## Fitur Utama

### Untuk Siswa
| Fitur | Deskripsi |
|-------|-----------|
| Dashboard Personal | Statistik belajar, tryout tersedia, dan riwayat ujian |
| Exam Engine | Interface ujian dengan timer server-side yang akurat |
| Anti-Cheating System | Deteksi pelanggaran (tab switch, copy-paste, dll) |
| Auto-Save | Jawaban tersimpan otomatis setiap kali menjawab |
| Review Pembahasan | Lihat jawaban dan penjelasan setelah ujian |
| Realtime Leaderboard | Peringkat live menggunakan WebSocket saat ujian berlangsung |
| Dynamic Landing Page | Leaderboard publik yang terupdate otomatis berdasarkan hasil tryout terbaru |
| History Sync | Sinkronisasi data riwayat ujian dengan dashboard untuk akurasi skor |

### Untuk Admin
| Fitur | Deskripsi |
|-------|-----------|
| Manajemen Tryout | CRUD tryout dengan pengaturan lengkap |
| Bank Soal | Pengelolaan soal dengan kategori dan tingkat kesulitan |
| Kategori dan Subkategori | Organisasi materi dengan sistem warna |
| Manajemen User | Kelola siswa dan admin |
| Dashboard Analytics | Statistik platform dan aktivitas |

---

## Tech Stack

### Backend

| Technology | Version | Description |
|------------|---------|-------------|
| **Laravel** | 11.x | PHP framework dengan fitur routing, ORM, queue, dan broadcasting |
| **PHP** | 8.2+ | Server-side scripting language |
| **Laravel Reverb** | 1.0 | First-party WebSocket server untuk realtime broadcasting |
| **Laravel Sanctum** | 4.0 | Lightweight authentication system untuk SPA |
| **Ziggy** | 2.0 | Laravel routes di JavaScript |

### Frontend

| Technology | Version | Description |
|------------|---------|-------------|
| **React** | 18.3 | JavaScript library untuk building user interfaces |
| **Inertia.js** | 1.2 | Modern monolith tanpa API, server-side routing dengan client-side rendering |
| **Tailwind CSS** | 3.4 | Utility-first CSS framework |
| **Headless UI** | 2.1 | Unstyled, accessible UI components untuk React |
| **Heroicons** | 2.1 | Hand-crafted SVG icons dari Tailwind CSS team |

### State Management dan Utilities

| Technology | Version | Description |
|------------|---------|-------------|
| **Zustand** | 4.5 | Lightweight state management, alternatif Redux yang lebih simpel |
| **Axios** | 1.7 | Promise-based HTTP client |
| **date-fns** | 3.6 | Modern JavaScript date utility library |
| **clsx** | 2.1 | Utility untuk constructing className strings |
| **react-hot-toast** | 2.4 | Notifikasi toast yang ringan |

### Development Tools

| Technology | Version | Description |
|------------|---------|-------------|
| **Vite** | 5.0 | Next generation frontend build tool |
| **Laravel Pint** | 1.13 | PHP code style fixer |
| **PHPUnit** | 11.0 | PHP testing framework |
| **Laravel Breeze** | 2.0 | Authentication scaffolding |

### Database

| Technology | Version | Description |
|------------|---------|-------------|
| **MySQL** | 8.0+ | Primary database |
| **MariaDB** | 10.5+ | Alternative database (compatible) |

---

## Arsitektur

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                          │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │    React    │  │  Zustand    │  │     Laravel Echo        │ │
│  │  Components │  │   Stores    │  │  (WebSocket Client)     │ │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘ │
└─────────┼────────────────┼─────────────────────┼───────────────┘
          │                │                     │
          │  Inertia.js    │                     │ WebSocket
          │                │                     │
┌─────────┼────────────────┼─────────────────────┼───────────────┐
│         ▼                ▼                     ▼               │
│  ┌─────────────────────────────┐  ┌─────────────────────────┐ │
│  │      Laravel Router         │  │    Laravel Reverb       │ │
│  │      + Controllers          │  │   (WebSocket Server)    │ │
│  └──────────────┬──────────────┘  └───────────┬─────────────┘ │
│                 │                             │               │
│  ┌──────────────┼─────────────────────────────┼─────────────┐ │
│  │              ▼                             ▼             │ │
│  │  ┌─────────────────┐  ┌─────────────────────────────┐   │ │
│  │  │  Eloquent ORM   │  │    Broadcasting Events      │   │ │
│  │  │    + Models     │  │  (Leaderboard, Exam, etc)   │   │ │
│  │  └────────┬────────┘  └─────────────────────────────┘   │ │
│  │           │                                              │ │
│  │           ▼                     LARAVEL                  │ │
│  │  ┌─────────────────┐                                     │ │
│  │  │  MySQL/MariaDB  │                                     │ │
│  │  └─────────────────┘                                     │ │
│  └──────────────────────────────────────────────────────────┘ │
│                          SERVER                               │
└───────────────────────────────────────────────────────────────┘
```

---

## Persyaratan Sistem

### Server Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| PHP | 8.2 | 8.3 |
| Composer | 2.x | Latest |
| Node.js | 18.x | 20.x |
| MySQL | 8.0 | 8.0+ |
| MariaDB | 10.5 | 10.11+ |

### PHP Extensions

```
BCMath, Ctype, JSON, Mbstring, OpenSSL, PDO, PDO_MySQL, Tokenizer, XML, cURL, Fileinfo
```

---

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/Codift05/gemaprest-tryout.app.git
cd gemaprest-tryout.app
```

### 2. Install Dependencies

```bash
composer install
npm install
```

### 3. Setup Environment

```bash
cp .env.example .env
php artisan key:generate
```

Edit file `.env` dan sesuaikan:

```env
DB_DATABASE=tryout_utbk
DB_USERNAME=root
DB_PASSWORD=

REVERB_APP_ID=tryout-app
REVERB_APP_KEY=tryout-key
REVERB_APP_SECRET=tryout-secret
REVERB_HOST=localhost
REVERB_PORT=8080
REVERB_SCHEME=http
```

### 4. Setup Database

```bash
php artisan migrate
php artisan db:seed
```

### 5. Build Assets

```bash
# Development
npm run dev

# Production
npm run build
```

### 6. Start Server

```bash
# Laravel development server
php artisan serve

# Reverb WebSocket server (terminal terpisah)
php artisan reverb:start

# Queue worker (terminal terpisah)
php artisan queue:work
```

## Akun Default

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@tryout.test | password |
| Siswa | ahmad@tryout.test | password |

## Struktur Folder

```
├── app/
│   ├── Events/              # Broadcasting events
│   ├── Http/
│   │   ├── Controllers/     # Request handlers
│   │   └── Middleware/      # Custom middleware
│   ├── Models/              # Eloquent models
│   └── Services/            # Business logic
├── database/
│   ├── migrations/          # Database schema
│   └── seeders/             # Sample data
├── resources/
│   ├── js/
│   │   ├── Components/      # Reusable components
│   │   ├── Layouts/         # Page layouts
│   │   ├── Pages/           # Inertia pages
│   │   ├── hooks/           # Custom React hooks
│   │   └── stores/          # Zustand stores
│   └── views/               # Blade templates
└── routes/
    ├── web.php              # Web routes
    └── channels.php         # Broadcast channels
```

## Anti-Cheating System

Sistem anti-kecurangan terintegrasi yang mendeteksi berbagai jenis pelanggaran:

| Violation Type | Detection Method |
|----------------|------------------|
| Tab Switch | Mendeteksi perpindahan tab browser menggunakan `visibilitychange` event |
| Window Blur | Mendeteksi kehilangan fokus window |
| Fullscreen Exit | Mendeteksi keluar dari mode fullscreen |
| Copy/Paste | Intercept clipboard events pada halaman ujian |
| Right Click | Mencegah context menu untuk menghindari inspect element |
| DevTools | Mendeteksi pembukaan developer tools (F12) |
| Print | Mencegah percobaan mencetak halaman ujian |

Setiap pelanggaran dicatat dengan timestamp dan jenis pelanggaran. Jika total pelanggaran melebihi batas yang ditentukan per tryout, sistem akan otomatis menyerahkan ujian (auto-submit).

## Deployment (Low-Cost Hosting)

### Shared Hosting (cPanel)

1. Upload semua file ke `public_html`
2. Pindahkan isi folder `public/` ke `public_html/`
3. Edit `public_html/index.php`:
   ```php
   require __DIR__.'/../tryout-utbk/vendor/autoload.php';
   $app = require_once __DIR__.'/../tryout-utbk/bootstrap/app.php';
   ```
4. Setup cron job untuk scheduler:
   ```
   * * * * * /usr/bin/php /home/user/tryout-utbk/artisan schedule:run
   ```

### VPS (DigitalOcean, Vultr)

1. Install LEMP stack (Linux, Nginx, MySQL, PHP)
2. Clone repository
3. Setup Nginx vhost
4. Gunakan Supervisor untuk queue worker
5. Setup SSL dengan Certbot

### Tips Optimasi

- Aktifkan OPcache untuk PHP
- Gunakan `php artisan optimize` untuk caching
- Kompres gambar sebelum upload
- Gunakan CDN untuk assets statis

## Kustomisasi

### Menambah Kategori Soal

Edit `database/seeders/CategorySeeder.php`

### Mengubah Durasi Default

Edit `app/Models/Tryout.php` atau melalui admin panel

### Mengubah Batas Pelanggaran

Sesuaikan `max_violations` di setiap tryout melalui admin panel

---

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## Kontribusi

Kontribusi sangat diterima. Untuk perubahan besar, silakan buka issue terlebih dahulu untuk mendiskusikan perubahan yang diinginkan.

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

<p align="center">
  <sub>Built with Laravel and React by <a href="https://github.com/Codift05">Gemaprest</a></sub>
</p>
