# Stride & Form — Shoe Shop

A static, responsive shoe-shop website that can be published directly from this repository using GitHub Pages. The GitHub Pages entry point is the root `index.html`; all product photography is stored locally in `assets/`, so the published site does not depend on Manus preview URLs or a build step.

## Publish with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** and folder **/(root)**, then save.
4. Wait for the Pages deployment to finish. The project site URL will be `https://ajaz1821-cms.github.io/aap202/`.

Every push to `main` updates the site. GitHub Pages is a static host: checkout and newsletter submission are demonstration interactions only, not connected to a payment processor or mailing list.

## Files

- `index.html` — standalone HTML, CSS, and JavaScript website.
- `assets/` — optimized local campaign and product photography.
- `client/` — the original React/Vite WebDev project source.

The root page can also be tested locally by opening `index.html` in a browser or by serving the repository with a static HTTP server.
