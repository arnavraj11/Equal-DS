#!/bin/sh
# Builds the docs site and deploys the static output to Vercel (project: eqai-design-system).
# The build empties site-dist/, so the files are copied into deploy/, which keeps the .vercel link.
set -e
cd "$(dirname "$0")/.."
npm run site:build
mkdir -p deploy
find deploy -mindepth 1 -maxdepth 1 ! -name .vercel ! -name vercel.json -exec rm -rf {} +
cp -R site-dist/. deploy/
cat > deploy/vercel.json <<'JSON'
{
  "headers": [
    { "source": "/(llms.txt|llms-full.txt|CLAUDE.md)", "headers": [{ "key": "Content-Type", "value": "text/plain; charset=utf-8" }] },
    { "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }
  ]
}
JSON
cd deploy
[ -d .vercel ] || vercel link --yes --project eqai-design-system
vercel deploy --prod --yes
