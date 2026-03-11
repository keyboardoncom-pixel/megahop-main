Original prompt: Copy project game ini ke project website ini namun ganti nama nya jadi "Megahop Adventure" lalu game nya dapat di akses lewat button game di beranda

- Confirmed the source game already uses the "Megahop Adventure" name in its HTML title and visible heading.
- Inspected the Vite landing page and found an existing game CTA pointing at `/megahop-adventure`, which needs to become a static file path.
- Confirmed the source game already exposes `window.render_game_to_text` and `window.advanceTime(ms)`, so it fits the existing game testing workflow.
- Copied the standalone game bundle into `public/megahop-adventure` (`index.html`, `style.css`, `game.js`, and `assets/`).
- Updated the homepage game CTA to use `/megahop-adventure/` and changed the label to `Play Megahop Adventure`.
- Verified the static game page responds at `/megahop-adventure/`.
- Ran a production build successfully via `node node_modules/vite/bin/vite.js build` because the local `node_modules/.bin/vite` shim is not executable in this workspace.
- Ran a browser automation check against the copied game bundle and confirmed the canvas rendered with gameplay state and sprites loading correctly.
- Remaining notes:
- `README.md` already had local changes unrelated to this task and was left untouched.
- `package.json` now differs only by an end-of-file newline after the verification workflow normalized it; functional dependency content was restored.
- Added a `Back to Home` button to the top of the Megahop Adventure side panel so users can return to the landing page from the game screen.
- Reworked the homepage and raid submission screen to match the Megahop Adventure game page style: parchment background, Cuphead font, ink borders, split stage/side-panel layout, and matching button treatment.
- Rebuilt the in-game HUD into grouped status cards with a clearer hierarchy for HP, energy, timer, parry, damage, and grade.
- Wired the new HUD visuals to live game state so the heart strip, energy meter, and grade color respond during play instead of staying static.
- Tightened the HUD sizing with fixed panel widths/heights and reserved numeric space so timer/stat text no longer shifts the layout while updating.
