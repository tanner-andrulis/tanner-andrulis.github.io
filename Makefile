.PHONY: setup dev build preview test links check screenshot

setup:        ## Install dependencies and the headless Chromium used for screenshots
	npm install
	npx playwright install chromium

dev:          ## Live-reload server on http://localhost:4321
	npx astro dev

build:        ## Render the site into ./docs
	npx astro build

preview:      ## Build, then serve ./docs exactly as it will be published
	npx astro build
	npx astro preview

test:         ## Build, then verify every page, redirect, and internal link
	node scripts/test-render.mjs

links:        ## Same as test, plus check every outbound link (needs network)
	node scripts/test-render.mjs --external

check:        ## Type-check the .astro files
	npx astro check

screenshot:   ## Render key pages to ./screenshots in light, dark, and mobile
	npx astro build
	node scripts/screenshot.mjs
	node scripts/screenshot.mjs --dark
	node scripts/screenshot.mjs --width 420
