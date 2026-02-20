# 🟩 6Wordle

A browser-based word guessing game inspired by Wordle — but harder. You have 6 attempts to guess a secret **6-letter word**. Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

Deployed at: https://6wordle.surge.sh/

---

## 📸 Preview

> Gameplay Screenshot:

[src/assets/gameplay.png](https://raw.githubusercontent.com/milanz14/6wordle/main/src/assets/screenshot.png))

---

## 🎮 How To Play

- Guess the hidden 6-letter word in 6 tries
- Type your guess into the input field and hit **Guess**
- After each guess, the tiles will flip and change color to show how close you were:

| Color     | Meaning                                         |
| --------- | ----------------------------------------------- |
| 🟩 Green  | Letter is in the correct position               |
| 🟨 Yellow | Letter is in the word but in the wrong position |
| ⬜ Grey   | Letter is not in the word                       |

- The game ends when you guess the word correctly or run out of tries
- Hit **Play Again** to get a new word and start over

---

## 🛠️ Tech Stack

| Technology                                      | Purpose                     |
| ----------------------------------------------- | --------------------------- |
| [React](https://react.dev/)                     | UI framework                |
| [TypeScript](https://www.typescriptlang.org/)   | Type safety                 |
| [Vite](https://vitejs.dev/)                     | Build tool and dev server   |
| [Tailwind CSS](https://tailwindcss.com/)        | Utility-first styling       |
| [Framer Motion](https://www.framer.com/motion/) | Tile flip and UI animations |
| [Howler.js](https://howlerjs.com/)              | Sound effects               |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v16 or higher
- npm v7 or higher

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/6wordle.git
cd 6wordle
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The output will be in the `/dist` folder, ready to deploy to any static hosting provider.

To preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```
6wordle/
├── public/                 # Static assets
├── src/
│   ├── assets/
│   │   └── fx/             # Sound effect files (.mp3)
│   ├── components/
│   │   ├── GuessLine.tsx   # Renders a single row of letter tiles
│   │   ├── Header.tsx      # Game title and stats
│   │   └── HeaderStats.tsx # Displays word library count
│   ├── data/
│   │   └── words.ts        # The word library (valid guesses + answers)
│   ├── styles/
│   │   ├── App.css         # Global styles and keyframe animations
│   │   └── Header.css      # Neon title styles and shimmer animation
│   ├── types/
│   │   └── interfaces.ts   # Shared TypeScript interfaces
│   ├── App.tsx             # Root component, core game logic
│   └── index.tsx           # App entry point
├── index.html              # Vite HTML entry
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 🧠 Game Logic

The core game logic lives in `App.tsx` and works as follows:

**Word Selection** — on mount, a random word is selected from the word library and stored in a ref to avoid re-renders affecting it mid-game.

**Guess Validation** — each submitted guess is checked against three rules before being accepted: it must not be empty, it must be exactly 6 letters, and it must exist in the word library. Invalid guesses trigger a shake animation on the input and a toast notification explaining the issue.

**Tile Scoring** — handled in `GuessLine.tsx`. Each letter is compared against the solution: an exact position match gets green, a letter that exists elsewhere in the word gets yellow, and anything else gets grey.

**Win/Loss Detection** — if the guess matches the solution exactly the player wins. If the player exhausts all 6 guesses without a correct answer the game ends in a loss and the solution is revealed.

**Sound Effects** — Howler.js plays one of three sounds on submit, win, or loss. Volume is globally capped at 5% to avoid startling anyone.

---

## ✨ Features

- 🎨 Dark neon aesthetic with a glowing animated title
- 🔄 Tile flip animations on guess submission via Framer Motion
- 📳 Input shake animation on invalid guesses
- 🍞 Toast notifications instead of browser alerts
- 🔊 Sound effects for submit, win, and lose
- 📱 Fully responsive — works on mobile, tablet, and desktop
- ♿ Semantic HTML structure

---

## 🗂️ Word Library

The game uses a curated list of 6-letter words stored in `src/data/words.ts`. This list serves as both the pool of possible answer words and the set of valid guesses — if a word isn't in the list, it won't be accepted as a guess.

To add more words, simply append them (lowercase) to the array in `words.ts`.

---

## 🐛 Known Limitations

- The word is re-randomised on page refresh, so there is no daily shared word mechanic
- There is no keyboard component — guesses must be typed via the text input
- No guess history is persisted between sessions

---

## 🤝 Contributing

Contributions are welcome! If you'd like to add features, fix bugs, or expand the word library:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

---

## 🙏 Acknowledgements

Inspired by the original [Wordle](https://www.nytimes.com/games/wordle/index.html) by Josh Wardle.
