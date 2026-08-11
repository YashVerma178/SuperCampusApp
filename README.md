# 🎓 Super Campus — All-in-One Campus Mobile Super App

**Super Campus** is a production-quality, modern mobile application designed for college campuses. It unifies Digital Student ID, Attendance System, Campus Wallet, Event Discovery, Interactive Campus Map Navigation, Peer-to-Peer Student Marketplace, Campus Announcements, and Notification Center into one clean mobile experience.

---

## ✨ Features

- **🔐 Role-Based Access Control**:
  - **Student**: View Digital ID, scan QR attendance, manage campus wallet, register for events, find campus venues, buy/sell marketplace items.
  - **Faculty**: Start dynamic QR attendance sessions with timers, view live check-ins, broadcast announcements, host events.
  - **Admin**: System metrics analytics, attendance rate charts, user management (suspend/activate), campus location settings.
- **🪪 Flippable Digital Student ID Card**: Biometric QR pass with student details, course, semester, and verified badge.
- **💳 Campus Digital Wallet**: Recharge balance via UPI/Card, pay at cafeteria/printing terminals, digital receipts.
- **📍 Dynamic QR Attendance**: Auto-refreshing session tokens with countdown timers and instant verification.
- **🗺️ Interactive Campus Map**: Vector map with building pins, open hours, and turn-by-turn simulated directions.
- **🛒 Student Marketplace**: Peer-to-peer textbook, laptop, and note trading with safety reporting.

---

## ⚡ Preset Demo Accounts

| Role | Email | Password |
|---|---|---|
| **Student** | `student@example.com` | `DemoPassword123` |
| **Faculty** | `faculty@example.com` | `DemoPassword123` |
| **Admin** | `admin@example.com` | `DemoPassword123` |

---

## 🚀 Quick Start (Local Setup)

```bash
# 1. Clone repository
git clone <your-repository-url>
cd super-campus

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment

### Deploy to Vercel
1. Push repo to GitHub.
2. Import project on [Vercel](https://vercel.com).
3. Vercel automatically detects `vercel.json` and deploys static SPA bundle.

### Deploy with Docker
```bash
docker compose up --build -d
```
Access at `http://localhost:8080`.

---

## 🛠️ Tech Stack
- **Frontend Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + Custom Animations & Glassmorphic UI
- **Icons & Effects**: Lucide Icons + Canvas Confetti
- **Deployment**: Vercel & Docker (Nginx Alpine)
