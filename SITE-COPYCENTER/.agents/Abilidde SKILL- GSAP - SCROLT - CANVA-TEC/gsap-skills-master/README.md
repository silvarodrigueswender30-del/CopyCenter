# gsap-skills

an opinionated bundle of **opencode skills** for gsap (greensock animation platform).

these skills are written to be reference-heavy and copy/paste friendly: timelines, scrolltrigger, text, svg, flip, draggable, observer, easing, react patterns, utilities, and performance.

<p>
  <a href="https://github.com/Microck/opencode-studio"><img src="https://img.shields.io/badge/opencode-studio-brown?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAABiElEQVR4nF2Sv0tWcRTGPyeVIpCWwmyJGqQagsqCsL2hhobsD3BvdWhoj%2F6CiIKaoqXBdMjKRWwQgqZ%2BokSvkIhg9BOT9xPn9Vx79cD3cu6953zP8zznCQB1V0S01d3AKeAKcBVYA94DjyJioru2k9SHE%2Bqc%2Bkd9rL7yf7TUm%2BpQ05yPUM%2Bo626Pp%2BqE2q7GGfWrOpjNnWnAOPAGeAK8Bb4U5D3AJ%2BAQsAAMAHfVvl7gIrAf2Kjiz8BZYB3YC%2FwFpoGDwHfgEnA0oU7tgHiheEShyXxY%2FVn%2Fn6ljye8DcBiYAloRcV3tAdrV1xMRG%2Bo94DywCAwmx33AJHASWK7iiAjzNFOBl7WapPYtYdyo8RlLqVpOVPvq9KoH1NUuOneycaRefqnP1ftdUyiOt5KS%2BqLWdDpVzTXMl5It4Jr6u%2BQ%2FnhyBc8C7jpowGxGvmxuPqT9qyYuFIKdP71B8WT3SOKexXLrntvqxq3BefaiuFMQ0wqZftxl3M78MjBasfiDN%2FSAi0kFbtf8ACtKBWZBDoJEAAAAASUVORK5CYII%3D" alt="Add with OpenCode Studio" /></a>
  <img alt="license" src="https://img.shields.io/badge/license-MIT-green" />
</p>

---

## quickstart for ai agents

**opencode**

```
fetch and follow instructions from https://raw.githubusercontent.com/Microck/gsap-skills/master/.opencode/INSTALL.md
```

**codex / cursor / other**

```
fetch and follow instructions from https://raw.githubusercontent.com/Microck/gsap-skills/master/.codex/INSTALL.md
```

## installation (manual)

1) clone

```bash
git clone https://github.com/Microck/gsap-skills.git ~/gsap-skills
```

2) copy skills into opencode

```bash
mkdir -p ~/.config/opencode/skills
rsync -a --delete ~/gsap-skills/skills/ ~/.config/opencode/skills/
```

3) copy the `/gsap` command (optional but recommended)

```bash
mkdir -p ~/.config/opencode/command
cp ~/gsap-skills/command/gsap.md ~/.config/opencode/command/
```

4) verify

open opencode and ask:

> use `gsap-scrolltrigger` and show me a pinned scrubbed timeline example

or try the command:

> /gsap

## skill catalog

all skills live under `skills/`:

- `gsap` - umbrella skill + reference files (cheatsheet + deeper refs)
- `gsap-core` - tweens, timelines, playback controls, keyframes, staggers
- `gsap-scrolltrigger` - scroll triggers, scrub, pin, snap, markers, batching
- `gsap-text` - splittext, textplugin, scrambletext, text reveal patterns
- `gsap-svg` - drawsvg, morphsvg, motionpath patterns
- `gsap-flip` - layout animations (FLIP), reorder, enter/leave, absolute
- `gsap-draggable` - drag interactions, bounds, inertia (throw), snap
- `gsap-observer` - wheel/touch/pointer gesture detection and swipe patterns
- `gsap-easing` - easing selection, custom eases, steps, elastic/bounce/back
- `gsap-react` - `@gsap/react` `useGSAP()` patterns, scoping, cleanup
- `gsap-utilities` - `gsap.utils.*` helpers (clamp, mapRange, pipe, wrap, ...)
- `gsap-performance` - ticker, lag smoothing, optimization patterns
- `gsap-setup` - installation and repo-wide best practices

## `/gsap` command

includes a `/gsap` slash command for opencode that analyzes projects and generates comprehensive animation plans.

```bash
/gsap              # full analysis + animation plan
/gsap hero         # focus on specific component
/gsap scroll       # scrolltrigger focus
/gsap text         # text animations focus
/gsap svg          # svg animations focus
/gsap audit        # review existing gsap code
```

## repo structure

```text
gsap-skills/
├── command/
│   └── gsap.md        # /gsap slash command
├── skills/
│   ├── gsap/
│   ├── gsap-core/
│   ├── gsap-scrolltrigger/
│   └── ...
├── .opencode/INSTALL.md
├── .codex/INSTALL.md
└── README.md
```

## notes

- these are **skills** (prompt packages / playbooks), not a vendored copy of gsap.
- licensing note (2026-02): gsap and the plugins that were formerly members-only are available under the gsap **standard no-charge license** (commercial use is allowed). prohibited uses apply to competing visual no-code animation builders. see: https://gsap.com/community/standard-license/

## license

mit
