# find-the-nidle

Open `index.html` through a local web server, for example `python -m http.server 8000`, then visit `http://localhost:8000`. Three.js loads from its CDN.

- WASD / arrows: move; Shift: sprint; Space: jump; E: interact.
- Mouse: look while the cursor is captured, or hold the left button and drag. Escape releases the cursor or closes the current window.
- Q: water a growing pumpkin after buying a Watering Can. Each crop can be watered once.
- B or FIELD GUIDE: open the illustrated catalog of 96 farm objects.
- Buy Work Boots for faster travel and a Harvest Basket for double pumpkin harvests at the Tool Shop.

Progress, equipment and watered beds are saved in this browser. On mobile, hold the arrow buttons to move and drag the world with another finger to look. Hold RUN to sprint, tap JUMP to jump, and tap USE to interact. Use WATER PUMPKIN near an eligible bed. Controls reset when a window opens or the game loses focus; typing in shops does not activate game shortcuts.

Checks: `node --test tests/controls.test.cjs tests/economy.test.cjs tests/farm-features.test.cjs`.

Artwork and generation prompts: [assets/art/README.md](assets/art/README.md). Economy details: [ECONOMY.md](ECONOMY.md).
