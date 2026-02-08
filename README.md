# Web Tryout UTBK

Platform tryout online untuk persiapan UTBK SNBT yang stabil, ringan, dan aman.

## Fitur Utama

### 🎓 Untuk Siswa
- **Dashboard Personal** - Statistik belajar, tryout tersedia, dan riwayat ujian
- **Exam Engine** - Interface ujian dengan timer server-side yang akurat
- **Anti-Cheating System** - Deteksi pelanggaran (tab switch, copy-paste, dll)
- **Auto-Save** - Jawaban tersimpan otomatis setiap kali menjawab
- **Review Pembahasan** - Lihat jawaban dan penjelasan setelah ujian
- **Realtime Leaderboard** - Peringkat live menggunakan WebSocket

### 👨‍💼 Untuk Admin
- **Manajemen Tryout** - CRUD tryout dengan pengaturan lengkap
- **Bank Soal** - Pengelolaan soal dengan kategori dan tingkat kesulitan
- **Kategori & Subkategori** - Organisasi materi dengan warna
- **Manajemen User** - Kelola siswa dan admin
- **Dashboard Analytics** - Statistik platform dan aktivitas

## Tech Stack

- **Backend**: Laravel 11 + PHP 8.2+
- **Frontend**: React 18 + Inertia.js
- **State Management**: Zustand (lightweight)
- **Realtime**: Laravel Reverb (WebSocket)
- **Styling**: Tailwind CSS 3.4
- **Database**: MySQL 8.0+
- **Queue**: Database driver (low-cost hosting)

## Persyaratan

- PHP 8.2+
- Composer 2.x
- Node.js 18+
- MySQL 8.0+ atau MariaDB 10.5+
- Ekstensi PHP: BCMath, Ctype, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML

## Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd tryout-utbk
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

Sistem anti-kecurangan mendeteksi:

- 🔄 **Tab Switch** - Perpindahan tab browser
- 👁️ **Blur** - Kehilangan fokus window
- 📺 **Fullscreen Exit** - Keluar dari mode fullscreen
- 📋 **Copy/Paste** - Percobaan copy atau paste
- 🖱️ **Right Click** - Klik kanan pada halaman ujian
- ⌨️ **Devtools** - Membuka developer tools (F12)
- 🖨️ **Print** - Percobaan mencetak halaman

Jika pelanggaran melebihi batas, ujian otomatis diserahkan.

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

## Lisensi

MIT License

## Kontribusi

Pull requests welcome! Untuk perubahan besar, buka issue terlebih dahulu.
