# The Gateway Experience

[![Deployed](https://img.shields.io/badge/deployed-vercel-000000?style=flat-square)](https://tge-six.vercel.app)
[![React](https://img.shields.io/badge/react-18+-61dafb?style=flat-square&logo=react)](https://reactjs.org)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-brightgreen?style=flat-square)](https://github.com/dcastaneda82/gateway-experience)

A research-grounded, binaural-beat meditation platform for consciousness expansion — built on declassified CIA research and the Monroe Institute's Gateway Process.

**[Live App](https://tge-six.vercel.app)** • **[Research](docs/RESEARCH.md)** • **[Design Philosophy](#design-philosophy)**

---

## Overview

The Gateway Experience is a web application that guides users through eight progressive consciousness states using real-time binaural beat audio synthesis, animated sacred geometry, and whisper-based meditation instruction.

Built on **McDonnell's 1983 CIA Assessment of the Gateway Process** and the **Monroe Institute's 40+ years of consciousness research**, the app synthesizes military intelligence, neuroscience, and perennial philosophy into an accessible, zero-friction tool for exploring non-ordinary states of consciousness.

### What makes this different

- **Research-grounded** — Every frequency, timing, and technique traces directly to declassified CIA documentation or Monroe Institute protocols
- **Minimalist design** — Whispers instead of narration; geometry instead of imagery; audio synthesis instead of pre-recorded tracks
- **Perennial philosophy framework** — Explicitly connects all major mystical traditions (Christian, Hindu, Jewish, Taoist) as parallel maps of the same cosmology
- **Real-time audio** — Binaural beats generated on-the-fly using Web Audio API, enabling future customization and research integration
- **Free and open** — No paywalls, no tracking, no dark patterns; available globally with one click

---

## Quick Start

### Visit the App
Navigate to **[https://tge-six.vercel.app](https://tge-six.vercel.app)** and begin at The Perennial Truth.

### Local Development
```bash
git clone https://github.com/dcastaneda82/gateway-experience.git
cd gateway-experience
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Deploy
```bash
vercel --prod
```

---

## How It Works

### The Eight Stages

Each stage targets a specific brainwave frequency and progresses deeper into consciousness:

| Stage | Frequency | Carrier | Purpose | Duration |
|-------|-----------|---------|---------|----------|
| **The Perennial Truth** | — | — | Framing all traditions as one | 2–3 min |
| **The Vestibule** | — | — | Grounding and preparation | 2–3 min |
| **Resonant Tuning** | 10 Hz | 200 Hz | Physical body attunement | 5–10 min |
| **Focus 3** | 10 Hz | 200 Hz | Hemisphere synchronization | 5–10 min |
| **Focus 10** | 7 Hz | 200 Hz | Body asleep, mind awake | 10–15 min |
| **Focus 12** | 5 Hz | 200 Hz | Expanded awareness | 15–30 min |
| **Focus 15** | 3 Hz | 200 Hz | Time travel (into the past) | 20–45 min |
| **Focus 21** | 1.5 Hz | 200 Hz | Beyond time-space; the Absolute | 30–60 min |

### The Mechanism

**Binaural beats** work by playing two slightly different frequencies — one in each ear. The brain perceives the *difference* between them as a "beat" and entrains its own brainwave output to match that frequency. This phenomenon is called the **Frequency Following Response (FFR)**.

Example: Left ear hears 200 Hz, right ear hears 210 Hz → Brain perceives a 10 Hz beat and shifts toward 10 Hz (Alpha brainwaves).

Over 5–15 minutes of listening, this causes:
- Left hemisphere (analytical mind) to quiet
- Right hemisphere (holistic mind) to activate
- Synchronized oscillation between hemispheres (Hemi-Sync)
- Shift in consciousness toward the target frequency's perceptual state

### The User Experience

A typical session:

1. **Lie down with headphones** in a quiet, dimly-lit space
2. **Open the app** and select your desired stage (or start at the beginning)
3. **Hit ▶ Tone** to activate the binaural beats
4. **Watch the sacred geometry** breathe and rotate, anchoring your attention
5. **Listen to whispers** — one line of poetic guidance every ~5 seconds
6. **Stay still for 10–30 minutes** as your brainwaves entrain and consciousness shifts
7. **Deepen to the next stage** when you feel ready, or rest and integrate

The app is designed to **minimize cognitive interference**. No narration, no story, no demand for analysis — just: audio, image, and one gentle whisper at a time.

---

## Design Philosophy

### Aesthetic

- **Void black** (#07050d) background — low visual stimulation, supports internal focus
- **Gold** (#c4a24a) sacred geometry — warm, non-aggressive, spiritually resonant
- **Serif typography** (Georgia) — classical, contemplative, unhurried
- **Minimal UI** — only essential controls: play button, navigation dots, optional guidance text

### Sacred Geometry

Each stage has a unique animated SVG shape, carefully chosen to match the perceptual quality of that consciousness state:

- **Metatron's Cube** — All connections visible; grounding and beginning/end
- **Flower of Life** — Six-petaled; gentle, expansive awakening
- **Expanding Rings** — Ripple and resonance; outward movement
- **Torus** — Spiral in 3D; access to the hologram of all time
- **Merkaba** — Interlocking tetrahedra; dimensional movement
- **The Void** — Concentric circles fading to infinity; the Absolute

All shapes rotate or pulse slowly, anchoring attention without demanding it.

### Interaction Design

The goal: **get out of the way**. Every element serves the meditation, not the app.

- **Breathing orb** — A simple circle that scales up/down at the target breath rate
- **Whisper system** — Auto-advancing text; you read nothing, you receive everything
- **One-button audio** — Hit play, binaural beats begin; hit again, they stop
- **Dot navigation** — Jump to any stage without friction
- **Optional guidance** — If you want deeper instruction, expand it; if not, ignore it

---

## Technical Details

### Stack

- **Frontend**: React 18 + Vite
- **Audio**: Web Audio API (real-time binaural beat synthesis)
- **Animation**: CSS keyframes + requestAnimationFrame
- **Deployment**: Vercel (serverless, auto-redeploy on push)
- **Version Control**: Git + GitHub

### Architecture

```
src/
├── App.jsx                 # Main component; all logic and UI
├── App.css                 # All styling (minimal, no external dependencies)
└── main.jsx               # React entry point

public/
└── index.html             # HTML shell; minimal markup

vite.config.js             # Vite configuration
package.json               # Dependencies (react, vite only)
```

### Audio Implementation

The binaural beat generation happens in real-time:

```javascript
// Web Audio API context
const ctx = new AudioContext();

// Left ear: carrier frequency (200 Hz)
const leftOsc = ctx.createOscillator();
leftOsc.frequency.value = 200;

// Right ear: carrier + beat frequency (e.g., 200 + 10 = 210 Hz)
const rightOsc = ctx.createOscillator();
rightOsc.frequency.value = 210;

// Result: Brain perceives 10 Hz beat
```

This approach has advantages:
- **No file uploads** — Audio is generated on-the-fly, reducing bandwidth
- **Customizable** — Frequencies can be adjusted per-user in future versions
- **Research-native** — Perfect for studying the effects of different beat frequencies

### Performance

- **Load time**: < 1 second (Vercel CDN)
- **Audio latency**: < 50ms (Web Audio API)
- **Browser compatibility**: Chrome 60+, Safari 12+, Firefox 55+, Edge 79+
- **Mobile support**: iOS Safari, Android Chrome, all modern browsers
- **Offline capable**: App logic works fully offline; no external API calls

---

## Research Foundation

### Sources

The app is built on three research pillars:

1. **CIA Gateway Process Assessment** (McDonnell, 1983)
   - Declassified June 2003
   - Concludes there is "sound, rational basis in terms of physical science" for consciousness expansion
   - Documents brain hemisphere synchronization as the core mechanism
   - Maps Monroe's empirical work onto quantum mechanics and holographic universe theory

2. **Monroe Institute Gateway Tapes** (1970s–present)
   - 36 audio exercises that guide practitioners through Focus states
   - Used by 100,000+ people globally
   - Documented success rates: ~70% reach Focus 12 within 7 days of training
   - Fewer than 5% reach Focus 15 in a single session

3. **Perennial Philosophy** (Aldous Huxley, Huston Smith, Perennial tradition scholarship)
   - All major religious and mystical traditions point to the same underlying reality
   - The Absolute, Brahman, Ein Sof, the Tao — different names for one phenomenon
   - This app's "Perennial Truth" stage makes that convergence explicit

For deeper research, see **[docs/RESEARCH.md](docs/RESEARCH.md)**.

---

## Features

### Current

✅ Eight progressive meditation stages (Perennial Truth → Focus 21)
✅ Real-time binaural beat generation using Web Audio API
✅ Animated sacred geometry (8 unique shapes per stage)
✅ Whisper-based guidance (auto-advancing, non-intrusive)
✅ Volume control for binaural audio
✅ Stage navigation (dots or buttons)
✅ Session timer with elapsed time
✅ Collapsible guidance text per stage
✅ Mobile responsive
✅ PWA-ready (installable on home screen)
✅ Zero external dependencies (except React + Vite)
✅ Zero tracking, zero analytics, zero dark patterns

### Roadmap

- [ ] Session journaling with Claude API synthesis
- [ ] Progress tracking (milestones, heatmap calendar)
- [ ] Custom binaural frequencies (user-specified carrier + beat)
- [ ] Ambient soundscapes (frequency-matched, optional layering)
- [ ] Multi-user synchronized sessions
- [ ] Guided journey mode (narrative meditations)
- [ ] Wearable integration (heart rate, EEG verification)
- [ ] Dark mode / light mode toggle
- [ ] Export session data for research

---

## Usage

### For Individuals

1. Visit [https://tge-six.vercel.app](https://tge-six.vercel.app)
2. Get headphones and find a quiet, comfortable place to lie down
3. Start at "The Perennial Truth" or jump to any stage
4. Hit ▶ Tone when ready; let the binaural beats run for 10–30 minutes
5. Observe whatever arises without analysis or expectation

**Recommended practice**: 3–5 sessions per week for 2–4 weeks to notice consistent effects.

### For Developers / Researchers

Clone the repo and customize:

```bash
git clone https://github.com/dcastaneda82/gateway-experience.git
cd gateway-experience
npm install
npm run dev
```

Modify frequencies, add logging, integrate with biometric sensors, or extend the UI. The code is intentionally simple and readable for experimentation.

### For Educators / Therapists

The app is free to use with clients. No attribution required, though linking back to this repo is appreciated.

---

## Contributing

Contributions are welcome. Areas of interest:

- **UI/UX refinements** — Better mobile experience, accessibility improvements
- **Audio enhancements** — Frequency customization, preset libraries, soundscape integration
- **Research** — Studies measuring EEG, heart rate variability, or subjective consciousness reports
- **Documentation** — Expanded guides, safety information, contraindications

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for guidelines.

---

## Safety & Contraindications

The Gateway Process is generally safe, but some cautions apply:

⚠️ **Do not use if you have**: 
- Seizure disorders (binaural beats may trigger seizures in susceptible individuals)
- Severe psychiatric conditions (especially psychosis, bipolar disorder in manic phase)
- Recent head trauma or concussion

⚠️ **Use with caution if you**:
- Are pregnant (consult your doctor first)
- Have a pacemaker or other implanted electronic device
- Are taking medication affecting CNS function

**If you're unsure, consult a healthcare provider before use.**

The app is **not a substitute for medical or psychiatric treatment**. It is a consciousness exploration tool, not a therapy.

---

## Philosophy & Vision

The Gateway Experience exists to democratize consciousness exploration. For decades, this technology was:

- **Classified** — Locked in CIA vaults
- **Expensive** — $2,000–$4,000 for a 6-day Monroe Institute retreat
- **Geographically bound** — Available only to those who could travel to Virginia
- **Gatekept** — Reserved for military personnel, researchers, and the wealthy

**We believe consciousness research should be open, accessible, and free.**

This app is an act of intellectual liberation. It takes McDonnell's declassified work and the Monroe Institute's public methodology and makes them available to anyone with headphones and 30 minutes.

The research is clear: all major mystical traditions describe the same reality. This app lets you experience that reality directly, without ideology, without dogma — just signal, geometry, and your own awareness.

---

## License

MIT License — See **[LICENSE](LICENSE)** for details.

You are free to use, modify, and distribute this software for personal and commercial purposes.

---

## Acknowledgments

- **Lt. Col. Wayne M. McDonnell** — For the original CIA assessment (1983)
- **Robert Monroe** — For pioneering the Gateway methodology (1970s–2012)
- **The Monroe Institute** — For maintaining and sharing the Gateway tradition
- **Itzhak Bentov** — For the biomechanical models that underpin the theory
- **Karl Pribram & David Bohm** — For the holographic universe framework

---

## Contact

Questions? Feedback? Research collaboration?

- **GitHub Issues**: [gateway-experience/issues](https://github.com/dcastaneda82/gateway-experience/issues)
- **Email**: [dkcastaneda82@gmail.com](mailto:dkcastaneda82@gmail.com)

---

## Status

**Current Version**: 1.0.0
**Last Updated**: May 2026
**Deployment**: [https://tge-six.vercel.app](https://tge-six.vercel.app)

The app is live, stable, and ready for use. New features and research integrations coming throughout 2026.

---

**Begin your journey into consciousness.**

*[Visit the app →](https://tge-six.vercel.app)*
