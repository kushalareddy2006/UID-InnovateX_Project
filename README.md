InnovateX Project Expo 

# InnovateX Project Expo 2026

A front-end website for **InnovateX Project Expo 2026** — a student-led technology exposition. The site provides event information, project category listings, a project registration form, and a visitor feedback form, all built with vanilla HTML, CSS, and JavaScript.

## Pages

- **`index.html`** — Home page with a hero banner, live date/time clock, an "About the Expo" section, and important announcements.
- **`projects.html`** — Lists the six project categories (AI/ML, Web & Mobile Dev, IoT & Embedded Systems, Cybersecurity & Blockchain, Data Science & Analytics, Robotics & Automation) with schedule, venue, fee, and open/closed status, plus a full project registration form with client-side validation.
- **`feedback.html`** — A visitor feedback form (name, register number, category visited, 1–5 star rating, comments) with a live-updating feedback summary showing total submissions and average rating.

## Features

- Responsive navigation bar with a mobile hamburger menu
- Live-updating clock and date display on the home page
- Client-side form validation (required fields, register number format, email format, 10-digit mobile number, team size limits, minimum comment length) with inline error messages
- Dynamic, in-memory rendering of registration confirmations and feedback summaries (no backend — data persists only for the current browser session)
- Custom CSS star-rating widget
- Category-based icons (`cat-aiml.svg`, `cat-webdev.svg`, `cat-iot.svg`, `cat-cyber.svg`, `cat-data.svg`, `cat-robotics.svg`) and a hero banner (`banner.svg`)

## Tech Stack

- HTML5
- CSS3 (custom properties / theming via CSS variables)
- Vanilla JavaScript (no frameworks or build tools)

## Project Structure

```
UID-InnovateX_Project/
├── index.html
├── projects.html
├── feedback.html
├── style.css
├── script.js
├── banner.svg
├── cat-aiml.svg
├── cat-cyber.svg
├── cat-data.svg
├── cat-iot.svg
├── cat-robotics.svg
└── cat-webdev.svg
```

## Getting Started

No build step is required. Clone the repo and open `index.html` directly in a browser, or serve it locally:

```bash
git clone https://github.com/kushalareddy2006/UID-InnovateX_Project.git
cd UID-InnovateX_Project
# then just open index.html, or serve it:
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Notes

- All registration and feedback data is handled entirely client-side in memory — refreshing the page clears submitted entries. Hooking this up to a real backend/database would be needed for persistent storage.
- Event details (dates, venue, fees) are placeholder content and can be edited directly in `projects.html`.
