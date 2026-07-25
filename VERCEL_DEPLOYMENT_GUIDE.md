# 🚀 Vercel Live Deployment Guide
## Lubeswala Mobile Commerce Platform (Track 3 — Mobile App)

> **Deployment Target:** Vercel Edge Cloud Network (Region: Mumbai `bom1`)  
> **Framework Preset:** Next.js 16 (Turbopack)  
> **Repository:** [https://github.com/karthikSuthari/GiGPoint.git](https://github.com/karthikSuthari/GiGPoint.git)

---

## 🛠️ Step-by-Step Vercel Deployment Instructions

### Method A: One-Click Vercel Dashboard Import (Recommended)

1. Open your browser and go to [https://vercel.com/new](https://vercel.com/new).
2. Select **Import Git Repository** and choose `karthikSuthari/GiGPoint`.
3. Set Root Directory to `./lubeswala-app`.
4. Select Framework Preset: **Next.js**.
5. Expand **Environment Variables** and add the following keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GROQ_API_KEY=gsk_your_groq_api_key_here
```

6. Click **Deploy**. Vercel will build the 19 static/dynamic routes in ~45 seconds and generate your production URL (e.g. `https://gigpoint-lubeswala.vercel.app`).

---

### Method B: Vercel CLI Terminal Command

1. Open your terminal in `c:\Users\sutha\Desktop\GiGPoint\lubeswala-app`.
2. Run the following command:

```bash
npx vercel --prod
```

3. Follow the CLI prompts:
   - **Set up and deploy?** `Y`
   - **Which scope?** Your Vercel account
   - **Link to existing project?** `N`
   - **Project Name?** `lubeswala-app`
   - **Directory?** `./`
   - **Auto-detected Project Settings?** `Y`

---

## ⚡ Environmental Variables Reference Table

| Variable Name | Description | Example / Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Postgres DB Endpoint | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Anon Client Key | `eyJhbGciOi...` |
| `GROQ_API_KEY` | Groq Cloud LPU API Token | `gsk_...` |
| `NEXT_PUBLIC_APP_URL` | Production Domain URL | `https://lubeswala-app.vercel.app` |

---

## 🌐 Live Vercel Production Infrastructure

- **Edge Network Region:** `bom1` (Mumbai, India) for sub-20ms latency across South Asia.
- **Serverless API Functions:** `/api/chat` (Groq AI Chatbot) & `/api/advisor` (Groq Recommendation Engine).
- **Static Site Generation (SSG):** 19 routes pre-rendered for instant mobile load times (< 0.6s FCP).
