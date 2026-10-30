---
name: MNG.DRONE
description: tu evento desde otra perspectiva
colors:
  ground: "#141414"
  panel: "#1c1c1c"
  ink: "#f2f0eb"
  mute: "#a3a09a"
  line: "#3a3936"
  bone: "#d8d3c6"
  rec-red: "#e5463a"
  sky-ground: "#f4f8fc"
  sky-panel: "#e3eef8"
  navy-ink: "#0b2545"
  navy-mute: "#4d6480"
  sky-line: "#c2d5e7"
  sky-deep: "#2a86c7"
  sky: "#5ab4e5"
  form-paper: "#ffffff"
  field: "#f6f5f1"
  field-border: "#cfcbc1"
  field-ink: "#141414"
  ok-green: "#2f7a4a"
  error-red: "#b3392f"
typography:
  display:
    fontFamily: "Anton, Oswald, Arial Narrow, Impact, sans-serif"
    fontSize: "clamp(2.8rem, 8.5vw, 7.5rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Anton, Oswald, Arial Narrow, Impact, sans-serif"
    fontSize: "clamp(2.6rem, 7vw, 4.6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.005em"
  accent:
    fontFamily: "Instrument Serif, Playfair Display, Georgia, serif"
    fontSize: "1.35rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.01em"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.12em"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  none: "0px"
spacing:
  gutter: "20px"
  container: "1180px"
  gap-sm: "12px"
  gap-md: "16px"
  gap-lg: "28px"
  section: "clamp(56px, 9vw, 104px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 22px"
  button-primary-hover:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ground}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 22px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
  nav-cta:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "9px 14px"
  service-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "30px 26px"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.field-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px"
    height: "50px"
  contact-form:
    backgroundColor: "{colors.form-paper}"
    rounded: "{rounded.none}"
    padding: "clamp(20px, 3vw, 32px)"
---

# Design System: MNG.DRONE

## Overview

**Creative North Star: "El Visor de Cámara"**

The page reads like the screen of a drone controller. Viewfinder corner brackets, a blinking REC dot, a running timecode, a telemetry panel, an altimeter on the right edge, a compass tape and an RTH button make the site feel like you're looking through the lens before the flight. The flight vocabulary is part of the brand. It isn't decoration added on top.

Underneath the HUD sits a quiet, folded-leaflet layout: full-width bands divided by dashed hairlines, like the creases of a tri-fold. The palette is monochrome and dark by default. Warm off-white ink sits on near-black, and the only colour accent is the camera's REC red. Type does the shouting: condensed Anton uppercase for headlines, set against a soft Instrument Serif italic for the human voice ("tu evento desde otra perspectiva").

A light mode exists as a sky world: navy ink on a blue-white ground with sky-blue accents. Same structure, different weather. The photo and its viewfinder keep their camera colours in both themes.

**Key Characteristics:**
- Dark, monochrome, warm-neutral ground; REC red is the only colour signal in dark mode.
- Camera/flight HUD motifs: corner brackets, crosshair, REC, timecode, telemetry, altimeter, compass, RTH.
- Dashed 1px hairlines as section folds and cell dividers.
- Square corners everywhere; no radius.
- Condensed uppercase display type paired with an italic serif and a monospace for data.
- Motion that behaves like a camera: focus pull, scan line, film grain. All of it switches off under reduced motion.

## Colors

The palette is camera-monitor neutrals with a single recording red, plus a sky-blue variant for light mode.

### Primary
- **Ink** (`ink`): main text, primary button fill, viewfinder brackets and HUD. Warm off-white, never pure white.
- **Hueso** (`bone`): accent text. Eyebrows, the serif tagline, step numbers, monospace labels, hover fill of the primary button.

### Secondary
- **REC Red** (`rec-red`): recording signal only. The REC dot, the progress-bar tip, the live telemetry dot, the compass needle, the hover dot on event cards.

### Neutral
- **Ground** (`ground`): page background.
- **Panel** (`panel`): raised surfaces such as service cards, event hover fill and menu backgrounds.
- **Mute** (`mute`): secondary copy, nav links, ticker text.
- **Line** (`line`): every hairline, dashed folds and dividers.

### Light mode (sky)
- **Sky Ground / Sky Panel** (`sky-ground`, `sky-panel`): background and raised surfaces.
- **Navy Ink** (`navy-ink`): text, and the contact block's background gradient.
- **Navy Mute / Sky Line**: secondary text and hairlines.
- **Sky Deep** (`sky-deep`): replaces Hueso as accent text and the button hover fill.
- **Sky** (`sky`): decorative detail such as the progress line, altimeter mark and number gradient.

### Form surface
- **Form Paper / Field / Field Border / Field Ink**: the contact form is always a light paper card in both themes, so the fields read as real paper to fill in.
- **OK Green / Error Red**: status message borders and invalid-field outlines only.

