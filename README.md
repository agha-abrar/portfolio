# Portfolio — Animated One-Page React Site

A single-page portfolio built with React, Vite, Tailwind CSS, and Framer Motion.
Sections: Home, About, Skills, Projects, Experience, Contact — with smooth-scroll
navigation, scroll-spy highlighting, and a Download CV button.

## AghaConnect (chat)

Open **http://localhost:5173/connect** (or use the nav / floating button).

1. Copy `.env.example` → `.env`
2. Put your OpenRouter key in `OPENROUTER_API_KEY=`
3. Run `npm run dev` (starts Vite + the API proxy together)

Guest chats are saved in the browser for now. Sign-up / sign-in for per-user history is planned next.

## Build for production

```bash
npm run build
```

This outputs a `dist/` folder — deploy that anywhere static (Vercel, Netlify, GitHub Pages).

To deploy on Vercel:
```bash
npm i -g vercel
vercel
```

## Put in your own info

Everything you need to change lives in **one file**:

```
src/data/content.js
```

Edit your name, role, tagline, about text, skills, projects, experience, email,
and social links there — every component reads from this file, so nothing else
needs to change.

## Add your real CV

1. Put your CV PDF in `public/cv/`
2. Name it `Agha-Abrar-CV.pdf` — or use any name and update `cvPath` in
   `src/data/content.js` to match.
3. Delete `public/cv/PUT-YOUR-CV-HERE.txt`.

## Customizing the look

- **Colors** — edit the `colors` block in `tailwind.config.js`
  (`ink`, `surface`, `paper`, `gold`, `violet`, `muted`).
- **Fonts** — currently Fraunces (headlines) + Sora (body), loaded via Google
  Fonts in `index.html`. Swap the `<link>` and `fontFamily` in
  `tailwind.config.js` to change them.
- **Sections** — each section is its own file in `src/components/`. Delete or
  reorder them in `src/App.jsx`; just remember to also add/remove the matching
  entry in the `sections` array in `src/components/Nav.jsx` so the nav links
  stay in sync.

## Project structure

```
src/
  components/   Nav, Hero, About, Skills, Projects, Experience, Contact, Footer
  data/         content.js — all your editable text/data lives here
  App.jsx       assembles the page
  main.jsx      React entry point
  index.css     Tailwind + global styles
public/
  cv/           put your CV PDF here
```
