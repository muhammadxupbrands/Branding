# GILDED Amazon Creative Partnership Pitch

A local, build-free client pitch web app.

## Run locally

From this folder, run:

```powershell
python -m http.server 4173
```

Then open `http://127.0.0.1:4173/` in a browser.

## Image viewer

Select any sample-work board to open it in the full-screen viewer.

- Scroll or use `+` / `-` to zoom
- Drag to pan when zoomed
- Double-click or select **Reset** to recenter
- Press `Esc` or select **Close** to exit

## Access gate

The pitch uses the password `gilded`. On static hosting such as GitHub Pages, this is a client-side gate for a private-client presentation, not server-side authentication. Do not use it to protect sensitive or confidential files.

## Files

- `index.html` - pitch structure and copy
- `styles.css` - responsive presentation styling
- `app.js` - gallery, zoom, pan, and keyboard interactions
- `assets/` - local copies of the supplied listing-image boards
