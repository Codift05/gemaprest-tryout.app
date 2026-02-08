# UML Documentation - Gemaprest Tryout

Dokumentasi UML lengkap untuk sistem Gemaprest Tryout Platform.

## 📁 Struktur Folder

```
docs/uml/
├── README.md                     # Dokumentasi ini
├── 01-use-case.puml              # Use Case Diagram
├── 02-class-diagram.puml         # Class Diagram (Domain Model)
├── 03-erd.puml                   # Entity Relationship Diagram
├── 04-sequence-exam.puml         # Sequence Diagram: Alur Ujian
├── 05-sequence-auth.puml         # Sequence Diagram: Autentikasi
├── 06-component.puml             # Component Diagram (Arsitektur)
├── 07-deployment.puml            # Deployment Diagram (Infrastruktur)
├── 08-activity-exam.puml         # Activity Diagram: Proses Ujian
├── 09-state-exam-session.puml    # State Machine: Exam Session Lifecycle
```

## 🛠️ Cara Generate Diagram

### Menggunakan PlantUML Online
1. Buka [PlantUML Web Server](https://www.plantuml.com/plantuml/uml/)
2. Copy paste isi file `.puml`
3. Klik "Submit" untuk generate gambar

### Menggunakan VS Code
1. Install extension: **PlantUML** by jebbs
2. Buka file `.puml`
3. Tekan `Alt + D` untuk preview

### Menggunakan CLI
```bash
# Install PlantUML
npm install -g node-plantuml

# Generate semua diagram
for file in docs/uml/*.puml; do
  puml generate "$file" -o docs/uml/images/
done
```

## 📊 Deskripsi Diagram

### 1. Use Case Diagram (`01-use-case.puml`)
Menggambarkan interaksi antara aktor dengan sistem:
- **Siswa**: Registrasi, login, mengerjakan tryout, melihat hasil, leaderboard
- **Admin**: Manajemen kategori, soal, tryout, pengguna, laporan

### 2. Class Diagram (`02-class-diagram.puml`)
Model domain aplikasi dengan relasi:
- User, Tryout, Question, ExamSession, Leaderboard, dll.
- Menampilkan atribut dan method penting

### 3. ERD (`03-erd.puml`)
Struktur database dengan relasi foreign key:
- Primary key, foreign key, tipe data
- Relasi one-to-many, many-to-many

### 4. Sequence Diagram - Exam (`04-sequence-exam.puml`)
Alur proses mengerjakan ujian:
- Start exam → Take exam → Save answer → Submit → Scoring

### 5. Sequence Diagram - Auth (`05-sequence-auth.puml`)
Alur autentikasi:
- Register → Login → Logout

### 6. Component Diagram (`06-component.puml`)
Arsitektur sistem:
- Frontend (React + Inertia.js)
- Backend (Laravel)
- Database, WebSocket, External Services

### 7. Deployment Diagram (`07-deployment.puml`)
Infrastruktur deployment:
- Server nodes, containers, protocols

### 8. Activity Diagram (`08-activity-exam.puml`)
Flowchart proses ujian:
- Decision points, parallel activities

### 9. State Machine Diagram (`09-state-exam-session.puml`)
Lifecycle status exam session:
- Initialized → InProgress → Completed/Timeout/Violated
- Transisi antar state

## 🎨 Tema & Styling

Semua diagram menggunakan tema konsisten:
- **Primary Color**: Emerald (#10B981)
- **Font**: Sans-serif
- **Style**: Modern, clean, professional

## 📝 Catatan

- Diagram dibuat berdasarkan analisis kode sumber
- Update diagram jika ada perubahan signifikan pada sistem
- Gunakan diagram sebagai dokumentasi teknis