### Named Rules
**The Single Light Rule.** In dark mode the only saturated colour on screen is REC red, and it marks something "live" or "recording". Never use it for decoration, text or buttons.

**The Theme Swap Rule.** Every colour is applied through the `--ground / --panel / --ink / --mute / --line / --bone` variables. Light mode redefines the variables. Components never hard-code a dark value, except on the contact form surface.

## Typography

**Display Font:** Anton (with Oswald, Arial Narrow, Impact)
**Accent Font:** Instrument Serif italic (with Playfair Display, Georgia)
**Body Font:** Archivo (with Helvetica Neue, Arial)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, Menlo)

**Character:** A loud, condensed poster face for statements, softened by a lowercase italic serif that carries the personal, first-person voice. Monospace marks anything that is data: telemetry, shot notes, timecodes, keys.

### Hierarchy
- **Display**: hero wordmark "MNG.DRONE", uppercase on one line (`white-space: nowrap`). Same family for the price quote and the mobile menu links.
- **Headline**: section h2, uppercase, `text-wrap: balance`. Event card titles use it at 1.9rem.
- **Accent**: eyebrows above every h2, the tagline (up to 2.4rem), quote subtitles and the footer sign-off. Always italic and lowercase-led, coloured Hueso.
- **Title**: card and step titles in Archivo 600.
- **Body**: paragraphs, ledes capped at 44–52ch, muted colour for secondary copy.
- **Label**: buttons, nav links, form labels, the ticker. Uppercase with wide tracking (0.1–0.14em).
- **Mono**: HUD, timecodes, telemetry units, card keys, shot notes. Uppercase, tabular numerals for anything that counts.

### Named Rules
**The Three Voices Rule.** Anton shouts, Instrument Serif talks and JetBrains Mono reports. Don't mix up their roles: no serif buttons, no mono paragraphs, no Anton body copy.

**The Data Is Mono Rule.** Any number or unit that reads like an instrument (m, K, FPS, °, timecode) is set in mono or tabular figures.

## Layout

There is a single centred column (max 1180px, 20px gutters that respect safe-area insets), with full-width bands stacked vertically. Each band is a section with fluid vertical padding (`clamp(56px, 9vw, 104px)`) and a dashed top border (`.fold`). Section heads use a two-column grid with the title on the left and the intro paragraph on the right, aligned to the baseline. Below 760px they collapse to one column.

Content grids are cell grids divided by dashed hairlines rather than gapped cards. Events and telemetry stats are 4 columns, dropping to 2 at 960/860px and 1 at 520px. Services are a 3-column grid with real gaps, collapsing to 1 at 860px. Process steps are 4 columns, then 2, then 1.

Breakpoints in use: 480, 520, 760 (nav switches to the burger menu), 860, 960 and 1279px (the altimeter is hidden below this).

**The Fold Rule.** Separate bands and cells with `1px dashed` lines, not with background changes or shadows. The only full-colour band is the contact section.

**The Thumb-Width Rule.** Mobile first. Nothing may scroll horizontally at about 390px, and fixed chrome (nav, RTH) respects the safe-area insets.

## Elevation & Depth

The system is flat in dark mode. Depth comes from tonal layering (Ground → Panel) and hairlines, not from shadows. Shadows only appear in light mode, where navy-tinted drop shadows lift white cards off the sky ground. The text shadow on the HUD exists for legibility over the photo. Blurred translucent bars are the one glass effect, on the sticky nav and the RTH button (`color-mix` of ground at 85–88% with an 8px blur).

### Shadow Vocabulary
- **HUD legibility** (`text-shadow: 0 1px 3px rgba(0,0,0,.7)`): text over the viewfinder photo.
- **Light card hover** (`box-shadow: 0 22px 40px -22px rgba(11,37,69,.35)`): service card hover in light mode.
- **Light viewfinder** (`box-shadow: 0 24px 50px -24px rgba(11,37,69,.45)`): the hero photo in light mode.
- **Light form** (`box-shadow: 0 30px 60px -30px rgba(0,0,0,.5)`): the contact form on the navy block.
- **REC glow** (`box-shadow: 0 0 0 3px rgba(229,70,58,.2), 0 0 14px 2px rgba(229,70,58,.55)`): the progress-bar tip while recording.

**The Flat Dark Rule.** In dark mode nothing casts a shadow. Lift on hover is shown with `translateY` plus a tonal shift.

## Shapes

All corners are square (0 radius). Inputs explicitly reset `border-radius: 0`. The only circles are signals: the REC dot, the live dot and the progress tip. Lines are 1px; viewfinder brackets are 1.5px strokes, 18–22px long, drawn with layered `linear-gradient` backgrounds. Crosshair markers (a 9px plus sign) replace bullets in the ticker and the conditions list. Step numbers are outlined Anton (`-webkit-text-stroke: 1px`) that fills with Hueso as it scrolls into view.

