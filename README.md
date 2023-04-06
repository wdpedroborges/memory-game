# Memory Game
## A different approach regarding memory games

---

Memory Game is a different type of memory game, because the user can set their own cards and they don't need to be necessarily equal. That means this memory game can become also a quiz. To do that, the user needs to set each pair of cards in the form of question-answer. The app is also responsive, adapting to different screen sizes, and provides a seamless user experience on both desktop and mobile devices.

---

![badge](https://img.shields.io/github/watchers/wdpedroborges/memory-game?style=social)
![badge](https://img.shields.io/github/stars/wdpedroborges/memory-game?style=social)
![badge](https://img.shields.io/github/license/wdpedroborges/memory-game)
![badge](https://img.shields.io/badge/powered%20by-vite-blue)
![badge](https://img.shields.io/badge/powered%20by-react.js-blue)
![badge](https://img.shields.io/badge/powered%20by-typescript-blue)
![badge](https://img.shields.io/badge/powered%20by-sass-blue)

---

## Live Demo

[Click here to see it]((wdpedroborges.github.io/memory-game))

## Features

- User sets their own cards
- Cool animation when revealing the back of a card

## Tech

- Vite
- React.js
- Typescript
- Sass

## Installation

Clone the repository:

```bash
git clone https://github.com/wdpedroborges/memory-game
```

For production:

```sh
cd memory-game
npm install
npm run dev
```

Debug in Typescript:

```bash
tsc --noEmit --watch
```

Build:

```bash
npm run build
```

## Deploy

- Add to vite.config.js:

```bash
base: "/<repo>/"
```

- Then:

```bash
npm install gh-pages --save-dev
```

- Add to package.json

```bash
 "homepage": "https://<username>.github.io/<repo>/",
  ...
  "scripts": {
...
"build": "vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
...
```

## License

This project is licensed under the MIT License. Please see the LICENSE file for more details.