# Employee Management System

Simple CRUD Employee Management System menggunakan Vue.js 3.

> **Note**: Ini adalah UI demo, data disimpan di JavaScript array dan hanya bertahan selama browser session.

## Tech Stack

- Vue.js 3 (CDN)
- Vanilla CSS dengan CSS Variables
- ES Modules
- Google Fonts (Inter)

Sengaja tidak menggunakan UI framework (Tailwind/Bootstrap), Vue Router, atau Vuex/Pinia karena fokus pada vanilla implementation.

## Fitur

**Dashboard**

- Statistik employee (total, active, inactive)
- Distribusi per department
- Recent activity

**Master Data Employee**

- Tabel data dengan search
- Status badge (Active/Inactive)
- Edit & Delete action
- FAB untuk quick add

**Form Create/Edit**

- Input: Name, Email, Department, Position, Status, Notes

## Struktur Folder

```
src/
├── app.js              # Vue app root
├── assets/styles/      # CSS
├── components/         # Reusable components (Navbar, DataTable, FormCard, dll)
├── constants/          # Dummy data
└── views/              # Page components (Dashboard, List, Create, Edit)
```

## Warna

Mengambil referensi dari website HashMicro:

- Primary Dark: `#2a2a2f`
- Accent Orange: `#fea112`
- CTA Red: `#b92f1e`
- Background: `#f4f4f6`

## Cara Menjalankan

Butuh local server karena menggunakan ES Modules.

```bash
# pakai Python
python -m http.server 8080

# atau pakai Node
npx serve

# atau Live Server extension di VS Code
```

Buka `http://localhost:8080`

## Catatan Arsitektur

- **Components** untuk UI element yang reusable
- **Views** untuk page-level component
- **CSS Variables** untuk theming yang konsisten
- Struktur sudah siap untuk integrasi Vue Router dan state management kalau diperlukan

## Responsive

- Desktop: Full sidebar, 4 column grid
- Tablet: 2 column grid
- Mobile: Single column, hidden sidebar
