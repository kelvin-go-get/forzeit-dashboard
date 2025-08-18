# Forzeit Vue3 Dashboard (Frontend-only demo)

## 1) Create the project
npm create vite@latest forzeit-dashboard -- --template vue-ts
cd forzeit-dashboard

## 2) Install deps
npm i
npm i -D tailwindcss postcss autoprefixer @vitejs/plugin-vue
npm i @headlessui/vue @heroicons/vue chart.js vue-chartjs pinia xlsx dayjs

## 3) Add Tailwind
npx tailwindcss init -p
# Replace tailwind.config.js and postcss.config.js with the provided ones.
# Add src/style.css (and import it in main.ts already in this starter).

## 4) Add the src/ files
- App.vue, main.ts, components/*, store/* as shown above.

## 5) Run locally
npm run dev

## 6) Build
npm run build

## 7) Deploy to Vercel
- Create a new GitHub repo and push this project.
- On vercel.com, import the repo.
- Framework preset: **Vite** (should auto-detect)
- Build command: `npm run build`
- Output dir: `dist`
- Env vars: none needed
- Deploy ✨

(Alternatively) Vercel CLI:
- npm i -g vercel
- vercel
- vercel --prod

## Notes for the brief
- "Active users (last 5s)": live counter simulated each second.
- "Users active (last 24h)": unique simulated users in rolling 24h window.
- "Cards created (last 24h)": event count over rolling 24h.
- Upload Excel to visualize the provided sheet in a table.
- No backend required. Only clean, modern UI + code quality.
