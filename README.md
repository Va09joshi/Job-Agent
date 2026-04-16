<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=230&text=AI%20Job%20Agent&fontAlign=50&fontAlignY=40&color=0:4f46e5,100:22c55e&fontColor=ffffff&animation=fadeIn" alt="AI Job Agent Banner" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=600&size=24&pause=1000&color=22C55E&center=true&vCenter=true&width=750&lines=AI-Powered+Job+Matching+System;Automated+Job+Discovery+%26+Ranking;Google+Sheets+%E2%86%92+AI+%E2%86%92+Email+Pipeline;Built+for+Smart+Job+Seekers" alt="Typing Intro" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Automation-GitHub%20Actions-black?style=for-the-badge&logo=githubactions" alt="Automation Badge" />
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js" alt="Node.js Badge" />
  <img src="https://img.shields.io/badge/AI-Groq%20API-green?style=for-the-badge" alt="Groq Badge" />
  <img src="https://img.shields.io/badge/Data-Google%20Sheets-34A853?style=for-the-badge&logo=google" alt="Google Sheets Badge" />
</p>

---

## 🚀 Overview

**AI Job Agent** is a fully automated, AI-powered job matching system.  
It reads candidate preferences from Google Sheets, fetches jobs from multiple sources, ranks opportunities using AI, and sends personalized recommendations by email.

---

## ✨ Highlights

- ⚡ Automated every 5 minutes via GitHub Actions
- 🌐 Multi-source job fetching (Indeed + Naukri + fallback)
- 🧠 AI-powered relevance scoring and ranking
- 📩 Personalized HTML email delivery
- 🔄 Google Form → Google Sheet → AI → Email pipeline

---

## 🤖 AI Agent Workflow

```mermaid
flowchart TD
    A[Google Form Submission] --> B[Google Sheet: job]
    B --> C[GitHub Action Trigger\nEvery 5 Minutes / Manual]
    C --> D[Read Users from Sheet]
    D --> E[Fetch Jobs\nIndeed + Naukri + Fallback]
    E --> F[AI Matching\nGroq OpenAI-Compatible API]
    F --> G[Generate Top Matches]
    G --> H[Send Styled Email via Gmail SMTP]
    H --> I[User Receives Job Suggestions]
```

### 🎥 Workflow Preview

<p>
  <img src="https://media.giphy.com/media/coxQHKASG60HrHtvkt/giphy.gif" alt="Workflow Preview GIF" />
</p>

---

## 🧩 Project Structure

```text
Job-Agent/
├── .github/workflows/agent.yml
├── src/
│   ├── index.js
│   ├── services/
│   │   ├── sheet.service.js
│   │   ├── jobs.service.js
│   │   ├── ai.service.js
│   │   └── mail.service.js
│   └── utils/
│       └── naukri.js
├── package.json
└── README.md
```

---

## ⚙️ Setup Guide

### 1) Install Dependencies

```bash
npm ci
```

### 2) Add Environment Variables

Create a `.env` file in project root:

```env
GROQ_API_KEY=your_groq_key
EMAIL=your_email
APP_PASSWORD=your_gmail_app_password
SHEET_ID=your_google_sheet_id
```

### 3) Add Google Credentials

Place your service account key file at:

```text
credentials.json
```

Make sure this service account has access to your target Google Sheet.

### 4) Run Locally

```bash
node src/index.js
```

---

## 🧪 Testing Flow

1. Submit the Google Form.
2. Verify the response appears in the `job` sheet tab.
3. Trigger GitHub Action manually (or wait for scheduler).
4. Confirm the user receives AI-generated job recommendations via email.

---

## 🔄 Automation (GitHub Actions)

- ⏱ Runs every 5 minutes
- 🖱 Manual trigger supported (`workflow_dispatch`)
- 🔐 Uses repository secrets

### Required Secrets

- `GROQ_API_KEY`
- `EMAIL`
- `APP_PASSWORD`
- `SHEET_ID`

---

## 🛠 Troubleshooting

| Issue | Solution |
|---|---|
| No users found | Check Google Sheet data and tab name (`job`) |
| No email received | Verify SMTP credentials and spam folder |
| AI errors | Validate `GROQ_API_KEY` |
| Sheet error | Check `credentials.json` and sharing permissions |

---

## 🎯 Key Benefits

- 🚀 Eliminates manual job searching
- 🎯 Delivers more relevant job matches
- 🔄 Supports real-time automated processing
- 📩 Sends clean, professional recommendation emails

---

## 👨‍💻 Author

**Vaibhav Joshi**  
🔗 https://github.com/Va09joshi

<p>
  <img src="https://capsule-render.vercel.app/api?type=waving&section=footer&height=120&color=0:22c55e,100:4f46e5" alt="Footer Banner" />
</p>
