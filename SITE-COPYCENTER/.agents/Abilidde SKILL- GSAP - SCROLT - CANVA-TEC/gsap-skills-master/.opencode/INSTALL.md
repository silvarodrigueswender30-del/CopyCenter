# installing gsap-skills for opencode

## prerequisites

- opencode installed
- git installed

## installation

### 1) clone

```bash
git clone https://github.com/Microck/gsap-skills.git ~/gsap-skills
```

### 2) copy skills into opencode

opencode loads skills from `~/.config/opencode/skills/`.

```bash
mkdir -p ~/.config/opencode/skills
rsync -a --delete ~/gsap-skills/skills/ ~/.config/opencode/skills/
```

### 3) install the `/gsap` command (optional but recommended)

```bash
mkdir -p ~/.config/opencode/command
cp ~/gsap-skills/command/gsap.md ~/.config/opencode/command/
```

### 4) restart opencode

restart opencode so it can discover the new skills.

## verify

ask opencode:

> use `gsap-core` and show me a timeline that overlaps two tweens using `"-=0.5"`

or try the command:

> /gsap

## troubleshooting

### skill not found

1) confirm files exist:

```bash
ls -la ~/.config/opencode/skills | grep gsap
```

2) ensure the folder names match the skill names (example: `gsap-scrolltrigger/` contains `SKILL.md` with `name: gsap-scrolltrigger`).