**The Square Frame Rule.** Never round a corner. Anything framed should look like it is being seen through a viewfinder.

## Components

Components are straight and technical: square, 1px borders, wide-tracked uppercase labels. Precise like an instrument, with no ornament.

### Buttons
- **Shape:** square (0px), 1px border in the fill colour.
- **Primary:** Ink fill with Ground text and Label type, 16px × 22px padding.
- **Hover / Focus:** the fill shifts to Hueso (Sky Deep in light mode) over 0.3s. On press it scales to 0.97. `.arrow` buttons add a "→" that slides 5px on hover. Focus uses a 2px Hueso outline offset by 3px.
- **Ghost:** transparent with an Ink border and text, inverting to an Ink fill on hover.
- **On the contact form:** Field Ink fill with Ink text, centred. Disabled is 60% opacity with a wait cursor.

### Chips (conditions)
- **Style:** not buttons. They are footnote lines in Mute, each led by the crosshair marker and stacked in a column under a dashed rule (max 46ch).

### Cards / Containers
- **Service card:** Panel background, square, 30 × 26px padding, mono key in Hueso above an Archivo 600 title. On hover it lifts 6px and viewfinder corner brackets close in from -6px to 10px inset.
- **Event cell:** no background at rest, divided by dashed lines. On hover a Panel fill rises from the bottom (`scaleY`), the title lifts 4px and a blinking REC dot appears before the mono shot note.
- **Stat cell:** a giant Anton number with an Ink-to-grey gradient fill, a mono unit in Hueso, and a title plus muted sub-line.

### Inputs / Fields
- **Style:** a square paper field (Field background, Field Border, Field Ink text), 50px tall, with 12px padding and labels in uppercase Label type. Custom SVG chevron for selects and a calendar icon for date inputs. The native picker is kept but made transparent.
- **Focus:** the border turns Field Ink, an inset 2px bottom bar appears and the background goes white.
- **Error:** an Error Red border and outline (`aria-invalid="true"`). Status messages are bordered boxes tinted green or red.

### Navigation
- **Desktop:** a sticky blurred bar with a dashed bottom border, the logo image on the left, and uppercase Label links in Mute that turn Ink with an underline wiping in from the left (also marking the active section). It also has a square outlined "Escríbeme" CTA and a square theme toggle (sun/moon cross-rotate). The bar compacts when scrolled, and a 2px progress line runs along the bottom with a REC-red glowing tip.
- **Mobile (≤760px):** links and CTA hide, and a two-line burger turns into an ×. A full-screen menu reveals with `clip-path` from the top, showing big Anton links with mono indices in Hueso, staggered 50ms apart, plus the serif tagline at the foot.

### Viewfinder (signature)
The hero photo is framed as a camera monitor. It has corner brackets, a centre crosshair that follows the pointer, a REC label with a blinking dot, a "4K · 30 FPS" readout and a live timecode in the HUD, plus a slow scan line. On entry the frame unclips from an inset, the image does a focus pull (blur to sharp) and the brackets close in.

### Telemetry panel (signature)
A full-width band with a faint 48px grid masked to an ellipse, a "Telemetría" live label with a REC dot, GPS coordinates, four stat cells and a compass tape that scrolls its heading with the page. The needle is REC red.

### Flight chrome (signature)
A fixed altimeter on the right edge (≥1280px only) reads page progress as altitude, and a fixed "RTH ↑" button returns to the top. Both are mono, square and outlined.

## Do's and Don'ts

### Do:
- **Do** route every colour through the theme variables so light mode keeps working.
- **Do** keep corners at 0px and dividers at `1px dashed var(--line)`.
- **Do** set data, units and timecodes in JetBrains Mono with tabular numerals.
- **Do** lead each section with an italic serif eyebrow in Hueso above an uppercase Anton h2.
- **Do** use camera/flight motifs (brackets, crosshair, REC, HUD) for new decorative detail.
- **Do** keep motion camera-like (`cubic-bezier(.16,1,.3,1)` for most transitions) and make sure everything is visible and still under `prefers-reduced-motion`.
- **Do** keep the contact form a light paper card in both themes.

### Don't:
- **Don't** use REC red for anything except "live/recording" signals.
- **Don't** round corners, add pill buttons or use soft drop shadows in dark mode.
- **Don't** use pure white (#fff) text on the dark ground. Ink is warm off-white.
- **Don't** add a second accent hue to dark mode. Hueso is the accent.
- **Don't** set body copy in Anton or buttons in the serif.
- **Don't** show film grain on mobile or touch devices.
