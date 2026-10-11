# Our Journey: Grade 7–10

A premium full-screen cinematic slideshow of class memories from Grade 7 to Grade 10.

##  How It Works

The website immediately opens a premium full-screen slideshow. Every two seconds it smoothly crossfades to the next school year — Grade 7 → Grade 8 → Grade 9 → Grade 10 — and loops continuously back to Grade 7.

##  Image Assets

Four clearly named, replaceable image assets exist (one per grade):

| Asset            | Description                              |
|------------------|------------------------------------------|
| `grade7-1.jpg`   | Grade 7 — Where it all started           |
| `grade8-1.jpg`   | Grade 8 — Growing together               |
| `grade9-1.jpg`   | Grade 9 — Finding our way                |
| `grade10-1.jpg`  | Grade 10 — The next chapter              |

**Important:** These are neutral placeholders, not real class photos. Replace each with your actual class photos. The layout is designed to accommodate both portrait and landscape images using `object-fit: contain`.

##  Using the Website

1. **View the slideshow:** Open `index.html` in any browser.
2. **Deploy:** Upload all files to any static hosting service (GitHub Pages, Netlify, Vercel, or your school's web server).
3. **QR code:** Once deployed to a public URL, the slideshow is ready to be opened from a QR code.

##  Project Structure

```
website gallery/
├── index.html      ← Full-screen cinematic slideshow
├── styles.css      ← Dark, immersive, Apple-style design
├── script.js       ← Auto-advance 2s loop, preload, swipes, mobile-safe-area
├── images/         ← Drop your class photos here
└── README.md       ← This file
```

##  Customizing

- **Add your photos:** Replace the `src` attribute in each `<img>` tag inside `index.html` with your own image paths, or swap the files in `images/`. The same filename must be used.
- **Image orientation:** The slideshow works with both portrait (3:4) and landscape (4:3) photos. Use `object-fit: contain` to avoid cropping faces awkwardly.
- **Change timing:** Edit `AUTO_MS` in `script.js` to adjust the 2,000 ms interval.
- **Reduce motion:** The page respects `prefers-reduced-motion` — if enabled, zooms and transitions are disabled.
- **Add your own gradient:** Edit the CSS variables at the top of `styles.css` if you want to adjust the subtle overlay gradients.

---

*The moments end. The memories stay.*