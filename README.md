# 🎯 Opportunity Radar
### AI-Powered Investment Signal Finder — Built for the ETMarkets Hackathon

> **Not a summarizer. A signal-finder.**
> Opportunity Radar monitors corporate filings, quarterly results, bulk/block deals, insider trades, management commentary shifts, and regulatory changes — surfacing missed investment opportunities as daily, actionable alerts.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stack: React + Vite](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)](https://vitejs.dev/)
[![Stack: Node + Express](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)](https://expressjs.com/)
[![AI: Gemini](https://img.shields.io/badge/AI-Gemini%20Flash-orange)](https://ai.google.dev/)

---

## 📌 Problem Statement

Retail and institutional investors in India process thousands of regulatory filings, SEBI disclosures, earnings transcripts, and block deal tables every day — manually. Critical signals get buried:

- A CFO shifts language across 3 quarterly calls — nobody catches it.
- A founder sells for the first time in 18 months — missed amid noise.
- A DPIIT draft policy threatens margins — not yet mainstream news.
- A foreign institution silently accumulates over 8 sessions — goes unnoticed.

**The result:** Opportunities are missed. Risks arrive as surprises.

---

## 💡 Solution

Opportunity Radar is an AI agent pipeline that:

1. **Ingests** structured & unstructured data: SEBI filings, BSE/NSE bulk deal feeds, earnings call transcripts, MCA incorporation alerts, DPIIT policy drafts.
2. **Analyses** using a fine-tuned LLM prompt (see `/prompts/radarPrompt.txt`) — not to summarize, but to find **behavioral shifts and statistical anomalies**.
3. **Classifies** signals by type and severity.
4. **Delivers** actionable daily alerts, ranked by potential impact.

---

## 🧠 Signal Categories

| Signal Type | Example |
|---|---|
| 📄 **Filing Alert** | New UAE subsidiary hints at upcoming international acquisition |
| 💼 **Bulk / Block Deal** | FII accumulates 1.2% stake across 8 sessions — pre re-rating pattern |
| 👤 **Insider Trade** | Promoter sells for first time in 18 months — historically precedes correction |
| 🎙️ **Commentary Shift** | CFO's language pivots from "expansion" to "cost discipline" across 3 calls |
| ⚖️ **Regulatory Change** | DPIIT draft caps aggregator discounts — market hasn't priced this in yet |

---

## 📁 Project Structure

```
et-smart-investor-ai/
│
├── frontend/                    # React + Vite + TailwindCSS
│   └── src/
│       ├── components/          # Reusable UI components (SignalCard, Navbar, etc.)
│       ├── pages/               # Route-level pages (Home, SignalDetail, etc.)
│       ├── hooks/               # Custom React hooks (useSignals, useFilter, etc.)
│       └── utils/               # Helper functions (formatDate, severityColor, etc.)
│
├── backend/                     # Node.js + Express API server
│   ├── server.js                # Main API server
│   └── package.json
│
├── data/
│   └── mockStocks.json          # Mock signal dataset (6 signals across all categories)
│
├── prompts/
│   └── radarPrompt.txt          # AI signal-finder prompt template (LLM-ready)
│
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- npm v9+

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/et-smart-investor-ai.git
cd et-smart-investor-ai
```

### 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend will be available at **http://localhost:5173**

### 3. Run the Backend (Optional for MVP)
```bash
cd backend
npm install
npm start
```
Backend API will be available at **http://localhost:5001**

### API Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/signals` | Returns all opportunity signals |
| `GET` | `/api/signals/:id` | Returns a single signal by ID |

### 4. Environment Variables (for AI integration)
Create a `.env` in the `backend/` directory:
```env
GEMINI_API_KEY=your_api_key_here
PORT=5001
```

---

## 🏗️ Architecture

```
┌───────────────────────────────────────────────────────────────────┐
│                        DATA SOURCES                               │
│  BSE / NSE Feeds  │  SEBI Filings  │  Earnings Transcripts  │ MCA │
└──────────────────────────┬────────────────────────────────────────┘
                           │ Raw Data Ingestion
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                   SIGNAL PROCESSOR (Node.js)                     │
│  ┌──────────────┐   ┌──────────────┐   ┌───────────────────────┐ │
│  │ Data Parser  │──▶│ LLM Agent    │──▶│ Signal Classifier     │ │
│  │              │   │ (Gemini)     │   │ (Type + Severity)     │ │
│  └──────────────┘   └──────────────┘   └───────────────────────┘ │
└──────────────────────────┬───────────────────────────────────────┘
                           │ Structured Signals (JSON)
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                  REST API (Express)                              │
│                   /api/signals                                   │
└──────────────────────────┬───────────────────────────────────────┘
                           │ HTTP
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│               REACT FRONTEND (Vite + TailwindCSS)                │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Daily Alerts Feed  │  Signal Detail View  │  Severity Tags │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### Agent Roles
| Agent | Role |
|---|---|
| **Ingestion Agent** | Polls BSE/NSE/SEBI data sources, parses PDFs and HTML filings |
| **LLM Signal Agent** | Runs each data chunk through `radarPrompt.txt` via Gemini Flash |
| **Classifier Agent** | Tags each signal with `type`, `severity`, `company`, `ticker`, `date` |
| **Delivery Agent** | Serves structured signals via REST API; future: email/WhatsApp alerts |

### Error Handling
- LLM timeouts: retry with exponential backoff (3 attempts)
- Malformed filings: logged and skipped, flagged in audit trail
- Duplicate signals: deduplicated by `(ticker, signalType, date)` composite key

---

## 📊 Impact Model

### Assumptions
- Target user: Active retail investor managing a ₹50L portfolio
- Current state: ~2 hours/day manually reading filings, news, deal tables
- Automation with Opportunity Radar: 10 minutes/day reviewing curated alerts

### Time Saved
```
2 hrs/day × 250 trading days = 500 hours/year saved per user
At ₹500/hour (opportunity cost) = ₹2.5 Lakh/year saved per user
```

### Alpha Generated
```
If 1 high-severity signal/month is actionable:
  Average return on signal = 8% (conservative, based on insider trade literature)
  Portfolio allocation per signal = ₹2L (4% of ₹50L portfolio)
  Monthly alpha = ₹16,000
  Annual alpha = ₹1.92 Lakh/user
```

### Platform-Scale Impact (10,000 active users)
```
Time saved:          5,000,000 hours/year
Revenue recovered:   ₹192 Cr/year in alpha generated
Platform revenue:    ₹5,000/user/year subscription → ₹50 Cr ARR target
```

> **Note**: Alpha estimates are directional and based on published research on insider trade signal efficacy (Seyhun 1998, Lakonishok & Lee 2001). Actual results depend on signal quality, execution, and market conditions.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TailwindCSS v4 |
| Backend | Node.js, Express |
| AI / LLM | Google Gemini Flash (via REST API) |
| Data Format | JSON (mockStocks.json for MVP) |
| Version Control | Git / GitHub |

---

## 🎥 3-Minute Pitch Video
> _Link to be added upon submission_

Covers:
- The problem (2 minutes of investor time wasted per day per missed signal)
- The solution (AI signal-finder vs. summarizer distinction)
- Demo walkthrough (daily alerts feed → signal detail → why it matters)

---

## 📄 Architecture Document
> See `/docs/architecture.md` _(to be added)_ — a 1–2 page diagram + description covering agent roles, communication flows, tool integrations, and error-handling logic.

---

## 🤝 Team
Built for the **ETMarkets AI Hackathon 2026**.

---

## 📜 License
MIT License — see [LICENSE](LICENSE) for details.
