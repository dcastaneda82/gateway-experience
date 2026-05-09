# Contributing to The Gateway Experience

Thank you for your interest in contributing to The Gateway Experience. This guide will help you understand how to participate in this project.

## Our Mission

We're building a free, open-source tool for consciousness exploration based on declassified CIA research and the Monroe Institute's Gateway methodology. Every contribution should serve that mission: making advanced consciousness technology accessible, research-grounded, and free of commercial or ideological bias.

## Code of Conduct

- **Be respectful** of all contributors and users
- **Stay focused** on the goal: consciousness exploration technology
- **Avoid dogmatism** — we welcome secular, scientific, and spiritual perspectives equally
- **Prioritize accessibility** — changes should work for all users, on all devices
- **Respect safety** — do not introduce features that could harm vulnerable users

## How to Contribute

### Reporting Bugs

Found a bug? Please open an issue with:

1. **Clear description** of the problem
2. **Steps to reproduce** it
3. **Expected behavior** vs actual behavior
4. **Device & browser** (e.g., "iPhone 14 Safari", "Windows 11 Chrome")
5. **Screenshots** if visual

Example:
```
Title: Focus 12 audio cuts out after 15 minutes

Description:
When I use Focus 12 for longer than 15 minutes, the binaural beat 
stops playing but the app remains open.

Steps to reproduce:
1. Load the app
2. Navigate to Focus 12
3. Hit play
4. Wait 15 minutes

Expected: Audio continues indefinitely
Actual: Audio cuts out after ~15 minutes

Device: iPhone 13 Pro, iOS 17.1, Safari
```

### Suggesting Features

Want a new feature? Open an issue describing:

1. **What you want** — clear, specific feature request
2. **Why you want it** — use case and benefit
3. **How it fits the mission** — does it serve consciousness exploration or accessibility?

Example:
```
Title: Add session journaling with AI synthesis

Description:
After each session, users could briefly journal their experience, 
and Claude API could synthesize insights into structured notes.

Use case:
- Integration of expanded-state insights into daily life
- Pattern recognition across multiple sessions
- Research data for studying the Gateway methodology

Mission alignment:
- Deepens the user's practice by encouraging reflection
- Makes the research methodology more effective
- Provides data for future consciousness studies
```

### Submitting Code

#### Setup

1. **Fork the repo** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/gateway-experience.git
   cd gateway-experience
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```

#### Development

- **Keep it simple** — The app is intentionally minimal. Don't add complexity unless it's essential.
- **Test on mobile** — Use DevTools device emulation to test on iPhone and Android.
- **Preserve the aesthetic** — Maintain the void-black, gold, minimal design philosophy.
- **Document changes** — Add comments to code explaining the *why*, not just the *what*.

#### Code Style

- **Formatting**: No strict linter. Keep it readable.
- **Variable names**: Clear, descriptive, lowercase with underscores (`const binaural_frequency = 10`)
- **Comments**: Explain *why* you're doing something, especially if it's non-obvious
- **No external libraries**: We intentionally use only React + Vite. Avoid new dependencies unless essential.

Example:
```javascript
// Bad
const x = 10;
const y = ctx.createOscillator();

// Good
const beat_frequency = 10;
const left_oscillator = ctx.createOscillator();
// We use separate oscillators per ear to create the binaural beat effect
// (left ear: 200 Hz, right ear: 210 Hz → perceived 10 Hz beat)
```

#### Commit Messages

Follow this format:

```
feat: add feature X
fix: resolve bug Y
docs: update README
refactor: improve code clarity
perf: optimize audio synthesis

[Detailed explanation of *why* this change matters, not just what it does]
```

Good commit:
```
feat: add custom frequency input for advanced users

Users can now specify their own carrier frequency and beat frequency,
enabling personalized binaural beat experiments. This supports research
use cases and allows practitioners to explore different frequency combinations.
```

#### Testing

Before submitting:

1. **Manual testing**:
   - Open the app locally (`npm run dev`)
   - Test on phone and desktop
   - Verify all stages load
   - Verify audio plays and stops correctly
   - Verify navigation works
   - Verify geometry animations are smooth

2. **No console errors**:
   - Open DevTools (F12)
   - Check the Console tab for any errors
   - All network requests should be local (no external API calls)

3. **Visual check**:
   - Does the aesthetic match (dark, gold, minimal)?
   - Are fonts readable?
   - Is spacing consistent?
   - Does it look intentional, not accidental?

#### Pull Request

1. **Push to your fork**:
   ```bash
   git push origin feat/your-feature-name
   ```

2. **Open a PR on GitHub** with:
   - **Title**: `feat: add X feature` (matching your commit)
   - **Description**: What does this do? Why? How does it align with the mission?
   - **Testing**: What did you test? Devices? Browsers?
   - **Screenshots**: If visual, show before/after

3. **Wait for review** — The maintainer will review, request changes if needed, or merge

### Documentation

Documentation lives in:

- **README.md** — Project overview, quick start, usage
- **docs/RESEARCH.md** — Deep dive into McDonnell's report, Monroe Institute, perennial philosophy
- **CONTRIBUTING.md** — This file
- **Inline code comments** — Explain the *why* behind non-obvious logic

If you:
- Add a new feature, update README
- Change how binaural beats work, update RESEARCH.md
- Fix a bug, mention it in commit message
- Improve code clarity, add a comment

### Areas We'd Love Help With

1. **Mobile UX** — Make the experience better on phones/tablets
2. **Accessibility** — Screen reader support, keyboard navigation, color contrast
3. **Audio research** — Study the effects of different carrier frequencies, beat frequencies
4. **Documentation** — Expand safety information, add research guides
5. **Localization** — Translate the app into other languages
6. **UI refinement** — Subtle improvements to geometry animation, breathing orb timing
7. **Performance** — Reduce latency, optimize audio synthesis

## Questions?

- **Project questions**: Open an issue with the `question` label
- **Code questions**: Comment on the relevant commit or file
- **Mission questions**: Email [dkcastaneda82@gmail.com](mailto:dkcastaneda82@gmail.com)

## License

By contributing, you agree that your work will be licensed under the MIT License.

## Recognition

We recognize all contributors in the project's CONTRIBUTORS.md file. Your contribution matters, and we're grateful for it.

---

**Thank you for building consciousness exploration technology with us.**
