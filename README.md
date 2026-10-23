# Kamesh Kamalakannan — Developer Portfolio

React + Vite + Tailwind CSS + Framer Motion.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
```

## Add your own content
- **All text, links and projects:** `src/data/portfolioData.js`
  - Set `links.linkedin` to your LinkedIn URL.
  - For each project set `github` and `demo` to real URLs. Empty values show a disabled button.
  - For each certification set `url` (and optionally `image`).
- **Files to add in `public/`:** `resume.pdf`, `images/profile.jpg`, `images/ecart.png`, `images/taskflow.png`, `images/portfolio.png`. Missing images fall back to placeholders; `resume.pdf` must exist for the download buttons to work.

## Contact form (EmailJS)
1. Create a free account at emailjs.com, add an email service and a template using variables `from_name`, `from_email`, `subject`, `message`, `reply_to`.
2. Copy `.env.example` to `.env` and fill in the three `VITE_EMAILJS_*` values.
3. Without these, the form shows an error with your email address instead of a fake success.

## Deploy to Vercel
1. Push to GitHub.
2. Import the repo at vercel.com (Vite is auto-detected).
3. Add the three `VITE_EMAILJS_*` environment variables in Project Settings, then deploy.
